<script lang="ts">
	import { onMount } from 'svelte';
	import { alldataComment } from '$lib/store/stores';
	import nlp from 'compromise';
	import * as d3 from 'd3';
	import cloud from 'd3-cloud';
	import { emotionColors } from '$lib/utils/emotionColors';

	interface AlldataComment {
		Comment_ID: string;
		Emotion: string;
		Text: string;
		Time: string;
	}

	interface FilteredEmotion {
		//object AllEmotion
		emotion: string;
		text: string;
		size: number;
		color: string;
	}

	let allComment: AlldataComment[] | null = null;
	let filteredEmotions: { [key: string]: FilteredEmotion[] } = {};
	let svg: SVGSVGElement;

	alldataComment.subscribe((value) => {
		allComment = value;
		// console.log('All Comments:', allComment); // Log

		if (allComment && allComment.length > 0) {
			updateFilteredEmotions();
		} else {
			// console.log('No comments available or invalid data.');
			d3.select(svg).selectAll('*').remove();
		}
	});

	function updateFilteredEmotions() {
		//filter text from subject
		const emotionWordFrequencies: { [key: string]: { [key: string]: number } } = {};

		allComment?.forEach((comment) => {
			const emotion = comment.Emotion;
			const doc = nlp(comment.Text);

			// ดึงคำที่มีความหมายตามประเภทที่ต้องการ
			const meaningfulWords = [
				...doc.verbs().out('array'), // verbs
				...doc.adjectives().out('array'), // adjective
				...doc.conjunctions().out('array') // conjunctions
			];

			const filteredWords = meaningfulWords.filter((word) => {
				const pos = nlp(word).out('tags')[0]; // use compromise
				return pos !== 'Noun' && pos !== 'Pronoun' && pos !== 'adverb'; // text not use
			});

			if (!emotionWordFrequencies[emotion]) {
				emotionWordFrequencies[emotion] = {};
			}

			filteredWords.forEach((word) => {
				word = word.toLowerCase();
				emotionWordFrequencies[emotion][word] = (emotionWordFrequencies[emotion][word] || 0) + 1;
			});
		});

		for (const emotion in emotionWordFrequencies) {
			const wordCounts = emotionWordFrequencies[emotion];
			const sortedWords = Object.keys(wordCounts)
				.map((word) => ({
					emotion,
					text: word,
					size: wordCounts[word],
					color: emotionColors[emotion] || '#000000' //worse case input incorrect
				}))
				.sort((a, b) => b.size - a.size);

			filteredEmotions[emotion] = sortedWords;
		}

		// console.log('Filtered Emotions:', filteredEmotions); //Log
		drawWordCloud(); //word cloud using d3 - d3-cloud
	}

	function drawWordCloud() {
		// Get the size of the parent container dynamically
		const containerWidth = svg.parentElement?.getBoundingClientRect().width || 600;
		const containerHeight = svg.parentElement?.getBoundingClientRect().height || 400;

		const words: { text: string; size: number; color: string }[] = [];

		for (const emotion in filteredEmotions) {
			filteredEmotions[emotion].forEach((word) => {
				words.push({ text: word.text, size: word.size, color: word.color });
			});
		}

		// Set a minimum size for words if the data is too small
		const minFontSize = 20;
		const maxFontSize = Math.min(containerWidth, containerHeight) / 8; // Adjust max size based on container

		const layout = cloud()
			.size([containerWidth - 50, containerHeight - 50]) // ลดขนาดเล็กน้อยเพื่อเว้นระยะห่างจากขอบ
			.words(
				words.map((word) => ({
					text: word.text,
					size: Math.max(Math.log(word.size + 1) * 20, minFontSize), // Ensure a minimum size
					color: word.color
				}))
			)
			.padding(6) // เพิ่ม padding ระหว่างคำเพื่อให้ไม่ทับกัน
			.rotate(() => (Math.random() < 0.5 ? 0 : 90)) // สุ่มหมุนแนวนอน (0) หรือแนวตั้ง (90)
			.fontSize((d) => Math.min(d.size || minFontSize, maxFontSize)) // Limit max font size
			.on('end', draw);

		layout.start();

		function draw(words: any[]) {
			const centerX = (containerWidth - 50) / 2; // เว้นระยะจากขอบ
			const centerY = (containerHeight - 50) / 2;

			// Clear any existing content inside the SVG before drawing the new word cloud
			d3.select(svg).selectAll('*').remove();

			d3.select(svg)
				.attr('width', containerWidth)
				.attr('height', containerHeight)
				.append('g')
				.attr('transform', `translate(${centerX}, ${centerY})`)
				.selectAll('text')
				.data(words)
				.enter()
				.append('text')
				.style('font-size', (d) => d.size + 'px')
				.style('fill', (d) => d.color) // ใช้สีตาม emotionColors
				.style('font-family', 'Arial, sans-serif') // เปลี่ยนฟอนต์ให้เหมือนกับตัวอย่าง
				.attr('text-anchor', 'middle')
				.attr('transform', (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`) // หมุนตามที่กำหนด
				.text((d) => d.text);
		}
	}

	onMount(() => {
		drawWordCloud();

		// Redraw Word Cloud when the window resizes to maintain responsiveness
		window.addEventListener('resize', drawWordCloud);
	});
</script>

<!-- <svg bind:this={svg} class={`w-full h-full`}></svg> -->
<!-- <div class="word-cloud-container p-4">
    <svg bind:this={svg} class="w-full h-full"></svg>
</div> -->

<div class="justify-center flex flex-row items-center mt-5 w-full flex-wrap">
	{#each Object.keys(emotionColors) as emotion}
		<div class="flex items-center justify-between w-auto mb-2 mr-4">
			<div class="flex items-center">
				<div class="w-5 h-5 mr-2" style="background-color: {emotionColors[emotion]}"></div>
				<span>{emotion}</span>
			</div>
			<!-- <span>
                {data.find((d) => d.name === emotion)?.value.toFixed(1) || '0.0'}%
            </span> -->
		</div>
	{/each}
</div>

<div class="word-cloud-container p-4">
	<svg bind:this={svg} class="w-full h-full"></svg>
</div>

<style>
	.word-cloud-container {
		width: 100%; /* ปรับขนาดตามพื้นที่ที่ต้องการ */
		height: 400px; /* กำหนดความสูงตามต้องการ */
		padding-left: 20px; /* ระยะขอบด้านซ้าย */
		padding-right: 20px; /* ระยะขอบด้านขวา */
		padding-bottom: 20px; /* ระยะขอบด้านล่าง */
		margin: auto;
	}
</style>
