import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

export const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clusterai.944ar.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.atlas_DB_NAMEMONGO_CLUSTER}}`;

export const db = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: false,
		deprecationErrors: false
	}
}).db(process.env.MONGO_CLUSTER);

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: false,
		deprecationErrors: false
	}
});

export async function testConnection() {
	try {
		console.log('conneting to atlas');
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		await client.db('admin').command({ ping: 1 });
		console.log('Pinged your deployment. You successfully connected to MongoDB!');
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

export async function checkExistence(
	collection: string,
	key: string,
	value: string
): Promise<CompanyConnection | null> {
	try {
		const dbCollection = db.collection(collection);
		const document = await dbCollection.findOne({ [key]: value });
		return document as unknown as CompanyConnection;
	} catch (error) {
		console.error('Error in checkExistence:', error);
		throw error;
	}
}

// run().catch(console.dir);
