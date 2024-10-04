<script lang="ts">
    import '../app.css';
    import type {
        LayoutData
    } from './$types';
    
    import {
        alldataComment,
    } from '$lib/store/stores';
    
    import {
        onMount
    } from 'svelte';
    
    import Search from '../components/NavBar/Search.svelte';
    import Edit from '../components/NavBar/Edit.svelte';
    import AddProduct from '../components/NavBar/AddProduct.svelte';
    import Account from '../components/NavBar/Account.svelte';
    import Setting from '../components/NavBar/Setting.svelte';
    
    export let data: LayoutData; // get data from layout server
    
    alldataComment.subscribe(value => { //subscribe for run this function when "alldataStore" changes.
        console.log("comment data have changed detail in below")
        console.log(value)
    })
    
    const cKey = data.data.CKey;
    let emotions = data.data.Emotions;
    
    // Function to call the API
    function getallComments(productID: string, alldata: boolean) {
        let alldataComment1: AlldataComment[] = []
        console.log(data.data)
    
            data.data.products.map(product => {
                if (alldata) {
                    product.Comment.map(comment => alldataComment1.push({
                        Comment_ID: comment.comment_ID,
                        Text: comment.Text,
                        Time: comment.Time,
                        Emotion: comment.Emotion,
                    }))
                } else if (product.Product_ID === productID) {
                    product.Comment.map(comment => alldataComment1.push({
                        Comment_ID: comment.comment_ID,
                        Text: comment.Text,
                        Time: comment.Time,
                        Emotion: comment.Emotion,
                    }))
                }
            })
        
        alldataComment.set(alldataComment1) //set data to main global store
    }
    
    onMount(async () => {
        getallComments("", true)
    });
   
    let h = "hidden", e = "hidden", p = "hidden", a = "hidden", s = "hidden"

    let searchQuery = '';

    // Function to show the modal
    function showModal() {
        h = "block";
    }
</script>
    
<head>
    <link rel="icon" href="data:," />
</head>
    
<main class="min-h-screen flex flex-col">
    <!-- Edit -->
    <Edit cKey={cKey} bind:e={e}/>
    
    <!-- Add Product -->
    <AddProduct cKey={cKey} bind:p={p}/>
    
    <!-- Account -->
    <Account cKey={cKey} bind:a={a}/>
        
    <!-- Setting -->           
    <Setting cKey={cKey} emotions={emotions} bind:s={s}/>

    <!-- Search --> 
    <Search cKey={cKey} bind:h={h} searchQuery={searchQuery}/>
        
    <!-- Button Section -->
    <div class="app w-full drop-shadow-2xl flex flex-col items-center justify-center mt-4">
        <div class="flex items-center p-2 space-x-4"> 
            <!-- Search Bar --> 
            <button class="bg-white rounded-full p-2 shadow-md flex items-center w-96 mr-10" on:click={showModal}> 
                <img src="/src/lib/images/Search.png" alt="Search" class="h-5 w-5 mr-2" />
                <input
                    type="text"
                    placeholder="Search..."
                    bind:value={searchQuery}
                    class="text-[#959BA5] bg-transparent focus:outline-none w-full"
                />
            </button>      
                
            <!-- Edit Button -->
            <button class="bg-white rounded-full p-2 shadow-md ml-10" on:click={() => {e = "block"}}>
                <img src="/src/lib/images/Edit.png" alt="Edit" class="h-6 w-6" />
            </button>
    
            <!-- Add Product Button -->
            <button class="bg-white rounded-full p-2 shadow-md ml-10" on:click={() => {p = "block"}}>
                <img src="/src/lib/images/AddProduct.png" alt="Add Product" class="h-6 w-6" />
            </button>
    
            <!-- Account Button -->
            <button class="bg-white rounded-full p-2 shadow-md ml-10" on:click={() => {a = "block"}}>
                <img src="/src/lib/images/Account.png" alt="Account" class="h-6 w-6" />
            </button>
                
            <!-- Setting Button -->
            <button class="bg-white rounded-full p-2 shadow-md ml-10" on:click={() => {s = "block"}}>
                <img src="/src/lib/images/Setting.png" alt="Setting" class="h-6 w-6" />
            </button>
        </div>
    </div>
        
    <!-- Content Slot (will fill the rest of the screen) -->
    <div class="flex flex-col flex-grow">
        <slot />
    </div>
</main>