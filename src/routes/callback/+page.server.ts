import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, fetch,cookies }) => {
	let code = url.searchParams.get('code');
	// console.log("run page server")
	const responseDB = await fetch('/api/login/getInfo', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			code: code
		})
	});
	console.log("fetch done")
	// responseDB.json()
	let ckeyJson = await responseDB.json()
	console.log(ckeyJson)
	let ckey = ckeyJson.CKey
	cookies.set('CKey', ckey, {
		path: '/', 
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 1,
	});
	// redirect(303, '/');
	return { ckey };
};