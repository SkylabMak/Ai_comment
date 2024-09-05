<script lang="ts">
// import type { Alldata } from '$lib/store/stores'; // Assuming you have the type in stores.ts or adjust accordingly
import {
    alldataStore,

	testString

} from '$lib/store/stores';
export let data: Alldata | null;
export let sometest : string[]
let alldata1: Alldata | null = null;
alldataStore.subscribe(value => {
    alldata1 = value;
});
let testString02 : string | null
testString.subscribe((value) => {
	// console.log(value);
    testString02 = value
}); // logs '0'

console.log("data in component " + data?.CKey)
</script>

<div class="w-fit h-full flex flex-col items-center">
    <div>{sometest}</div>
    {#if testString02}
    <div>{testString02}</div>
    {/if}
    <span class="text-fuchsi`a-700 text-9xl	">hello world!</span>
    <p class="text-red-600 text-7xl	mb-10">below is data </p>
    {#if data && data.products}

    {#each data.products as e, index }
    <li class="text-2xl flex items-center flex-wrap rounded-lg p-4 shadow-md">round {index} :

        {#each e.Comment as e1, index }
        <div class="flex justify-start items-start mb-5 rounded-lg p-4 shadow-md">
            <p class="pr-1">{e1.comment_ID}</p>
            <p class="pr-1">{e1.Text}</p>
            <p class="pr-1">{e1.Time}</p>
            <p class="pr-1">{e1.Emotion}</p>
            <button
                class="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors"
                >
                Action
            </button>
        </div>
        {:else}
        <p>No data available</p>
        {/each}

    </li>
    {:else}
    <p>No data available</p>
    {/each}
    {/if}
</div>
