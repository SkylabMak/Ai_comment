import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/utils/mongo";

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();
    console.log(body.someKey + " : from post method in backend api")
    const companyCollection = db.collection('company');
    const results = await companyCollection.aggregate([
        {
            $lookup: {
                from: "product",           
                localField: "CKey",        
                foreignField: "CKey",      
                as: "products"
            }
        },
        {
            $project: {
                Emotions: 1,
                products: 1                
            }
        } 
    ]).toArray(); 

    return new Response(JSON.stringify(results),{
        status: 200,
        headers: {
        'Content-Type': 'application/json'
        }

    })

}