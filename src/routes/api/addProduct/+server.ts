import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/utils/mongo";
import { json } from "@sveltejs/kit";
import { z } from "zod";

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
  } else if (error instanceof Error && error.name === 'MongoError') {
    // Handle MongoDB errors
    return json({ Success: false, message: "Database error" }, { status: 500 });
  }

  // Return a generic error for other cases
  return json({ Success: false, message: "Internal Server Error" }, { status: 500 });
};

// POST handler for adding a new product
export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    // Validate incoming data against the schema
    const parsedData = ProductSchema.parse(data);

    // Insert new product data into the database
    const result = await db.collection('product').insertOne(parsedData);

    return json(
      { Success: true, insertedId: result.insertedId.toString() }, // Convert to string
      { status: 200 }
    );
};
