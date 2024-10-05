<script lang="ts">
	export let cKey: string;
	export let emotions: boolean[];
	export let s: string;

	async function updateEmotions(i: number) {
		emotions[i] = !emotions[i];
		const response = await fetch('/api/setEmotion', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				CKey: cKey,
				Emotions: emotions // Array of booleans (Emotions)
			})
		});
	}

	let e = ['Anger', 'Fear', 'Joy', 'Love', 'Sadness', 'Surprise'];

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement | null;

		// Ensure the target is not null and it's an HTMLElement
		if (target) {
			const modalContent = target.closest('.modal-content');
			if (!modalContent) {
				s = 'hidden'; // Hide if click is outside modal content
			}
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
	class={`relative z-10 ${s}`}
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
	tabindex="0"
	on:click={handleClickOutside}
>
	<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
		<div class="flex min-h-full items-end p-4 text-center sm:items-center sm:p-0">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-64 modal-content h-auto"
				on:click={(e) => e.stopPropagation()}
				style="transform: translate(1040px, -174px);"
			>
				<div class="bg-white px-0 pb-0 pt-0 sm:p-0">
					{#if emotions && emotions.length > 0}
						{#each emotions as checked, index}
							<div
								class={`flex items-center mb-0 p-3 ml-0 ${checked ? 'bg-[#F4E9FE] text-[#6E0BD4]' : 'border-white'}`}
							>
								<input
									id="default-checkbox-{index}"
									type="checkbox"
									bind:checked={emotions[index]}
									class="ml-1 w-4 h-4 text-[#A75EF1] accent-[#A75EF1] bg-gray-100 border-gray-300 rounded focus:ring-[#A75EF1] dark:bg-gray-700 dark:border-gray-600"
									on:click={() => updateEmotions(index)}
								/>

								<label for="default-checkbox-{index}" class="ms-2 text-sm font-medium">
									{e[index]}
								</label>
							</div>
						{/each}
					{:else}
						<div>No emotions available</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
