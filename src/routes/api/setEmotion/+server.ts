import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/utils/mongo';
import 'dotenv/config';
import { json } from '@sveltejs/kit';
import { z } from 'zod';

// สร้าง Schema สำหรับตรวจสอบข้อมูล
const DataSchema = z.object({
	CKey: z.string().min(1, 'cKey is required'), // ตรวจสอบว่า cKey เป็น string และไม่ว่างเปล่า
	Emotions: z.array(z.boolean()).nonempty('Emotions are required') // ตรวจสอบว่า Emotions เป็น array ที่ประกอบด้วย boolean และไม่ว่างเปล่า
});

// POST handler สำหรับอัปเดตข้อมูลใน array
export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// ตรวจสอบข้อมูลที่ได้รับตาม Schema
		const parsedData = DataSchema.parse(data);

		// อัปเดต array ของ Boolean ในเอกสารที่มี cKey ตรงกัน
		const result = await db.collection('company').updateOne(
			{ CKey: parsedData.CKey }, // เงื่อนไขการค้นหาเอกสาร
			{ $set: { Emotions: parsedData.Emotions } } // อัปเดต array ของ Emotions
		);

		// ตรวจสอบว่ามีเอกสารที่ถูกอัปเดตหรือไม่
		if (result.matchedCount === 0) {
			return json({ Success: false }, { status: 404 });
		}

		return json({ Success: true }, { status: 200 });
	} catch (error) {
		console.error('Error updating data: ', error);

		if (error instanceof z.ZodError) {
			// ส่งข้อมูล error กลับไปถ้าการตรวจสอบข้อมูลล้มเหลว
			return json({ errors: error.errors }, { status: 400 });
		}

		// ส่งข้อมูล error กลับไปถ้ามีข้อผิดพลาดอื่นๆ
		return json({ error: 'Failed to update data' }, { status: 500 });
	}
};
