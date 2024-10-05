<script lang="ts">
	import { alldataComment } from '$lib/store/stores';

	export let cKey: string;
	export let p: string;

	let productId = ''; // Variable to hold the product ID
	let productName = ''; // Variable to hold the product name

	let showResultModal = 'hidden'; // Variable to control the result modal visibility
	let resultMessage = ''; // Variable to store the success or error message

	async function addProduct() {
		try {
			const response = await fetch('/api/addProduct', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					CKey: cKey,
					Product_ID: productId,
					Name_product: productName,
					Comment: []
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to add product');
			}

			// If successful, parse the JSON response
			const result = await response.json();
			// console.log('Product added successfully : ', result);

			// Set success message and show result modal
			resultMessage = 'Add Product Successfully';
			showResultModal = '';
		} catch (error) {
			console.error('Error adding product : ', error);

			// Set error message and show result modal
			resultMessage = `Error : ${(error as Error).message}`;
			showResultModal = '';
		}
	}
</script>

<!-- Add Product Modal -->
<div
	class={`relative z-10 ${p} ${showResultModal === '' ? 'backdrop-blur-sm' : ''}`}
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div class="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm bg-opacity-50">
		<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
			<div
				class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-80 sm:w-full sm:max-w-md modal-content"
			>
				<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mt-2">
					<button
						class="absolute top-3 right-5"
						on:click={() => {
							p = 'hidden';
						}}>x</button
					>
					<div class="mb-6">
						<span class="font-bold text-2xl">Add Product</span>
					</div>

					<div class="mb-5">
						<span>ID</span>
						<input
							type="text"
							bind:value={productId}
							class="border rounded p-2 w-full"
							placeholder="Enter Product ID"
						/>
					</div>

					<div class="mb-5">
						<span>Name</span>
						<input
							type="text"
							bind:value={productName}
							class="border rounded p-2 w-full"
							placeholder="Enter Product Name"
						/>
					</div>

					<div class="mb-4 flex justify-end">
						<button
							class="bg-white rounded-lg p-2 flex items-center justify-center w-39 mx-3"
							on:click={() => {
								p = 'hidden';
							}}
						>
							<span class="text-[#6E0BD4]">Cancel</span>
						</button>

						<button
							class="bg-[#A75EF1] rounded-lg p-2 flex items-center justify-center w-39 mx-3"
							on:click={() => addProduct()}
						>
							<span class="text-white">Confirm</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Success/Error Modal -->
<div
	class={`fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm bg-opacity-50 ${showResultModal}`}
>
	<div class="bg-white rounded-lg p-10 w-80 shadow-xl text-center">
		<div class="mb-4 text-lg font-bold">
			{resultMessage}
		</div>
		<button
			class="bg-[#A75EF1] text-white rounded-lg p-2 mt-4"
			on:click={() => (showResultModal = 'hidden')}
		>
			Confirm
		</button>
	</div>
</div>
