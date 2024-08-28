// src/routes/[your-route]/+page.server.ts

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  // Replace this URL with your actual backend API endpoint
  const response = await fetch('/api/test');
  
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const users = await response.json();

  return {
    users
  };
};
