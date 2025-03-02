import { useState } from 'react'
import {
    StyleSheet
} from 'react-native'

import { useQuery } from '@apollo/client'
import { SEARCH_ISSUES } from '../graphql/queries/searchIssues'
import { Issue, SearchQueryResult } from '../types/github'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useRefresh } from '../hooks/useRefresh'
import HomeHeader from '../components/HomeHeader'
import SearchBar from '../components/SearchBar'
import IssuesList from '../components/IssuesList'

export default function IssueListScreen() {
    const router = useRouter()
    const [debouncedSearchText, setDebouncedSearchText] = useState('')
    const [issueState, setIssueState] = useState<'OPEN' | 'CLOSED'>('OPEN')
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    const buildQueryString = () => {
        let query = 'repo:facebook/react-native is:issue ';

        query += `is:${issueState.toLowerCase()} `;

        if (debouncedSearchText) {
            query += `${debouncedSearchText} in:title,body `;
        }

        return query.trim()
    }

    const { loading, error, data, refetch, fetchMore } = useQuery<SearchQueryResult>(SEARCH_ISSUES, {
        variables: {
            query: buildQueryString(),
            first: 10,
            after: null
        },
        notifyOnNetworkStatusChange: true,
    })

    const { refreshing, handleRefresh } = useRefresh(refetch)

    const handleLoadMore = () => {
        const pageInfo = data?.search?.pageInfo

        if (pageInfo?.hasNextPage && !isLoadingMore) {
            setIsLoadingMore(true)

            fetchMore({
                variables: {
                    after: pageInfo?.endCursor,
                    query: buildQueryString(),
                    first: 10,
                },

                updateQuery: (
                    prevResult: SearchQueryResult,
                    options: { fetchMoreResult: SearchQueryResult | undefined }) => {
                    if (!options.fetchMoreResult)
                        return prevResult

                    return {
                        search: {
                            ...options.fetchMoreResult.search,
                            edges: [
                                ...prevResult.search.edges,
                                ...options.fetchMoreResult.search.edges
                            ]
                        }
                    }
                }
            }).finally(() => {
                setIsLoadingMore(false)
            })
        }
    }

    const handleIssueStateChange = (newState: 'OPEN' | 'CLOSED') => {
        setIssueState(newState)
    }

    const handleIssuePress = (issue: Issue) => {
        router.push(`/${issue.number}`)
    }

    const issues = data?.search?.edges?.map((edge) => edge.node) || []

    return (
        <SafeAreaView style={styles.container}>
            <HomeHeader currentState={issueState} onStateChange={setIssueState} />

            <SearchBar onSearch={setDebouncedSearchText} debounceTime={1000} />

            <IssuesList
                data={issues}
                loading={loading}
                error={error}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                onLoadMore={handleLoadMore}
                onIssuePress={handleIssuePress}
                isLoadingMore={isLoadingMore}
            />
        </SafeAreaView >
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cccccc',
    }
});