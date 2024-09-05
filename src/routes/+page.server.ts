import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

// export const load: PageServerLoad = async ({ cookies,fetch, url,parent }) => {
// 	const { data } = await parent();
// 	let CKey = data.CKey
// 	console.log("Ckey in page is "+CKey)
// 	// if (!CKeyCookie) {
// 	// 	console.log("redilect in page")
// 	// 	const loginURL = (await (await fetch('/api/login/getURL')).json()).url;
// 	// 	redirect(303, loginURL);
// 	// }
// 	// console.log("data in page "+alldata)
// 	return {
// 		data: data
// 	};
// };