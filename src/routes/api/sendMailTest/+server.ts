import type { RequestHandler } from '@sveltejs/kit';
import { db, testConnection } from '$lib/utils/mongo';
import { sendEMail } from '$lib/utils/mailService';

export const GET: RequestHandler = async () => {
	await sendEMail('publicaccout.mek@gmail.com', 'sooo sad', 'sad', '1111', 'test');
	return new Response(null, {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
