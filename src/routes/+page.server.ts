import { alldataStore } from '$lib/store/stores';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
	const { data } = await parent(); // get data from layout server (from parent ex. +layout.server.ts)
	let CKey = data.CKey //decapsulation
	// console.log("Ckey in server page with pass data is "+CKey)
	
	// alldataStore.subscribe(value => { // run when alldataStore has changed
		// console.log("print from +page.server.ts : all data in change => "+value?.CKey)
	// })
	// alldataStore.set(data)
	return {
		data: data 
	};
};