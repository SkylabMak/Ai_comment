import { alldataStore } from '$lib/store/stores';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
	const { data } = await parent(); // get data from layout server (from parent ex. +layout.server.ts)
	return {
		data: data 
	};
};