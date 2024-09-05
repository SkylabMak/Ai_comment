<script lang="ts">
	import { alldataStore, testString } from '$lib/store/stores';
import Homepage from '../components/Homepage.svelte';
export let data;
let pageData = data.data as Alldata;
const dataWithType = pageData
// Subscribe to the store
let alldata: Alldata | null = null;
  alldataStore.subscribe(value => {
    alldata = value;
  });
let sometest = ["hi","hello"]
function changeSomedata() {
    pageData = {
        ...pageData,
        products: pageData.products.map(item => ({
            ...item,
            Comment: item.Comment.map(com => ({
                ...com,
                Text: "I hate frontend",
                Emotion: "angry"
            }))
        }))
    }
    sometest[1] = "Mek"
    testString.set("hi")
    console.log(pageData)
}
console.log("data in page "+alldata)
</script>

<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded drop-shadow-2xl"
    on:click={
    changeSomedata
    }>
    click me to talk to Mek
</button>
<Homepage data={pageData} sometest={sometest}/>
