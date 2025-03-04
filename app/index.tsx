import { useEffect, useState } from 'react'
import {
    StyleSheet
} from 'react-native'
import { Issue } from '../types/github'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import HomeHeader from '../components/HomeHeader'
import SearchBar from '../components/SearchBar'
import IssuesList from '../components/IssuesList'
import { useSearchIssues } from '../hooks/useSearchIssues'

export default function IssueListScreen() {
    const router = useRouter()
    const params = useLocalSearchParams()

    const initialSearchText = params.q?.toString() || ''
    const initialState = (params.state?.toString() as 'OPEN' | 'CLOSED') || 'OPEN'


    const [debouncedSearchText, setDebouncedSearchText] = useState(initialSearchText)
    const [issueState, setIssueState] = useState<'OPEN' | 'CLOSED'>(initialState)

    useEffect(() => {
        const timeoutId = setTimeout(() => {

            const newParams: Record<string, (string | undefined)> = {}

            if (debouncedSearchText) {
                newParams.q = debouncedSearchText
            } else {
                newParams.q = undefined
            }

            newParams.state = issueState

            router.setParams(newParams)
        }, 0)

        return () => clearTimeout(timeoutId)
    }, [debouncedSearchText, issueState, router])

    const {
        issues,
        loading,
        error,
        refreshing,
        isLoadingMore,
        handleRefresh,
        handleLoadMore,
    } = useSearchIssues(debouncedSearchText, issueState)

    const handleIssuePress = (issue: Issue) => {
        router.push(`/${issue.number}`)
    }

    return (
        <SafeAreaView style={styles.container}>
            <HomeHeader
                currentState={issueState}
                onStateChange={setIssueState}
            />

            <SearchBar
                initialValue={initialSearchText}
                onSearch={setDebouncedSearchText}
                debounceTime={1000}
            />

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