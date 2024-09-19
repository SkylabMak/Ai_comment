import { authorizationUri, } from "$lib/utils/auth2Tool";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    return new Response(JSON.stringify({ url: authorizationUri }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };