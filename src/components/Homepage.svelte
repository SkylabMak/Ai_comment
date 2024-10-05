<script lang="ts">
	import { alldataComment, alldataStore } from '$lib/store/stores';

	let alldata1: Alldata | null = null; // Declare variable with null
	let allComment: AlldataComment[] | null = null;
	alldataStore.subscribe((value) => {
		alldata1 = value;
		// console.log("data changed in component");
	});

	alldataComment.subscribe((value) => {
		allComment = value;
		// console.log(value)
	});
</script>

<div class="w-full h-full flex flex-col items-center">
	<span class="text-fuchsia-700 text-9xl">hello world!</span>
	<p class="text-red-600 text-7xl mb-10">below is data</p>
	{#if allComment}
		{#each allComment as e, index}
			<li class="text-2xl flex-col items-center rounded-lg p-4 shadow-md">
				round {index} :

				<div class="w-fit mx-auto flex justify-center items-center mb-5 rounded-lg p-4 shadow-md">
					<!-- Center each comment -->
					<p class="pr-1 text-center">{e.Comment_ID} |||</p>
					<p class="pr-1 text-center">{e.Text} |||</p>
					<p class="pr-1 text-center">{new Date(e.Time).toDateString()} |||</p>
					<p class="pr-1 text-center">{e.Emotion}</p>

					<button
						class="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors"
					>
						Action
					</button>
				</div>
			</li>
		{/each}
		<p>No data available</p>
		<!-- {console.log("alldata1 available is ")}
    {console.log(alldata1)} -->
	{/if}
</div>
