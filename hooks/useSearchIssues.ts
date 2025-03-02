import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { SearchQueryResult } from '../types/github'
import { SEARCH_ISSUES } from '../graphql/queries/searchIssues'
import { useRefresh } from './useRefresh'
import { UseSearchIssuesResult } from '../types/hooks'


export function useSearchIssues(
    debouncedSearchText: string,
    issueState: 'OPEN' | 'CLOSED'
): UseSearchIssuesResult {
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    const buildQueryString = () => {
        let query = 'repo:facebook/react-native is:issue '

        query += `is:${issueState.toLowerCase()}`

        if (debouncedSearchText) {
            query += `${debouncedSearchText} in:title,body `
        }

        return query.trim()
    }

    const { loading, error, data, refetch, fetchMore } = useQuery<SearchQueryResult>(SEARCH_ISSUES, {
        variables: {
            query: buildQueryString(),
            first: 10,
            after: null,
        },
        notifyOnNetworkStatusChange: true,
    })

    const { refreshing, handleRefresh: onRefresh } = useRefresh(refetch)

    const handleRefresh = () => {
        onRefresh()
    }

    const handleLoadMore = () => {
        const pageInfo = data?.search?.pageInfo

        if (pageInfo?.hasNextPage && !isLoadingMore) {
            setIsLoadingMore(true)

            fetchMore({
                variables: {
                    after: pageInfo.endCursor,
                    query: buildQueryString(),
                    first: 10,
                },
                updateQuery: (
                    prevResult: SearchQueryResult,
                    { fetchMoreResult }: { fetchMoreResult: SearchQueryResult | undefined }
                ) => {
                    if (!fetchMoreResult)
                        return prevResult

                    return {
                        search: {
                            ...fetchMoreResult.search,
                            edges: [
                                ...prevResult.search.edges,
                                ...fetchMoreResult.search.edges
                            ]
                        }
                    }
                }
            }).finally(() => {
                setIsLoadingMore(false)
            })
        }
    }

    const issues = data?.search?.edges?.map((edge) => edge.node) || []
    const totalCount = data?.search?.issueCount || 0
    const hasNextPage = data?.search?.pageInfo?.hasNextPage || false

    return {
        issues,
        loading,
        error,
        refreshing,
        isLoadingMore,
        handleRefresh,
        handleLoadMore,
        totalCount,
        hasNextPage
    }
}