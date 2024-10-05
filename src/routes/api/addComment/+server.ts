import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/utils/mongo';
import { ObjectId, Timestamp } from 'mongodb';
import { getEmotion } from '$lib/utils/getEmotion';
import { GOOGLE_ID } from '$env/static/private';
import { emotionToNumber, numberToEmotion } from '$lib/utils/emotionAndNumber';
import { sendEMail } from '$lib/utils/mailService';
import { getIDEmotion } from '$lib/model/useModel';

export const POST: RequestHandler = async ({ request }) => {
	try {
		// console.log(request);
		const body = await request.json();
		const date = new Date();
		const emotion: number = await getIDEmotion(body.comment);
		const commentObj = {
			comment_ID: new ObjectId(),
			Text: body.comment,
			Time: date.toISOString(),
			Emotion: numberToEmotion(emotion)
		};
		const companyCollection = db.collection('company');
		// companyCollection.find
		const companyData = await companyCollection
			.aggregate([
				{
					$match: {
						CKey: body.Business_ID
					}
				},
				{
					$project: {
						Email: 1,
						Emotions: 1
					}
				}
			])
			.toArray();
		if (companyData.length === 0) {
			return json({ message: 'Business_ID not found' }, { status: 400 });
		}
		// emotion = "fear"
		console.log(emotion, ' ', numberToEmotion(emotion));
		console.log(companyData[0].Emotions);
		if (companyData[0].Emotions[emotion]) {
			console.log('sendEmail with ', emotion, ' ', numberToEmotion(emotion), ' emotion');
			sendEMail(
				companyData[0].Email,
				body.comment,
				numberToEmotion(emotion),
				body.Product_ID,
				body.Name_product
			);
		}
		// console.log(body);
		const result = await db.collection('product').updateOne(
			{
				Product_ID: body.Product_ID,
				CKey: body.Business_ID
			},
			{
				$push: { Comment: commentObj }
			}
		);
		if (result.matchedCount !== 0) console.log('product found. api will add comment');
		if (result.matchedCount === 0) {
			console.log('No product found. api will add product with comment');
			await db.collection('product').insertOne({
				Product_ID: body.Product_ID,
				CKey: body.Business_ID,
				Name_product: body.Name_product,
				Comment: [commentObj]
			});
		}
		return json({ message: 'OK' }, { status: 200 });
	} catch (error) {
		console.error('error', error);
		return json({ message: 'Internal Server Error' }, { status: 500 });
	}
};
