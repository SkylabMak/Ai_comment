<script lang="ts">
    import { onMount } from 'svelte';
    import { alldataComment } from "$lib/store/stores";

    export let cKey: string; 
    export let h: string = "hidden"; // Controls the visibility of the modal

    export let searchQuery = ''; // Bind the search query from layout.svelte

    let products: any[] = []; // Store for products

    // Function to fetch company data based on CKey
    async function fetchCompanyData() {
        try {
            const response = await fetch('/api/getDashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ CKey: cKey })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error('Failed to fetch company data:', error);
            return null;
        }
    }

    // Computed property to filter products based on the search query
    $: filteredProducts = products.filter(product =>
        product.Name_product.toLowerCase().includes(searchQuery.toLowerCase())
    );

    onMount(async () => {
        const data = await fetchCompanyData();
        if (data && data.products) {
            products = data.products;
        }
    });

    // Function to handle the click on a product name
    function handleProductClick(productId: string) {
        // Find the product by Product_ID
        const product = products.find(p => p.Product_ID === productId);

        if (product && product.Comment) {
            // Map the comments to the AlldataComment structure
            const filteredComments = product.Comment.map(comment => ({
                Comment_ID: comment.comment_ID,
                Text: comment.Text,
                Time: comment.Time,
                Emotion: comment.Emotion
            }));

            // Update the alldataComment store
            alldataComment.set(filteredComments);
        }
        console.log(product)
    }
</script>

<!-- Modal for displaying product names -->
<div class={`relative z-10 ${h}`} aria-labelledby="modal-title" role="dialog" aria-modal="true" tabindex="0" on:click={(event) => {
    const target = event.target;
    const modalContent = target.closest('.modal-content');
    if (!modalContent) {
        h = "hidden";
    }
}}>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="min-h-full items-end p-4 text-center sm:items-center">
            <div class="relative transform overflow-hidden rounded-sm bg-white text-left shadow-xl transition-all w-[23%] modal-content h-auto" on:click={(e) => e.stopPropagation()} style="transform: translate(437px, 47px);">
                <div class="bg-white px-0 pb-0 pt-0 sm:p-0">
                    {#if filteredProducts.length > 0}
                        <ul>
                            {#each filteredProducts as product}
                                <li class="p-3 ml-0 hover:bg-[#F4E9FE] hover:text-[#6E0BD4] transition-colors" 
                                    on:click={() => handleProductClick(product.Product_ID)}>
                                    {product.Name_product}
                                </li>
                            {/each}
                        </ul>
                    {:else if filteredProducts.length === 0}
                        <p class="p-3">No products found</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>