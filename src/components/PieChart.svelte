<script lang="ts">
	import { alldataComment } from '$lib/store/stores';
	import * as d3 from 'd3';

	let allComment: AlldataComment[] | null = null;
	alldataComment.subscribe((value) => {
		allComment = value;
	});

	interface PieChartData {
		name: string;
		value: number; // This will be the percentage
	}

	let data: PieChartData[] = [];
	let arcs: d3.PieArcDatum<PieChartData>[] = [];

	const width = 400;
	const height = 200;

	// Define a color mapping for each emotion
	const emotionColors: { [key: string]: string } = {
		love: '#FAB3BC',
		sadness: '#89ABFF',
		anger: '#F12B43',
		surprise: '#F99600',
		joy: '#FFE45F',
		fear: '#A75EF1'
	};

	// Define the pie function
	const pie = d3
		.pie<PieChartData>()
		.sort(null)
		.value((d) => d.value);

	const arcPath = d3
		.arc<d3.PieArcDatum<PieChartData>>()
		.innerRadius(0)
		.outerRadius(Math.min(width, height) / 2 - 1);

	const innerCircleRadius = Math.min(width, height) / 2 * 0.7; // 70% of the pie chart

	// Subscribe to data and calculate the chart data
	$: if (allComment) {
		const emotionCount = d3.rollup(
			allComment,
			(v) => v.length,
			(d) => d.Emotion
		);

		const totalCount = d3.sum(Array.from(emotionCount.values()));
		data = Array.from(emotionCount, ([name, value]) => ({
			name,
			value: (value / totalCount) * 100 // Calculate percentage
		}));

		if (data.length) {
			arcs = pie(data);
		}
	}
</script>

<div class="flex flex-col items-center">
	<div class="flex justify-center items-center">
		<svg
			{width}
			{height}
			viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
			class="max-w-full h-auto"
		>
			<g class="data">
				{#each arcs as slice}
					<path d={arcPath(slice)} fill={emotionColors[slice.data.name]} stroke="white" stroke-width="2" />
				{/each}
			</g>
			<circle cx="0" cy="0" r={innerCircleRadius} fill="white" />
		</svg>
	</div>

	<div class="flex flex-col items-center mt-5 w-full">
		{#each Object.keys(emotionColors) as emotion}
			<div class="flex items-center justify-between w-full mb-2">
				<div class="flex items-center">
					<div class="w-5 h-5 mr-2" style="background-color: {emotionColors[emotion]}"></div>
					<span>{emotion}</span>
				</div>
				<span>
					{data.find((d) => d.name === emotion)?.value.toFixed(1) || '0.0'}%
				</span>
			</div>
		{/each}
	</div>
</div>

<style>
	/* Add any additional custom styles here */
</style>
