export const GET = async ({ fetch, setHeaders }) => {
	// Use event.fetch instead of global fetch

	return new Response('', {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'set-cookie': `CKey=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`
		}
	});
};
