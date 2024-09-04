import { getInfo, oauth2Client } from "$lib/utils/auth2Tool";
import { checkExistence, db } from "$lib/utils/mongo";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const code = body.code
        const { tokens } = await oauth2Client.getToken(code);
        const info = await getInfo(tokens as Token)
        const doc = await checkExistence("company", "Google_ID", info.Email)
        if (doc !== null) {
            return new Response(JSON.stringify({ CKey: doc.CKey }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        else{
            return new Response(JSON.stringify({ CKey: "none" }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    } catch (error) {
        console.log("error in getinfoAPI : " + error

        )
        return new Response(JSON.stringify("error"), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};