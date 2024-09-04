import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies,fetch }) => {
	let CKeyCookie = cookies.get('CKey');
	if (!CKeyCookie) {
		const loginURL = (await (await fetch('/api/login/getURL')).json()).url;
		redirect(303, loginURL);
	}

	return {
		userCKey: CKeyCookie
	};
};