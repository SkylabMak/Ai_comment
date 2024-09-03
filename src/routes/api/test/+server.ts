import type { RequestHandler } from "@sveltejs/kit";
import { users } from './data';
import { db } from "$lib/utils/mongo";

export const GET: RequestHandler = async () => {
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  console.log(body + " from post method")
  const companyCollection = db.collection('company');
  //join
  const results = await companyCollection.aggregate([
    {
      $lookup: {
        from: "product",           // The target collection (product)
        localField: "CKey",        // Field from the company collection
        foreignField: "CKey",      // Field from the product collection
        as: "products"             // Output array field name in the result
      }
    }
  ]).toArray();
  return new Response(JSON.stringify(results), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};