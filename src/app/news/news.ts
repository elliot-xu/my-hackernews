export interface News {
    by: string,
    descendants: number,
    id: number,
    kids?: number[],
    score: number,
    time: number,
    title: string,
    text?: string;
    type: string,
    url?: string,
}