import React from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
} from 'react-native'

import ErrorView from '../components/ErrorView'
import LoadingView from '../components/LoadingView'

import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import IssueHeader from '../components/IssueHeader'
import IssueMetadata from '../components/IssueMetadata'
import CommentList from '../components/CommentList'
import IssueBody from '../components/IssueBody'
import LabelsList from '../components/LabelsList'
import IssueTitleAndState from '../components/IssueTitleState'
import { useGetIssueDetail } from '../hooks/useGetIssueDetail'

export default function IssueDetailScreen() {
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const issueNumber = Number(id)

    const { issue, loading, error, refreshing, handleRefresh } = useGetIssueDetail(issueNumber)

    const handleGoBack = () => {
        router.canGoBack() ? (
            router.back()
        ) : (
            router.push('/')
        )
    }

    if (loading) {
        return (
            <LoadingView
                message='Loading issue details...'
            />
        )
    }

    if (error) {
        return (
            <ErrorView
                message={error.message}
                onButtonPress={handleGoBack}
            />
        )
    }

    if (!issue) {
        return (
            <ErrorView
                title='Issue not found'
                message="The issue you're looking for doesn't exist."
                onButtonPress={handleGoBack}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <IssueHeader
                title={`Issue #${issue.number}`}
                onBackPress={handleGoBack}
            />

            <ScrollView
                style={styles.content}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={['#0366d6']}
                        tintColor='#0366d6'
                    />
                }
            >
                <IssueTitleAndState title={issue.title} state={issue.state} />

                <View style={styles.issueMetadata}>
                    <IssueMetadata
                        author={issue.author}
                        createdAt={issue.createdAt}
                    />
                </View>

                <LabelsList labels={issue.labels} />

                <IssueBody bodyText={issue.bodyText} />

                <CommentList comments={issue.comments} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f8fa',
    },
    content: {
        flex: 1,
    },
    issueMetadata: {
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e1e4e8',
    },
})