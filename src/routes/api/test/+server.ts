import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/utils/mongo";

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  
  console.log(body.someKey + " : from add_edit in backend api");

  const productCollection = db.collection('product');

  let result;
  let success = false;

  // For company collection
  if (body.CKey) {
   
    const { CKey, Name_product } = body;
    result = await productCollection.updateOne(
      { CKey }, 
      { $set:  Name_product}, // Update fields
      { upsert: true } 
    );
    success = result.acknowledged && (result.modifiedCount > 0 || result.upsertedCount > 0);
  }
  
  return new Response(JSON.stringify(success), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
