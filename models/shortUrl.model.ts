export enum ShortURLStatus {
    Expired = -3,
    Banned = -2,
    Removed = -1,
    Draft = 0,
    Published = 2
}

export interface ShortURl {
    _id?: string;
    name: string;
    originalURL: string;
    status: ShortURLStatus;
    shortURLID?: string;
    creatorAddress?: string;
}