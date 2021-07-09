export interface Comment {
    by: string;
    id: number;
    kids: number[] | undefined,
    parent: number,
    text: string,
    type: string,
    time: number
}