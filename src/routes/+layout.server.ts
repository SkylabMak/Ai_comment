import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ fetch,cookies ,url}) => {
    //get cookie
    const CKeyCookie = cookies.get('CKey');
    const currentPath = url.pathname;
	console.log("path is "+currentPath)
    //check exeption to redirect
    if (!CKeyCookie && url.pathname  !== "/callback"&& url.pathname  !== "/favicon.ico") {
        console.log("redilect in layout")
		const loginURL = (await (await fetch('/api/login/getURL')).json()).url;
		throw redirect(303, loginURL);
	}
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
    const data = (await response.json()) as Alldata
    // console.log(data)
    data.CKey = CKeyCookie as string
    // alldataStore.set(data);
    return {
        data: data //pass data to child (copy to go out)
    };
};