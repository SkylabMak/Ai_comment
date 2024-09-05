<script lang="ts">
import '../app.css';
import type {
    LayoutData
} from './$types';
import {
    alldataStore,

	testString

} from '$lib/store/stores';
import {
    onMount
} from 'svelte';

export let data: LayoutData;
// console.log(data.data)

// Subscribe to the store
// let alldata: Alldata | null = null;
// const unsubscribe = alldataStore.subscribe(value => {
//     alldata = value;
// });

// onMount(() => {
//     return () => {
//         unsubscribe();
//     };
// });

function changeSomedata() {
    // data.data.products.map(item => {
    //     item.Comment.map(com => {
    //         com.Text = "i hate fronted";
    //         com.Emotion = "angry";
    // 		return com
    //     })
    //     return item;
    // });
    // Create a new copy of data to trigger reactivity
    data = {
        ...data,
        data: {
            ...data.data,
            products: data.data.products.map(item => {
                return {
                    ...item,
                    Comment: item.Comment.map(com => ({
                        ...com,
                        Text: "I hate frontend",
                        Emotion: "angry"
                    }))
                };
            })
        }
    };

    console.log(data.data)
	testString.set("hi")
}

// console.log("data in layout page "+alldata)
</script>

<div class="app ">
    <div class="drop-shadow-2xl">
        <h1>navbar : {data.data.CKey}</h1>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded drop-shadow-2xl"
            on:click={
            changeSomedata
            }>
            click me to talk to Mek
        </button>
    </div>

    <main >
        <slot data={data}/>
    </main>
	
</div>
