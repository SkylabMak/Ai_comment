import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ fetch, cookies, url }) => {
	//get cookie
	const CKeyCookie = cookies.get('CKey');
	const currentPath = url.pathname;
	// console.log('path is ' + currentPath);
	// console.log('CKeyCookie ' + CKeyCookie);
	//check exeption to redirect
	if (!CKeyCookie && url.pathname !== '/callback' && url.pathname !== '/favicon.ico') {
		// console.log('redilect for login in layout');
		const loginURL = (await (await fetch('/api/login/getURL')).json()).url;
		throw redirect(303, loginURL);
	}
	// console.log("-------------------- not redirect ----------------------" )
	// console.log("CKeyCookie in layout is "+CKeyCookie )

	//get data
	const response = await fetch('/api/getDashboard', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			CKey: CKeyCookie
		})
	});
	const data = (await response.json()) as Alldata;
	// console.log("-------------------- setting data ----------------------" )
	// console.log("get data",data)
	data.CKey = CKeyCookie as string;
	// console.log("-------------------- setting CKey in data ----------------------" )
	// console.log(data)
	// alldataStore.set(data);
	return {
		data: data //pass data to child (copy to go out)
	};
};
