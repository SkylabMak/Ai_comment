<script lang="ts">
    import { onMount } from 'svelte';
    import { alldataComment } from "$lib/store/stores";
    import nlp from 'compromise';
    import * as d3 from 'd3';
    import cloud from 'd3-cloud';

    interface AlldataComment { 
        Comment_ID: string;
        Emotion: string;
        Text: string;
        Time: string;
    }

    interface FilteredEmotion { //object AllEmotion
        emotion: string;
        text: string;
        size: number;
        color: string; 
    }

    const emotionColors: { [key: string]: string } = {
        love: '#FAB3BC',
        joy: '#FFE45F',
        sadness: '#89ABFF',
        surprise: '#F99600',
        anger: '#F12B43',
        fear: '#A75EF1',
    };

    let allComment: AlldataComment[] | null = null;
    let filteredEmotions: { [key: string]: FilteredEmotion[] } = {};
    let svg: SVGSVGElement;

    alldataComment.subscribe(value => {
        allComment = value;
        console.log("All Comments:", allComment);  // Log

        if (allComment && allComment.length > 0) {
            updateFilteredEmotions();
        } else {
            console.error("No comments available or invalid data.");
        }
    });

    function updateFilteredEmotions() { //filter text from subject 
    const emotionWordFrequencies: { [key: string]: { [key: string]: number } } = {};
   

    allComment?.forEach(comment => {
        const emotion = comment.Emotion;
        const doc = nlp(comment.Text);

        // ดึงคำที่มีความหมายตามประเภทที่ต้องการ
        const meaningfulWords = [
            ...doc.verbs().out('array'),        // verbs
            ...doc.adjectives().out('array'),   // adjective
            ...doc.conjunctions().out('array'), // conjunctions
        ];

        
        const filteredWords = meaningfulWords.filter(word => {
            const pos = nlp(word).out('tags')[0]; // use compromise 
            return pos !== 'Noun' && pos !== 'Pronoun' && pos!=='adverb'; // text not use
        });

        if (!emotionWordFrequencies[emotion]) {
            emotionWordFrequencies[emotion] = {};
        }

        filteredWords.forEach(word => {
            word = word.toLowerCase();
            emotionWordFrequencies[emotion][word] = (emotionWordFrequencies[emotion][word] || 0) + 1;
        });
    });

    for (const emotion in emotionWordFrequencies) {
        const wordCounts = emotionWordFrequencies[emotion];
        const sortedWords = Object.keys(wordCounts)
            .map(word => ({
                emotion,
                text: word,
                size: wordCounts[word],
                color: emotionColors[emotion] || '#000000',  //worse case input incorrect
            }))
            .sort((a, b) => b.size - a.size);

        filteredEmotions[emotion] = sortedWords;
    }

    console.log("Filtered Emotions:", filteredEmotions); //Log
    drawWordCloud(); //word cloud using d3 - d3-cloud
}

    function drawWordCloud() {
    const words: { text: string; size: number; color: string }[] = [];

    for (const emotion in filteredEmotions) {
        filteredEmotions[emotion].forEach(word => {
            words.push({ text: word.text, size: word.size, color: word.color });
        });
    }

    const layout = cloud()
        .size([600, 400])
        .words(words.map(word => ({
            text: word.text,
            size: Math.log(word.size + 1) * 20, // size 
            color: word.color // color from filteredEmotions
        })))
        .padding(5)
        .rotate(() => (Math.random() < 0.5 ? 0 : 90))
        .fontSize(d => d.size || 10)
        .on("end", draw);

    layout.start();

    function draw(words: any[]) {
        const svgWidth = 700;
        const svgHeight = 400;
        const centerX = svgWidth / 2;
        const centerY = svgHeight / 2;

        d3.select(svg)
            .append("g")
            .attr("transform", `translate(${centerX}, ${centerY})`)
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", d => d.size + "px")
            .style("fill", d => d.color) // color from filteredEmotions
            .style("font-family", "Rockwell Nova Cond") //font any want to change
            .attr("text-anchor", "middle")
            .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
            .text(d => d.text);
    }
}
    onMount(() => {
        drawWordCloud();
    });

</script>

<svg bind:this={svg} width="700" height="400"></svg>
