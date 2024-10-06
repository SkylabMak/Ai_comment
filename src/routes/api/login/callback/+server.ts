import { getInfo, oauth2Client } from '$lib/utils/auth2Tool';
import { checkExistence, db } from '$lib/utils/mongo';
import type { RequestHandler } from '@sveltejs/kit';
import { generateCKey } from '$lib/utils/CKey';

export const GET: RequestHandler = async ({ url, cookies }) => {
	try {
		const code = url.searchParams.get('code') as string;
		const { tokens } = await oauth2Client.getToken(code);
		const info = await getInfo(tokens as Token);
		const doc = await checkExistence('company', 'Google_ID', info.Google_ID);
		if (doc !== null) {
			return new Response(null, {
				status: 302,
				headers: {
					'Set-Cookie': `CKey=${doc.CKey}; HttpOnly; Path=/; Max-Age=${24 * 60 * 60};`,
					'Cache-Control': 'no-store',
					Location: '/'
				}
			});
		} else {
			const dbCollection = db.collection('company');
			const genCKey = generateCKey(info.Email);
			const data: CompanyConnection = {
				Google_ID: info.Google_ID,
				Email: info.Email,
				CName: info.name,
				CKey: genCKey,
				Emotions: [true, false, false, true, true, false]
				//sadness (0), joy (1), love (2), anger (3), fear (4), and surprise (5)
			};
			await dbCollection.insertOne(data);
			return new Response(null, {
				status: 302,
				headers: {
					'Set-Cookie': `CKey=${genCKey}; HttpOnly; Path=/; Max-Age=${1 * 60 * 60};`,
					'Cache-Control': 'no-store',
					Location: '/'
				}
			});
		}
	} catch (error) {
		console.log('error in getinfoAPI : ' + error);
		return new Response(JSON.stringify({ CKey: '' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
