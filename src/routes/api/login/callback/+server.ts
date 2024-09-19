import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
    const code = url.searchParams.get('code');
    return new Response(JSON.stringify(code), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };