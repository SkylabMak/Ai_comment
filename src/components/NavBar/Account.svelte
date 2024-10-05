<script lang="ts">
	export let a: string;
	export let ckey: string;

	// Function to handle logout or deletion of the cookie
	async function deleteFnt() {
		const response = await fetch('/api/login/logout'); // Replace with the actual endpoint URL
		if (response.ok) {
			// Refresh the page if the request was successful
			window.location.reload();
		} else {
			// Handle the error if needed
			console.error('Logout failed:', response.statusText);
		}
	}

	// Function to handle modal closing
	function handleClick(event: MouseEvent) {
		const target = event.target as HTMLElement | null;
		// Ensure target is not null before checking for the modal content
		if (target) {
			const modalContent = target.closest('.modal-content');
			if (!modalContent) {
				a = 'hidden'; // Close the modal if click is outside modal content
			}
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
	class={`relative z-10 ${a}`}
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
	tabindex="0"
	on:click={handleClick}
>
	<!-- Apply backdrop-blur to the background -->
	<div class="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm bg-opacity-50">
		<div class="flex min-h-full items-end p-4 text-center sm:items-center sm:p-0">
			<div
				class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md modal-content"
				style="transform: translate(600px, -192px);"
			>
				<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
					<div class="flex items-center justify-center mb-6 mt-4">
						<span class="font-bold text-2xl">You are logged in.</span>
					</div>

					<div class="flex flex-col items-center justify-center mb-5">
						<!-- Button for Google sign-in -->
						<div class="flex flex-col my-4 gap-2 items-center">
							<span> Your "Business_ID" is </span>
							<span class="font-bold border-2 border-black rounded-lg p-2">{` ${ckey} `}</span>
						</div>
						<button
							class="bg-white rounded-lg p-3 shadow-md flex items-center justify-center w-80 border-2 border-[#D7DBEC]"
							on:click={deleteFnt}
						>
							<img src="/src/lib/images/Google.png" alt="Google" class="h-6 w-6 mr-2" />
							<span class="text-[#ff1e1e]">logout to login page</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
