<script lang="ts">	
	export let CKey: string;
    let rounds = 100;
    let roundArray = Array.from({ length: rounds }, (_, i) => i + 1);
</script>

<div class="w-full h-full flex flex-col items-center">
    <span class="text-fuchsi`a-700 text-9xl	">hello world!</span>
    <p class="text-red-600 text-7xl	mb-10">below is CKey </p>
    {#each roundArray as round}
        <li class="text-2xl">round {round} : {CKey}</li>
    {/each}

</div>