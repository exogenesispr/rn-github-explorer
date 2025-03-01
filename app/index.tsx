import { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl,
} from 'react-native'

import { useQuery } from '@apollo/client'
import { SEARCH_ISSUES } from '../graphql/queries/searchIssues'
import IssueCard from '../components/IssueCard'
import { Issue, SearchQueryResult } from '../types/github'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useRefresh } from '../hooks/useRefresh'
import HomeHeader from '../components/HomeHeader'
import SearchBar from '../components/SearchBar'

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

                updateQuery: (prevResult, { fetchMoreResult }) => {
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

    const handleIssueStateChange = (newState: 'OPEN' | 'CLOSED') => {
        setIssueState(newState)
    }

    const handleIssuePress = (issue: Issue) => {
        router.push(`/${issue.number}`)
    }

    return (
        <SafeAreaView style={styles.container}>
            <HomeHeader currentState={issueState} onStateChange={setIssueState} />

            <SearchBar onSearch={setDebouncedSearchText} debounceTime={1000} />

            {(!data?.search?.edges) && loading ? (
                <ActivityIndicator style={styles.loader} />
            ) : error ? (
                <Text style={styles.error}>Error: {error.message}</Text>
            ) : (
                <FlatList
                    data={data?.search?.edges?.map((edge) => edge.node) || []}
                    keyExtractor={(item: Issue) => item.id}
                    renderItem={({ item }) => (
                        <IssueCard item={item} onPress={handleIssuePress} />
                    )}

                    maintainVisibleContentPosition={{
                        minIndexForVisible: 0
                    }}

                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={['#0366d6']}
                            tintColor='#0366d6'
                        />
                    }

                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        loading || isLoadingMore ? (
                            <View style={styles.loadingFooter}>
                                <ActivityIndicator size='small' color='#0366d6' />
                                <Text style={styles.loadingMoreText}>
                                    {isLoadingMore ? 'Loading more issues...' : 'Loading...'}
                                </Text>
                            </View>
                        ) : null
                    }

                    ListEmptyComponent={
                        !loading ? (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>
                                    No issues found. Try again adjusting your search.
                                </Text>
                            </View>
                        ) : null
                    }

                />

            )}

        </SafeAreaView >
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cccccc',
    },
    searchButton: {
        marginLeft: 8,
        backgroundColor: '#0366d6',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 4,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    error: {
        color: "red",
        textAlign: "center",
        marginTop: 20
    },
    emptyContainer: {
        padding: 24,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#586069',
        textAlign: 'center',
    },
    loadingFooter: {
        padding: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loadingMoreText: {
        marginLeft: 8,
        color: '#586069',
    }
});