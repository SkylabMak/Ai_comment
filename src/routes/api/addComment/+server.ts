import { json, type RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/utils/mongo";

export const POST: RequestHandler = async ({ request }) => {
    try {
        console.log(request);
        const body = await request.json();
        const result = await db.collection("product").updateOne(
            {
                $and: [{ Product_ID: body.Product_ID }]
            },
            {
                $push: { comment: body.comment }
            }
        )
        if (result.matchedCount === 0) {
            await db.collection("product").insertOne(
                {
                    Product_ID: body.Product_ID,
                    Name_product: body.Name_product,
                    comment: [body.comment]
                }
            )
        }
        return json({ message: "OK" }, { status: 200 });
    } catch (error) {
        console.error("error", error);
        return json({ message: "Internal Server Error" }, { status: 500 });
    }
}