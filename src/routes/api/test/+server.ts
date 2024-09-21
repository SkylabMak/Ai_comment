import type { RequestHandler } from "@sveltejs/kit";
import { users } from './data';
import { db } from "$lib/utils/mongo";
import { getModelPrediction } from "$lib/model/useModel";
import { predict } from "$lib/model/predict";

export const GET: RequestHandler = async () => {
  try {
    console.log("test api run")
    const results = await predict("i don t feel insecure")
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log("api test error ")
    return new Response(null,
      {
      status: 500,
      }
    )
  }
 
};

export const POST: RequestHandler = async ({ request }) => {
  return new Response(JSON.stringify(""), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

