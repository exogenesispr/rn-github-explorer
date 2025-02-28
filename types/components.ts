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
    bodyText: string,
    maxLines?: number,
}

export interface LabelsListProps {
    labels: {
        nodes: Label[]
    }
}