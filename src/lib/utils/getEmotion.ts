import { number } from 'zod';

export function getEmotion(comment: string): string {
	return 'fear';
	// switch (Math.floor(Math.random() * 6)) {
	//     case 0:
	//         return "sadness";
	//     case 1:
	//         return "anger";
	//     case 2:
	//         return "love";
	//     case 3:
	//         return "surprise";
	//     case 4:
	//         return "fear";
	//     case 5:
	//         return "joy";
	//     default:
	//         return "Mek";
	// }
}
