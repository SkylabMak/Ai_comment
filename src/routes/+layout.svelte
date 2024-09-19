<script lang="ts">
import '../app.css';
import type {
    LayoutData
} from './$types';

import {
    alldataComment,
} from '$lib/store/stores';

import {
    onMount
} from 'svelte';
export let data: LayoutData; // get data from layout server

let layoutData: Alldata | null = null;

alldataComment.subscribe(value => { //subscribe for run this function when "alldataStore" changes.
    console.log("comment data have changed detail in beblow")
    console.log(value)
})

const cKey = data.data.CKey;
let emotions = data.data.Emotions;

// Function to call the API
async function updateEmotions(i: number) {
    emotions[i] = !emotions[i]
    const response = await fetch('/api/setEmotion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            CKey: cKey, // Company Key
            Emotions: emotions // Array of booleans (Emotions) 
            //anger, fear, joy, love, sadness, surprise
        })
    });
}

function getallComments(productID: string, alldata: boolean) {
    let alldataComment1: AlldataComment[] = []
    console.log(data.data)

        data.data.products.map(product => {
            if (alldata) {
                product.Comment.map(comment => alldataComment1.push({
                    Comment_ID: comment.comment_ID,
                    Text: comment.Text,
                    Time: comment.Time,
                    Emotion: comment.Emotion,
                }))
            } else if (product.Product_ID === productID) {
                product.Comment.map(comment => alldataComment1.push({
                    Comment_ID: comment.comment_ID,
                    Text: comment.Text,
                    Time: comment.Time,
                    Emotion: comment.Emotion,
                }))
            }
        })
    
    alldataComment.set(alldataComment1) //set data to main global store
}

async function rename(id: string, name: string) {
    const response = await fetch('/api/rename', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            CKey: cKey,
            Product_ID: id,
            Name_product: name
        })
    });
}

onMount(async () => {
    getallComments("", true)
});
// import * as d3 from 'd3';

// d3.select('body').append('p').text('Hello, D3 with TypeScript!');

</script>

<head>
    <link rel="icon" href="data:," />
</head>
<main class="max-h-screen flex flex-col bg-purple-100">
    <!-- Navbar or Button Section -->
    <div class="app w-full drop-shadow-2xl flex flex-col items-center justify-center">
        {#if layoutData}
        <!-- <h1>navbar : {layoutData.CKey}</h1> -->
        {/if}
        <!-- <div class="button-container mb-4 ">
            <button  on:click={() => updateEmotions(0)}>Anger</button>
            <button on:click={() => updateEmotions(1)}>Fear</button>
            <button on:click={() => updateEmotions(2)}>Joy</button>
            <button on:click={() => updateEmotions(3)}>Love</button>
            <button on:click={() => updateEmotions(4)}>Sadness</button>
            <button on:click={() => updateEmotions(5)}>Surprise</button>
        </div> -->

        <!-- Additional Buttons -->

        <div class="p-2">
            <button class="bg-white rounded-xl p-4 shadow-md" on:click={() => getallComments("2", false)}>click me for test Data changes</button>
            <!-- <button on:click={() => rename("2", "Product Nutty")}>Change Name</button> -->
        </div>
    </div>

    <!-- Content Slot (will fill the rest of the screen) -->
    <div class="flex flex-col flex-grow">
        <slot />
    </div>
</main>
