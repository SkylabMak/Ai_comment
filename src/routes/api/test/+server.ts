import type { RequestHandler } from "@sveltejs/kit";
import { users } from './data';
import { db } from "$lib/utils/mongo";
import { getModelPrediction } from "$lib/model/useModel";

export const GET: RequestHandler = async () => {
  try {
    console.log("test api run")
    const results = await getModelPrediction("i cant feel too sympathetic for the humans that get killed by yoma as its merely a part of nature here")
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