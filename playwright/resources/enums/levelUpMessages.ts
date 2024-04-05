export enum levelUpMessage{
    clickIt = 'Great job! You levelled up',
    fileUpload = 'File selected, level up!',
    typeIt = 'Dolar sit amet!',
}

export function LeveledUpParagraphText(level: number, build: string): string {
    return `A level ${level} ${build}`;
}