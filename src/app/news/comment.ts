export interface Comment {
    by: string,
    id: number,
    kids?: number[],
    parent: number,
    text: string,
    type: string,
    time: number,
    deleted?: boolean
}