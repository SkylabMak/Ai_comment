<script lang="ts">
	import { onMount } from 'svelte';
	import Rename from '../NavBar/Rename.svelte';

	export let cKey: string;
	export let e: string;

	let products: { Name_product: string; Product_ID: string }[] = [];
	let r = 'hidden';
	let selectedProductId = ''; // Holds the ID of the product being renamed

	async function fetchCompanyData() {
		try {
			const response = await fetch('/api/getDashboard', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ CKey: cKey })
			});

			if (!response.ok) {
				throw new Error(`Error : ${response.status} ${response.statusText}`);
			}

			const data = (await response.json()) as Alldata;
			return data;
		} catch (error) {
			console.error('Failed to fetch company data : ', error);
			return null;
		}
	}

	onMount(async () => {
		const data = await fetchCompanyData();
		if (data && data.products) {
			// Sort products by Product_ID
			products = data.products.sort((a, b) => a.Product_ID.localeCompare(b.Product_ID));
		}
	});

	function openRenameModal(productId: string) {
		selectedProductId = productId; // Set the selected product ID
		r = 'block'; // Make the modal visible
	}
</script>

<div class={`relative z-10 ${e}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
	<div class="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm bg-opacity-50">
		<div class="flex min-h-dvh items-end justify-center p-4 text-center sm:items-center sm:p-0">
			<div
				class="relative max-h-dvh transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[1000px] modal-content"
			>
				<class class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mt-2">
					<button
						class="absolute top-3 right-5"
						on:click={() => {
							e = 'hidden';
						}}>x</button
					>
					<div class="ml-6 mr-6 w-full">
						<div class="flex items-center mb-6">
							<span class="font-bold">Products</span>
							<span class="text-gray-500 font-medium ml-3">{products.length}</span>
						</div>

						<div class="w-full max-h-[600px] overflow-y-auto">
							{#if products.length > 0}
								{#each products as product}
									<div
										class="flex items-center justify-between mb-2 border border-[#E6E9F4] p-6 rounded w-[955px]"
									>
										<div class="flex items-center">
											<img src="/src/lib/images/FourDots.png" alt="FourDots" class="h-5 w-1 mr-2" />
											<span class="font-medium ml-3">{product.Name_product}</span>
											<span class="font-light text-gray-500 ml-3">(#{product.Product_ID})</span>
										</div>

										<button
											class="bg-white rounded-full p-2 ml-10"
											on:click={() => openRenameModal(product.Product_ID)}
										>
											<img
												src="/src/lib/images/EditPencil.png"
												alt="EditPencil"
												class="h-5 w-5 ml-2 mr-8"
											/>
										</button>

										<!-- Rename Modal -->
										{#if r === 'block' && selectedProductId === product.Product_ID}
											<div
												class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-opacity-50"
											>
												<Rename {cKey} id={selectedProductId} bind:r />
											</div>
										{/if}
									</div>
								{/each}
							{:else}
								<div>No products found</div>
							{/if}
						</div>
					</div>
				</class>
			</div>
		</div>
	</div>
</div>
