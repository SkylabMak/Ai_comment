import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { data } = await parent(); // get data from layout server (from parent ex. +layout.server.ts)
	return {
		data: data
	};
};
