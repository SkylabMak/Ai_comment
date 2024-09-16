<script	async script lang="ts">
import '../app.css';
import type {
    LayoutData
} from './$types';

import {
	alldataComment,
    alldataStore
} from '$lib/store/stores';

import { onMount } from 'svelte';
export let data: LayoutData; // get data from layout server

let count = 1
let layoutData: Alldata | null = null;

alldataStore.subscribe(value => { //subscribe for run this function when "alldataStore" changes.
    layoutData = value
    // console.log("data changed in layout " + count + " time")
})

alldataComment.subscribe(value => { //subscribe for run this function when "alldataStore" changes.
    console.log(value)
})
alldataStore.set(data.data) //set data to main global store

console.log(data)
console.log(data.data.products[0])

const cKey = data.data.CKey;
let emotions = data.data.Emotions;

let responseMessage = '';

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

function getallComments(productID : string, alldata : boolean) {
    let alldataComment1: AlldataComment[] = []
    data.data.products.map(product => {
        if(alldata){
            product.Comment.map( comment => alldataComment1.push({
                Comment_ID: comment.comment_ID,
                Text: comment.Text,
                Time: comment.Time,
                Emotion: comment.Emotion,
            }))
        }

        else if(product.Product_ID === productID){
            product.Comment.map( comment => alldataComment1.push({
                Comment_ID: comment.comment_ID,
                Text: comment.Text,
                Time: comment.Time,
                Emotion: comment.Emotion,
            }))
        }
    })
    alldataComment.set(alldataComment1)
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

function changeSomedata() {
    let dummy: Alldata | null = null
    if (layoutData) {
        dummy = {
            ...layoutData,
            products: layoutData.products.map(item => {
                return {
                    ...item,
                    Comment: item.Comment.map(com => ({
                        ...com,
                        Text: "I hate frontend",
                        Emotions: "angy"
                    }))
                };
            })
        };
    }
    alldataStore.set(dummy) //set data or change "alldataStore"
}

// console.log("data in layout page "+alldata)
onMount(async () => {
    getallComments("",true)
});

</script>
<div class="app w-full h-full drop-shadow-2xl flex flex-col items-center justify-center">
    {#if layoutData}
    <h1>navbar : {layoutData.CKey}</h1>
    {/if}
    <div class="button-container">
        <button on:click={() => updateEmotions(0)}>Anger</button>
        <button on:click={() => updateEmotions(1)}>Fear</button>
        <button on:click={() => updateEmotions(2)}>Joy</button>
        <button on:click={() => updateEmotions(3)}>Love</button>
        <button on:click={() => updateEmotions(4)}>Sadness</button>
        <button on:click={() => updateEmotions(5)}>Surprise</button>
    </div>

    <!-- Call the API when a button is clicked -->
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded drop-shadow-2xl"
        on:click={
            changeSomedata
        }>
        Change Data
    </button>

    <button on:click={() => getallComments("2", false)}>All Comments</button>
    <button on:click={() => rename("2", "Product Nutty")}>Change Name</button>
</div>

<main >
    <slot/>
</main>