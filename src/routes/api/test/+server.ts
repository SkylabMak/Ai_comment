// import type { RequestHandler } from "@sveltejs/kit";
// import { users } from './data';
// import { db } from "$lib/utils/mongo";
// import { predict } from "$lib/model/useModel";

// export const GET: RequestHandler = async () => {
//   const results = predict("imsosad")
//   return new Response(JSON.stringify(results), {
//     status: 200,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
// };

// export const POST: RequestHandler = async ({ request }) => {
//   const results = predict("imsosad")
//   return new Response(JSON.stringify(results), {
//     status: 200,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
// };