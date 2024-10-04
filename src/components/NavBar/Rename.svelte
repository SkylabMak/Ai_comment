<script lang="ts">
  export let cKey: string;
  export let id: string; // Product_ID passed from the parent
  export let r: string;

  let name = ''; // New name to set

  async function rename() {
    try {
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
      const data = await response.json();

      if (response.ok) {
        console.log('Product renamed successfully :', data);

        r = "hidden"; // Close the modal after successful rename
      } else {
        console.error('Failed to rename product :', data.message);
      }

    } catch (error) {
      console.error('Error during API call :', error);
    }
  }
</script>

<!-- Add Product Modal -->
<div class={`fixed inset-0 z-50 ${r} flex items-center justify-center`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="relative bg-white rounded-lg shadow-xl w-80 sm:w-full sm:max-w-md p-6">
    <button class="absolute top-3 right-5" on:click={() => { r = "hidden"; }}>x</button>
    <div class="mb-6 mt-2">
      <span class="font-bold text-2xl">Rename</span>
    </div>

    <!-- Display the Product_ID -->
    <div class="mb-3">
      <span class="text-gray-500 text-sm">Product ID : #{id}</span>
    </div>

    <div class="mb-5">
      <span>New Name</span>
      <input 
        type="text" 
        bind:value={name} 
        class="border rounded p-2 w-full" 
        placeholder="Enter Product Name" 
      />
    </div>

    <div class="mb-2 flex justify-end">
      <button class="bg-white rounded-lg p-2 flex items-center justify-center w-39 mx-3" on:click={() => { r = "hidden"; }}>
        <span class="text-[#6E0BD4]">Cancel</span>
      </button>   

      <button class="bg-[#A75EF1] rounded-lg p-2 flex items-center justify-center w-39 mx-3" on:click={() => rename()}>
        <span class="text-white">Confirm</span>
      </button> 
    </div>
  </div>
</div>