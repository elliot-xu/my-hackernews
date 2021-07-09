export interface News {
    by: string;
    descendants: number;
    id: number;
    kids: number[] | undefined,
    score: number,
    time: number,
    title: string,
    text: string | undefined;
    type: string,
    url: string | undefined,
}