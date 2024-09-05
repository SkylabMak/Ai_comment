import type { RequestHandler } from "@sveltejs/kit";
import { db, testConnection } from '$lib/utils/mongo';
import { sendEMail } from "$lib/utils/mailService";

export const GET: RequestHandler = async () => {

    await sendEMail('65050874@kmitl.ac.th','sooo sad','sad','1111','test')

    return new Response(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };
