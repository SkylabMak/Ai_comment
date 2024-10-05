import type { RequestHandler } from '@sveltejs/kit';
import { db, testConnection } from '$lib/utils/mongo';
import 'dotenv/config';
import { commentsDate1 } from './myData';

// const account1{ Google_ID: string; name: string; email: string } ={

// }

const comData1: CompanyConnection = {
	Google_ID: 'google-123',
	Email: 'contact1@company.com',
	CName: 'CompanyName01',
	CKey: 'CompanyKey123',
	Emotions: [true, true, false, false, true, false]
};
const comData2: CompanyConnection = {
	Google_ID: 'google-987',
	Email: 'contact2@company.com',
	CName: 'CompanyName02',
	CKey: 'CompanyKey5196519',
	Emotions: [true, true, false, false, false, false]
};

let i = 5;
// const commentsDate2: ProductConnection[] = commentsDate1.map(
//     e => { e.Product_ID = (i--).toString();e.CKey="CompanyKey5196519"; return e; }
// )
export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;
	// console.log(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clusterai.944ar.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.atlas_DB_NAMEMONGO_CLUSTER}}`)
	await testConnection();
	if (id) {
		// console.log('run');
		// const companyCollection = db.collection('company');
		// // await companyCollection.createIndex({ CKey : 2 }, { unique: true });
		// const result1 = await companyCollection.insertMany([
		//     comData1, comData2
		// ])
		// console.log(result1)

		// Ensure that a compound index exists

		const ProductCollection = db.collection('product');
		// await ProductCollection.createIndex({ Product_ID: 1, CKey: 1 }, { unique: true });
		// const combinedProductData = [...commentsDate1, ...commentsDate2];
		const result2 = await ProductCollection.insertMany(commentsDate1);

		// console.log(result2)
	}

	return new Response(JSON.stringify({ susscessfull: 'done' }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
