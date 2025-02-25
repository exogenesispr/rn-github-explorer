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

export interface Repository {
    nameWithOwner: string,
}

export interface Issue {
    id: string,
    number: number,
    title: string,
    body: string,
    bodyText?: string,
    state: 'OPEN' | 'CLOSED',
    createdAt: string,
    updatedAt?: string,
    author?: Author,
    repository?: Repository,
    comments: Comments,
    labels: {
        nodes: Label[]
    }
}

export interface SearchEdge {
    node: Issue,
}

export interface SearchConnection {
    issueCount: number,
    pageInfo: PageInfo,
    edges: SearchEdge[],
}

export interface SearchQueryResult {
    search: SearchConnection,
}