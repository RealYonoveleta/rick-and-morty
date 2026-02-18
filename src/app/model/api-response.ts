interface Info {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface ApiResponse<T> {
    info: Info;
    results: T[];
}

export const EMPTY_API_RESPONSE: ApiResponse<any> = {
    info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null
    },
    results: []
};