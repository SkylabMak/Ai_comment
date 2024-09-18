import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async({ url, cookies }) => {
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
	// console.log("fetch done")
	// responseDB.json()
	let ckeyJson = await responseDB.json()
	// console.log(ckeyJson)
	let ckey = ckeyJson.CKey
	cookies.set('CKey', ckey, {
		path: '/', 
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 1,
	});
	// redirect(303, '/');
  return new Response(null, {
    status: 200,
    headers: {
        'Set-Cookie': `CKey=${ckey}; HttpOnly; Path=/; Max-Age=${1 * 60 * 60};`,
        Location: '/'
    }
});
};