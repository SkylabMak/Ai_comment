import { v4 as uuidv4 } from 'uuid';

function generateCKey(googleAccountId: string): string {
  // สร้าง UUID เวอร์ชัน 4
  const uuid = uuidv4();

  // ผสม googleAccountId กับ UUID เพื่อสร้าง CKey
  const CKey = `${googleAccountId}-${uuid}`;

  console.log(`CKey created for user ${googleAccountId}: ${cKey}`);
  return CKey;
}

// ตัวอย่างการเรียกใช้ function
// const cKey = generateCKey('exampleGoogleAccountId');
// console.log('Generated CKey:', cKey);
