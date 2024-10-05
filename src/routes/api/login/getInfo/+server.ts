import { getInfo, oauth2Client } from '$lib/utils/auth2Tool';
import { checkExistence, db } from '$lib/utils/mongo';
import type { RequestHandler } from '@sveltejs/kit';
import { generateCKey } from '$lib/utils/CKey';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const code = body.code;
		const { tokens } = await oauth2Client.getToken(code);
		const info = await getInfo(tokens as Token);
		const doc = await checkExistence('company', 'Google_ID', info.Google_ID);
		if (doc !== null) {
			console.log();
			return new Response(JSON.stringify({ CKey: doc.CKey }), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Set-Cookie': `CKey=${doc.CKey}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=${24 * 60 * 60}`
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
				Emotions: [true, true, false, false, true, false]
			};
			dbCollection.insertOne(data);
			return new Response(JSON.stringify({ CKey: genCKey }), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Set-Cookie': `CKey=${genCKey}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=${24 * 60 * 60}`
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
