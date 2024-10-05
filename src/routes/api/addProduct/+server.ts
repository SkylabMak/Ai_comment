import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/utils/mongo';
import { json } from '@sveltejs/kit';
import { z } from 'zod';

// Create Schema for validating comments
const CommentSchema = z.object({
	comment_ID: z.string().min(1, 'comment_ID is required'),
	Text: z.string().min(1, 'Text cannot be empty'),
	Time: z.string().min(1, 'Time cannot be empty'),
	Emotion: z.string().min(1, 'Emotion cannot be empty')
});

// Create Schema for validating product data
const ProductSchema = z.object({
	CKey: z.string().min(1, 'CKey is required'),
	Product_ID: z.string().min(1, 'Product_ID is required'),
	Name_product: z.string().min(1, 'Name_product is required'),
	Comment: z.array(CommentSchema).optional()
});

// Function for error handling
const handleError = (error: unknown) => {
	if (error instanceof z.ZodError) {
		// Return error if validation fails
		return json({ errors: error.errors }, { status: 400 });
	} else if (
		error instanceof Error &&
		error.name === 'MongoServerError: E11000 duplicate key error collection'
	) {
		// Handle MongoDB errors
		return json({ Success: false, message: 'Database error' }, { status: 500 });
	}

	// Return a generic error for other cases
	return json({ Success: false, message: 'duplicate ID product' }, { status: 500 });
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Validate incoming data against the schema
		const parsedData = ProductSchema.parse(data);

		// Check if the CKey already exists in the database
		const existingProduct = await db
			.collection('product')
			.findOne({ Product_ID: parsedData.Product_ID });

		// If CKey is already present, return a 400 error
		if (existingProduct) {
			return json({ Success: false, message: 'ID product already exists' }, { status: 400 });
		}

		// Insert new product data into the database
		const result = await db.collection('product').insertOne(parsedData);

		// Return success response with the inserted ID
		return json({ Success: true, insertedId: result.insertedId.toString() }, { status: 200 });
	} catch (error) {
		// Handle errors safely by checking if it's an instance of Error
		if (error instanceof Error) {
			return json(
				{ Success: false, message: 'An error occurred', error: error.message },
				{ status: 500 }
			);
		} else {
			// Handle unknown error types
			return json({ Success: false, message: 'An unknown error occurred' }, { status: 500 });
		}
	}
};
