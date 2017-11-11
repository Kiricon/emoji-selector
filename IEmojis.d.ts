export interface IEmoji {
    keywords: string[];
    char: string;
    fitzpatrick_scale: boolean;
    category: string;
}
export interface IEmojis {
    [name: string]: IEmoji;
}
export interface IEmojisByCategory {
    [category: string]: IEmojis;
}
