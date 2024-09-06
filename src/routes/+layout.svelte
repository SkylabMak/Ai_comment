<script lang="ts">
import '../app.css';
import type {
    LayoutData
} from './$types';
import {
    alldataStore
} from '$lib/store/stores';

export let data: LayoutData; // get data from layout server
let count = 1
let layoutData: Alldata | null = null;
alldataStore.subscribe(value => { //subscribe for run this function when "alldataStore" changes.
    layoutData = value
    console.log("data changed in layout " + count + " time")
})
alldataStore.set(data.data) //set data to main global store

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
                        Emotion: "angry"
                    }))
                };
            })
        };
    }
    alldataStore.set(dummy) //set data or change "alldataStore"
}

// console.log("data in layout page "+alldata)
</script>

<div class="app w-full h-full drop-shadow-2xl flex flex-col items-center justify-center">
    {#if layoutData}
    <h1>navbar : {layoutData.CKey}</h1>
    {/if}

    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded drop-shadow-2xl"
        on:click={
        changeSomedata
        }>
        click me to talk to Mek
    </button>
</div>

<main >
    <slot/>
</main>
