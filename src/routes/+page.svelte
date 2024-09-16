<script lang="ts">
import {
    alldataStore
} from '$lib/store/stores';

import BarChart from '../components/BarChart.svelte';
import CommentExample from '../components/CommentExample.svelte';
import Homepage from '../components/Homepage.svelte';
import PieChart from '../components/PieChart.svelte';
import WordCloud from '../components/WordCloud.svelte';
import type {
    PageData
} from './$types';

export let data: PageData;

alldataStore.set(data.data) //set data to main global store
</script>

<div>
    <!-- <Homepage /> -->
    <svg width="100%" height="400px">
        <PieChart />
        <rect x="5%" y="0%" width="20%" height="80%" fill="lime" stroke="black" stroke-width="2" />

        <WordCloud />
        <rect x="28.1%" y="0%" width="41.75%" height="80%" fill="blue" stroke="black" stroke-width="2" />

        <CommentExample />
        <rect x="73%" y="0%" width="22%" height="100%" fill="yellow" stroke="black" stroke-width="2" />
    </svg>
    
    <BarChart />
    <svg width="100%" height="400px">
        <rect x="5%" y="0%" width="65%" height="100%" fill="red" stroke="black" stroke-width="2" />
    </svg>
</div>