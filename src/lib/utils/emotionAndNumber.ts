// Reverse mapping using array
const emotions = ["anger", "fear", "joy", "sadness", "love", "surprise", "Mek"];

// Convert emotion string to number
export function emotionToNumber(emotion: string): number {
    const emotionIndex = emotions.indexOf(emotion.toLowerCase());
    return emotionIndex !== -1 ? emotionIndex : 6; // 6 is for "Mek"
}

// Convert number to emotion string
export function numberToEmotion(num: number): string {
    return emotions[num] || "Mek";  // Default to "Mek" if out of bounds
}
