<script lang="ts">
import {
    alldataStore
} from '$lib/store/stores';
import Homepage from '../components/Homepage.svelte';
import type {
    PageData
} from './$types';
export let data: PageData;
alldataStore.set(data.data) //set data to main global store
</script>

<div>
    <Homepage />
</div>
