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

	const width = 720;
	const height = 480;

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

	const labelRadius = (Math.min(width, height) / 2) * 0.6; // Move labels closer to center
	const arcLabel = d3
		.arc<d3.PieArcDatum<PieChartData>>()
		.innerRadius(labelRadius)
		.outerRadius(labelRadius);

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

<svg
	{width}
	{height}
	viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
	style:max-width="100%"
	style:height="auto"
>
	<g class="data">
		{#each arcs as slice}
			<path d={arcPath(slice)} fill={emotionColors[slice.data.name]} stroke="white" />
			<text
				style="font-weight: bold"
				transform={`translate(${arcLabel.centroid(slice).join(',')})`}
				text-anchor="middle"
			>
				{String(slice.data.name)}
			</text>
			{#if slice.endAngle - slice.startAngle > 0.25}
				<text
					text-anchor="middle"
					transform={`translate(${arcLabel
						.centroid(slice)
						.map((val, i) => (i === 0 ? val : val + 30)) // Increase the offset for percentage text
						.join(',')})`}
				>
					{String(slice.data.value.toFixed(1)) + '%'}
				</text>
			{/if}
		{/each}
	</g>
</svg>

<div class="legend">
	<div class="flex flex-col">
		{#each Object.keys(emotionColors) as emotion}
			<div class="legend-item" style="margin-bottom: 10px;">
				<div class="color-square" style="background-color: {emotionColors[emotion]};"></div>
				<span>{emotion}</span>
				<span class="value">{data.find((d) => d.name === emotion)?.value.toFixed(1) || '0.0'}%</span>
			</div>
		{/each}
	</div>
</div>

<style>
	svg {
		font-size: 20px;
	}
	.legend {
		display: flex;
		flex-wrap: wrap;
		margin-top: 20px;
		font-size: 20px;
	}
	.legend-item {
		display: flex;
		align-items: center;
		margin-right: 15px;
		width: 100%; /* Adjusts width to make space for value */
	}
	.color-square {
		width: 20px;
		height: 20px;
		margin-right: 5px;
	}
	.value {
		flex-grow: 1; /* Allows value to take remaining space */
		text-align: right; /* Aligns text to the right */
		margin-left: 240px; /* Adds space between emotion and % */
	}
</style>


