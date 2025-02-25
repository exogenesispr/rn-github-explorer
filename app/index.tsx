import { useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'

import { useQuery } from '@apollo/client'
import { SEARCH_ISSUES } from '../graphql/queries/searchIssues'
import { GET_ISSUES } from '../graphql/queries/getIssues'
import IssueCard from '../components/IssueCard'
import { Issue, SearchQueryResult } from '../types/github'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function IssueListScreen() {
    const [searchText, setSearchText] = useState('')
    const [issueState, setIssueState] = useState<'OPEN' | 'CLOSED'>('OPEN')

    const buildQueryString = () => {
        let query = 'repo:facebook/react-native is:issue ';

        query += `is:${issueState.toLowerCase()} `;

        if (searchText) {
            query += `${searchText} in:title,body `;
        }

        return query.trim()
    }



    const { loading, error, data } = useQuery<SearchQueryResult>(SEARCH_ISSUES, {
        variables: {
            query: buildQueryString(),
            first: 10,
            after: null
        },
    })

    const handleIssueStateChange = (newState: 'OPEN' | 'CLOSED') => {
        setIssueState(newState)
    }

    const handleSearch = () => {
        console.log('Searching for:', searchText)
    }

    const handleIssuePress = (issue: Issue) => {
        console.log(`Moving to Issue ${issue.number} detail view`)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>React Native Issues</Text>

                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            issueState === 'OPEN' && styles.activeFilterButton
                        ]}
                        onPress={() => handleIssueStateChange('OPEN')}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                issueState === 'OPEN' && styles.activeFilterText
                            ]}
                        >
                            Open
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            issueState === 'CLOSED' && styles.activeFilterButton
                        ]}
                        onPress={() => handleIssueStateChange('CLOSED')}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                issueState === 'CLOSED' && styles.activeFilterText
                            ]}
                        >
                            Closed
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Search issues...'
                    value={searchText}
                    onChangeText={setSearchText}
                />

                {(!!searchText) && (
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={handleSearch}
                    >
                        <Text style={styles.searchButtonText}>Search</Text>
                    </TouchableOpacity>
                )}
            </View>


            {loading ? (
                <ActivityIndicator style={styles.loader} />
            ) : error ? (
                <Text style={styles.error}>Error: {error.message}</Text>
            ) : (
                <FlatList
                    data={data?.search?.edges?.map(edge => edge.node) || []}
                    keyExtractor={(item: Issue) => item.id}
                    renderItem={({ item }) => (
                        <IssueCard item={item} onPress={handleIssuePress} />
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                No issues found. Try again adjusting your search.
                            </Text>
                        </View>
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
    header: {
        padding: 14,
        backgroundColor: '#0D1117',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: 'white',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#e1e4e8',
        borderRadius: 4,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
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
    filterContainer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e4e8',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    activeFilterButton: {
        backgroundColor: '#f1f8ff',
        borderWidth: 1,
        borderColor: '#0366d6',
    },
    filterButtonText: {
        fontSize: 14,
        color: '#586069',
    },
    activeFilterText: {
        color: '#0366d6',
        fontWeight: 'bold',
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
});