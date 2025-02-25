export interface Author {
    login: string;
    avatarUrl: string;
}

export interface Label {
    id: string,
    name: string,
    color: string,
}

export interface Comments {
    totalCount: number,
}

export interface PageInfo {
    hasNextPage: boolean,
    endCursor: string,
}

export interface Issue {
    id: string,
    number: number,
    title: string,
    body: string,
    state: 'OPEN' | 'CLOSED',
    createdAt: string,
    author?: Author,
    comments: Comments,
    labels: {
        nodes: Label[]
    }
}