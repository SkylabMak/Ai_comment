<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	
	export let data: PageData;
	onMount(() => {
		goto('/');
	});
</script>

<h1>this text should not be displayed for a long time</h1>
<div>{@html data.ckey}</div>