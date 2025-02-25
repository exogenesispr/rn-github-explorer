import { useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Pressable,
    Switch,
    FlatList,
    ActivityIndicator
} from 'react-native'

import { useQuery } from '@apollo/client'
import { GET_ISSUES } from '../graphql/queries/getIssues'
import IssueCard from '../components/IssueCard'
import { Issue } from '../types/github'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function IssueListScreen() {
    const [searchText, setSearchText] = useState('')
    const [issueState, setIssueState] = useState<'OPEN' | 'CLOSED'>('OPEN')

    const { loading, error, data } = useQuery(GET_ISSUES, {
        variables: {
            state: [issueState],
            query: searchText || null,
            first: 5,
            after: null
        },

    })

    const handleIssuePress = (issue: Issue) => {
        console.log(`Moving to Issue ${issue.number} detail view`)
    }

    if (loading)
        return <ActivityIndicator style={styles.loader} />

    if (error)
        return <Text style={styles.error}>Error: {error.message}</Text>

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>React Native Issues</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Search issues...'
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <FlatList
                data={data?.repository?.issues?.nodes || []}
                keyExtractor={(item: Issue) => item.id}
                renderItem={({ item }) => (
                    <IssueCard item={item} onPress={handleIssuePress} />
                )}
            />

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
        alignItems: 'center',
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
});