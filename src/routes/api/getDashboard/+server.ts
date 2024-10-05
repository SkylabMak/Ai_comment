import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/utils/mongo';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	// console.log(body.CKey + " : from post method in getdashboard backend api")
	const companyCollection = db.collection('company');
	let results = await companyCollection
		.aggregate([
			{
				$match: {
					CKey: body.CKey
				}
			},
			{
				$lookup: {
					from: 'product',
					localField: 'CKey',
					foreignField: 'CKey',
					as: 'products'
				}
			},
			{
				$project: {
					_id: 0,
					Emotions: 1,
					'products.CKey': 1,
					'products.Product_ID': 1,
					'products.Name_product': 1,
					'products.Comment': 1
				}
			}
		])
		.toArray();
	if (results.length === 0) {
		// console.log("getDashboard : ",results)
		results = [{}];
	}
	return new Response(JSON.stringify(results[0]), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
