import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	// Replace this URL with your actual backend API endpoint
	const response = await fetch('/api/test');
	const responseDB = await fetch('/api/test', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			someKey: 'mai'
		})
	});
	const resDB = await responseDB.json();
	// console.log(resDB)
	if (!response.ok) {
		throw new Error('Failed to fetch user data');
	}

	const users = await response.json();
	const database = resDB;

	return {
		users,
		database
	};
};
