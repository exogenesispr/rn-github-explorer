import { ApolloError } from '@apollo/client'
import { Issue } from './github'

export interface UseSearchIssuesResult {
    issues: Issue[],
    loading: boolean,
    error: ApolloError | undefined,
    refreshing: boolean,
    isLoadingMore: boolean,
    handleRefresh: () => void,
    handleLoadMore: () => void,
    totalCount: number,
    hasNextPage: boolean
}