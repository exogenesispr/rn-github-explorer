import React from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    ScrollView,
    Image,
    RefreshControl,
} from 'react-native'

import { useQuery } from '@apollo/client'

import ErrorView from '../components/ErrorView'
import LoadingView from '../components/LoadingView'

import { useLocalSearchParams, useRouter } from 'expo-router'
import moment from 'moment'
import { GET_ISSUE_DETAIL } from '../graphql/queries/getIssueDetail'
import { IssueDetailResult } from '../types/github'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRefresh } from '../hooks/useRefresh'
import IssueHeader from '../components/IssueHeader'
import IssueMetadata from '../components/IssueMetadata'
import CommentList from '../components/CommentList'
import IssueBody from '../components/IssueBody'
import LabelsList from '../components/LabelsList'
import IssueListScreen from '.'

export default function IssueDetailScreen() {
    const params = useLocalSearchParams()
    const router = useRouter()
    const issueNumber = Number(params.id)
    console.log(params.id)

    const { loading, error, data, refetch } = useQuery<IssueDetailResult>(GET_ISSUE_DETAIL, {
        variables: { number: issueNumber },
        skip: !issueNumber
    })

    const { refreshing, handleRefresh } = useRefresh(refetch)

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

    const issue = data?.repository?.issue

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
                <View style={styles.issueHeader}>
                    <Text style={styles.issueTitle}>{issue.title}</Text>
                    <View style={[
                        styles.stateTag,
                        { backgroundColor: issue.state === 'OPEN' ? '#2cbe4e' : '#cb2431' }
                    ]}>
                        <Text style={styles.stateText}>{issue.state}</Text>
                    </View>
                </View>

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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#24292e',
    },
    backButton: {
        backgroundColor: '#444d56',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 12,
    },
    content: {
        flex: 1,
    },
    issueHeader: {
        padding: 16,
        backgroundColor: 'white',
    },
    issueTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    stateTag: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: 4,
    },
    stateText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    issueMetadata: {
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e1e4e8',
    },
    authorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
    },
    authorName: {
        fontWeight: 'bold',
        marginRight: 8,
    },
    dateText: {
        color: '#586069',
    },
    labelsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e1e4e8',
    },
    labelBadge: {
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 8,
        marginBottom: 4,
    },
    labelText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    issueBody: {
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e1e4e8',
    },
    bodyText: {
        fontSize: 16,
        lineHeight: 24,
    },
    commentsHeader: {
        padding: 16,
        backgroundColor: '#f6f8fa',
        borderTopWidth: 1,
        borderTopColor: '#e1e4e8',
    },
    commentsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    commentContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e1e4e8',
    },
    commentHeader: {
        marginBottom: 8,
    },
    commentBody: {
        fontSize: 16,
        lineHeight: 24,
    },
    noCommentsText: {
        padding: 16,
        textAlign: 'center',
        color: '#586069',
        backgroundColor: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        color: '#586069',
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f6f8fa',
    },
    errorText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#24292e',
        marginBottom: 12,
    },
    errorDetail: {
        fontSize: 16,
        color: '#586069',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
        maxWidth: '90%',
    },
    notFoundContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f6f8fa',
    },
    notFoundTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#24292e',
        marginBottom: 12,
    },
    notFoundDescription: {
        fontSize: 16,
        color: '#586069',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },
    backToListButton: {
        backgroundColor: '#0366d6',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 6,
    },
    backToListText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
})