export enum levelUpMessage{
    clickIt = 'Great job! You levelled up',
    fileUpload = 'File selected, level up!',
    typeIt = 'Dolar sit amet!',
    slideIt = 'Slid to the next level!',
}

export function LeveledUpParagraphText(level: number, build: string): string {
    return `A level ${level} ${build}`;
}