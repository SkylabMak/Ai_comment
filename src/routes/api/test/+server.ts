import type { RequestHandler } from './$types';
import { users } from './data';

export const GET: RequestHandler = async () => {
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
