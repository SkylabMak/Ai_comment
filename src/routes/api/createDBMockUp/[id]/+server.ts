import type { RequestHandler } from "@sveltejs/kit";
import { db, testConnection } from '$lib/utils/mongo';
import 'dotenv/config';

// const account1{ Google_ID: string; name: string; email: string } ={

// }

const comData1: CompanyConnection = {
    Google_ID: "google-123",
    Email: "contact1@company.com",
    CName: "CompanyName01",
    CKey: "CompanyKey123",
    Emotions:[true,true,false,false,true,false]
};
const comData2: CompanyConnection = {
    Google_ID: "google-987",
    Email: "contact2@company.com",
    CName: "CompanyName02",
    CKey: "CompanyKey5196519",
    Emotions:[true,true,false,false,false,false]
};

const commentsDate1: ProductConnection[] = [
    {
        Product_ID: "1", CKey: "CompanyKey123", Name_product: "product1", Comment: [
            {
                "comment_ID": "82ba6c4d1",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-14T16:30:12.123Z",
                "Emotion": "Happy"
            },
            {
                "comment_ID": "c7f3d8e9a",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-10T07:15:42.567Z",
                "Emotion": "Sad"
            },
            {
                "comment_ID": "9bda1e3f5",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-09T09:42:11.234Z",
                "Emotion": "Angry"
            },
            {
                "comment_ID": "fba3e6c1d",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-11T13:47:29.987Z",
                "Emotion": "Neutral"
            },
            {
                "comment_ID": "8dc2e7f9b",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-12T10:30:22.456Z",
                "Emotion": "Excited"
            },
            {
                "comment_ID": "a7b6d8e1c",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-13T15:22:13.789Z",
                "Emotion": "Happy"
            },
            {
                "comment_ID": "6bca2d8f1",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-08T18:47:19.123Z",
                "Emotion": "Sad"
            },
            {
                "comment_ID": "4dca8b9f2",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-07T11:22:33.654Z",
                "Emotion": "Angry"
            },
            {
                "comment_ID": "9cf2e1a8b",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-06T07:35:45.321Z",
                "Emotion": "Neutral"
            },
            {
                "comment_ID": "5af3b2c9e",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-05T16:11:12.987Z",
                "Emotion": "Excited"
            }
        ],
    },
    {
        Product_ID: "2", CKey: "CompanyKey123", Name_product: "product2", Comment: [
            {
                "comment_ID": "3bac9d8e1",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-17T08:15:20.123Z",
                "Emotion": "Angry"
            },
            {
                "comment_ID": "7fc8d9a2b",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-18T09:22:14.567Z",
                "Emotion": "Happy"
            },
            {
                "comment_ID": "1df9b8c6a",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-19T13:35:46.234Z",
                "Emotion": "Sad"
            },
            {
                "comment_ID": "a8fc1d7b2",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-20T07:42:22.789Z",
                "Emotion": "Neutral"
            },
            {
                "comment_ID": "9caf2d7e8",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-21T10:50:34.321Z",
                "Emotion": "Excited"
            },
            {
                "comment_ID": "8b7d9a1f3",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-22T15:11:29.654Z",
                "Emotion": "Angry"
            },
            {
                "comment_ID": "4ea6f9b1d",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-23T08:22:11.456Z",
                "Emotion": "Happy"
            },
            {
                "comment_ID": "6bd9f8c2e",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-24T09:35:18.987Z",
                "Emotion": "Sad"
            },
            {
                "comment_ID": "7fe1b8a9c",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-25T12:45:56.123Z",
                "Emotion": "Neutral"
            },
            {
                "comment_ID": "9a8d1f7b4",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-26T17:22:37.789Z",
                "Emotion": "Excited"
            }
        ]
    },
    {
        Product_ID: "3", CKey: "CompanyKey123", Name_product: "product3", Comment: [
            {
                "comment_ID": "6c8b9a7f1",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-10T11:32:50.123Z",
                "Emotion": "Neutral"
            },
            {
                "comment_ID": "4d2c9e8b7",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-11T09:47:19.567Z",
                "Emotion": "Sad"
            },
            {
                "comment_ID": "9fa3e6b1d",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-12T14:11:22.934Z",
                "Emotion": "Happy"
            },
            {
                "comment_ID": "2b8f9a1e3",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-13T15:42:33.234Z",
                "Emotion": "Angry"
            },
            {
                "comment_ID": "5ed1f9a2c",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-14T16:35:12.456Z",
                "Emotion": "Excited"
            },
            {
                "comment_ID": "3b7c9f2e1",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-15T11:22:29.789Z",
                "Emotion": "Sad"
            },
            {
                "comment_ID": "8fa2d1c3b",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-16T12:47:11.123Z",
                "Emotion": "Happy"
            },
            {
                "comment_ID": "7cd8b9f2a",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-17T10:22:42.654Z",
                "Emotion": "Angry"
            },
            {
                "comment_ID": "4eb1f9a3d",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-18T09:11:19.321Z",
                "Emotion": "Neutral"
            },
            {
                "comment_ID": "9c8f2e7b1",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-19T18:35:11.987Z",
                "Emotion": "Excited"
            }
        ],
    },
    {
        Product_ID: "4", CKey: "CompanyKey123", Name_product: "product4", Comment: [
            {
                "comment_ID": "8d9a7f6b2",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-20T12:15:50.234Z",
                "Emotion": "Happy"
            },
            {
                "comment_ID": "9fb1c6e7a",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-21T11:42:29.567Z",
                "Emotion": "Sad"
            },
            {
                "comment_ID": "3e8f9d2c1",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-22T13:11:42.934Z",
                "Emotion": "Neutral"
            },
            {
                "comment_ID": "7cd9f8a3b",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-23T10:35:14.123Z",
                "Emotion": "Excited"
            },
            {
                "comment_ID": "6fb2e1a8d",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-24T15:22:47.789Z",
                "Emotion": "Angry"
            },
            {
                "comment_ID": "9ac8d7e2b",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-25T16:11:19.456Z",
                "Emotion": "Happy"
            },
            {
                "comment_ID": "4be1f7a9d",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-26T12:22:33.654Z",
                "Emotion": "Neutral"
            },
            {
                "comment_ID": "5c9d8a2e1",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-27T08:47:11.321Z",
                "Emotion": "Sad"
            },
            {
                "comment_ID": "1ba7f9e3d",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-28T14:22:45.987Z",
                "Emotion": "Excited"
            },
            {
                "comment_ID": "6fb2d9e1a",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-29T11:35:22.123Z",
                "Emotion": "Angry"
            }
        ]
    },
    {
        Product_ID: "5", CKey: "CompanyKey123", Name_product: "product5", Comment: [
            {
                "comment_ID": "3b9f8a7c1",
                "Text": "This is a sample comment text.",
                "Time": "2024-09-30T15:42:29.456Z",
                "Emotion": "Sad"
            },
            {
                "comment_ID": "7c8b9d2f1",
                "Text": "This is a sample comment text.",
                "Time": "2024-10-01T17:11:47.789Z",
                "Emotion": "Happy"
            },
            {
                "comment_ID": "9fa2e7b3c",
                "Text": "This is a sample comment text.",
                "Time": "2024-10-02T12:22:14.123Z",
                "Emotion": "Neutral"
            },
            {
                "comment_ID": "1dc9f8a2b",
                "Text": "This is a sample comment text.",
                "Time": "2024-10-03T09:35:11.654Z",
                "Emotion": "Excited"
            },
            {
                "comment_ID": "6f8b9d7a1",
                "Text": "This is a sample comment text.",
                "Time": "2024-10-04T13:22:37.321Z",
                "Emotion": "Angry"
            },
            {
                "comment_ID": "2b1e9f8a3",
                "Text": "This is a sample comment text.",
                "Time": "2024-10-05T10:47:29.987Z",
                "Emotion": "Sad"
            },
            {
                "comment_ID": "8d2c9b7f1",
                "Text": "This is a sample comment text.",
                "Time": "2024-10-06T14:22:45.234Z",
                "Emotion": "Neutral"
            },
            {
                "comment_ID": "4e9b8d7a2",
                "Text": "This is a sample comment text.",
                "Time": "2024-10-07T16:11:19.567Z",
                "Emotion": "Happy"
            },
            {
                "comment_ID": "9fb2c7d1e",
                "Text": "This is a sample comment text.",
                "Time": "2024-10-08T12:35:22.123Z",
                "Emotion": "Angry"
            },
            {
                "comment_ID": "6d7c9b8e1",
                "Text": "This is a sample comment text.",
                "Time": "2024-10-09T09:47:11.654Z",
                "Emotion": "Excited"
            }
        ]
    },
]
let i = 5
// const commentsDate2: ProductConnection[] = commentsDate1.map(
//     e => { e.Product_ID = (i--).toString();e.CKey="CompanyKey5196519"; return e; }
// )
export const GET: RequestHandler = async ({ params }) => {
    const { id } = params;
    // console.log(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clusterai.944ar.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.atlas_DB_NAMEMONGO_CLUSTER}}`)
    await testConnection()
    if (id) {
        console.log("run")
        const companyCollection = db.collection('company');
        // await companyCollection.createIndex({ CKey : 2 }, { unique: true });
        const result1 = await companyCollection.insertMany([
            comData1, comData2
        ])
        console.log(result1) 

        // Ensure that a compound index exists

        // const ProductCollection = db.collection('product')
        // await ProductCollection.createIndex({ Product_ID: 1, CKey: 1 }, { unique: true });
        // const combinedProductData = [...commentsDate1, ...commentsDate2];
        // const result2 = await ProductCollection.insertMany(commentsDate1);
        // console.log(result2)
    }

    return new Response(JSON.stringify({ "susscessfull": "done" }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
};

