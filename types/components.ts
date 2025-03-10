import { Issue, Label } from '../types/github'

export interface ErrorViewProps {
    title?: string,
    message: string,
    buttonText?: string,
    onButtonPress: () => void
}

export interface IssueCardProps {
    item: Issue,
    onPress?: (issue: Issue) => void,
}

export interface LoadingViewProps {
    message?: string,
    color?: string,
    size?: 'small' | 'large'
}

export interface IssueHeaderProps {
    title: string,
    onBackPress: () => void
}

export interface IssueMetadataProps {
    author?: {
        login: string,
        avatarUrl: string,
    },
    createdAt: string,
    datePrefix?: string,
}

export interface CommentItemProps {
    comment: {
        id: string,
        author?: {
            login: string,
            avatarUrl: string,
        }
        body: string,
        createdAt: string
    }
}

export interface CommentListProps {
    comments: {
        nodes?: Array<{
            id: string,
            author?: {
                login: string,
                avatarUrl: string,
            },
            body: string,
            createdAt: string,
        }>,
        totalCount: number,
    }
}

export interface IssueBodyProps {
    bodyText?: string,
    maxLines?: number,
}

export interface LabelsListProps {
    labels: {
        nodes: Label[]
    }
}

export interface IssueTitleStateProps {
    title: string,
    state: 'OPEN' | 'CLOSED',
}

export interface HomeHeaderProps {
    currentState: 'OPEN' | 'CLOSED'
    onStateChange: (state: 'OPEN' | 'CLOSED') => void
}

export interface SearchBarProps {
    onSearch: (text: string) => void
    debounceTime?: number,
}

export interface IssuesListProps {
    data: Issue[] | undefined,
    loading: boolean,
    error: any,
    refreshing: boolean,
    onRefresh: () => void,
    onLoadMore: () => void,
    onIssuePress: (issue: Issue) => void,
    isLoadingMore: boolean
}