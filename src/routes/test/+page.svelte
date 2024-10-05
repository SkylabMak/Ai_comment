<script lang="ts">
	export let data: {
		users: Array<{
			id: number;
			name: string;
			email: string;
		}>;
		database: Array<Alldata>;
	};
	// export let datafomrDB : {database : CompanyConnection};
</script>

<h1 class="text-2xl font-bold mb-4">User List</h1>

{#if data.users.length > 0}
	<div>
		<ul class="space-y-4">
			{#each data.users as user}
				<li class="bg-gray-100 rounded-lg p-4 shadow-md">
					<div class="flex justify-between items-center">
						<div>
							<p class="text-lg font-semibold">{user.name}</p>
							<p class="text-gray-600">{user.email}</p>
						</div>
						<button
							class="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors"
						>
							Action
						</button>
					</div>
				</li>
			{/each}
		</ul>
		<div class="m-3">
			{#each data.database as db}
				<div class="bg-gray-100 rounded-lg p-4 shadow-md m-5">
					<div class="flex justify-between items-center">
						<div>
							<p class="text-lg font-semibold">{db.CKey}</p>
							<p class="text-gray-600">{db.CKey}</p>
							<p class="text-gray-600">have {db.products.length} comment</p>
						</div>
						<button
							class="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors"
						>
							Action
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<p>No users found.</p>
{/if}
