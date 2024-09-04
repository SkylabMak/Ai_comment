<script lang="ts">
	import type { PageData } from './$types';
	import Homepage from '../components/Homepage.svelte';
	export let data: PageData;
    const CKey = data.userCKey ?? 'none-of-key';
</script>

<div>
    <Homepage CKey={CKey}/>
</div>