<script lang="ts">
import {
    alldataStore
} from '$lib/store/stores';

import BarChart from '../components/BarChart.svelte';
import CommentExample from '../components/CommentExample.svelte';
import PieChart from '../components/PieChart.svelte';
import WordCloud from '../components/WordCloud.svelte';
import type {
    PageData
} from './$types';

export let data: PageData;

let selectedEmotion = '';

alldataStore.set(data.data) //set data to main global store
</script>

<div class="flex flex-col flex-grow bg-purple-100 p-6">
    <!-- Main Grid Content -->
    <div class="grid grid-cols-4 gap-6 flex-grow">
        <!-- Pie Chart Section -->
        <div class="col-span-1 bg-white rounded-xl p-4 shadow-md">
            <!-- Individual editing area -->
            <h2 class="text-lg font-semibold mb-4">Pie Chart</h2>
            <PieChart />
            <!-- Individual editing area -->
        </div>

        <!-- Word Cloud Section -->
        <div class="col-span-2 bg-white rounded-xl p-4 shadow-md">
            <!-- Individual editing area -->
            <h2 class="text-lg font-semibold mb-4">Cloud Word</h2>
            <WordCloud />
            <!-- Individual editing area -->
        </div>

        <!-- Comment Section (fills col 4 in row 1 and 2) -->
        <div class="col-span-1 row-span-2 flex flex-col">
            <!-- Title outside the white box -->
            <h2 class="text-lg font-semibold mb-4">Comment</h2>
            <div class="bg-white rounded-xl p-4 shadow-md mb-4">
                <!-- Emotion selection area -->
                <h3 class="text-md font-semibold mb-2">Select Emotion</h3>
                <select class="w-full p-2 border rounded" bind:value={selectedEmotion}>
                    <option value="">All Emotions</option>
                    <option value="anger">Anger</option>
                    <option value="fear">Fear</option>
                    <option value="joy">Joy</option>
                    <option value="love">Love</option>
                    <option value="sadness">Sadness</option>
                    <option value="surprise">Surprise</option>
                </select>
                <!-- Emotion selection area -->
            </div>
            <div class="bg-white rounded-xl p-4 shadow-md flex-grow">
                <!-- Individual editing area -->
                <CommentExample {selectedEmotion} />
                <!-- Individual editing area -->
            </div>
        </div>
        

        <!-- Bar Chart Section -->
        <div class="col-span-3 bg-white rounded-xl p-4 shadow-md">
            <!-- Individual editing area -->
            <h2 class="text-lg font-semibold">Bar Chart</h2>
            <BarChart />
            <!-- Individual editing area -->
        </div>
    </div>
</div>
