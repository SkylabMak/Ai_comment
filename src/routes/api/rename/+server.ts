import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/utils/mongo";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    console.log(body);
    
    const result = await db.collection("product").updateOne(
      {
        $and: [
          { CKey: body.CKey },
          { Product_ID: body.Product_ID }
        ]
      },
      {
        $set: { Name_product: body.Name_product }
      }
    );

    if (result.matchedCount === 0) {
      return json({ message: "NO" }, { status: 404 });
    }

    return json({ message: "YES" }, { status: 200 });

  } catch (error) {
    console.error("error", error);
    return json({ message: "Internal Server Error" }, { status: 500 });
  }
};
