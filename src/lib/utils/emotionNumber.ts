import { number } from "zod";

export function toNumber(emotion: String): number {
    switch (emotion) {
        case "anger":
            return 0;
        case "fear":
            return 1;
        case "joy":
            return 2;
        case "sadness":
            return 3;
        case "love":
            return 4;
        case "surprise":
            return 5;
        default:
            return 6;
    }
}

export function toEmotion(num: number): String {
    switch (num) {
        case 0:
            return "anger";
        case 1:
            return "fear";
        case 2:
            return "joy";
        case 3:
            return "sadness";
        case 4:
            return "love";
        case 5:
            return "surprise";
        default:
            return "Mek";
    }
}