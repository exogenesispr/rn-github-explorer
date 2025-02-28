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

import { useLocalSearchParams, useRouter } from 'expo-router'
import moment from 'moment'
import { GET_ISSUE_DETAIL } from '../graphql/queries/getIssueDetail'
import { IssueDetailResult } from '../types/github'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRefresh } from '../hooks/useRefresh'

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
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0366d6" />
                <Text style={styles.loadingText}>Loading issue details...</Text>
            </View>
        )
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error loading issue</Text>
                    <Text style={styles.errorDetail}>{error.message}</Text>
                    <TouchableOpacity
                        style={styles.backToListButton}
                        onPress={handleGoBack}
                    >
                        <Text style={styles.backToListText}>Back to Issues List</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    const issue = data?.repository?.issue

    if (!issue) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.notFoundContainer}>
                    <Text style={styles.notFoundTitle}>Issue not found</Text>
                    <Text style={styles.notFoundDescription}>
                        The issue you're looking for doesn't exist.
                    </Text>
                    <TouchableOpacity
                        style={styles.backToListButton}
                        onPress={handleGoBack}
                    >
                        <Text style={styles.backToListText}>Back to Issues List</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleGoBack}
                >
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Issue #{issue.number}</Text>
            </View>

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
                    <View style={styles.authorInfo}>
                        {issue.author && (
                            <>
                                <Image
                                    source={{ uri: issue.author.avatarUrl }}
                                    style={styles.avatar}
                                />
                                <Text style={styles.authorName}>{issue.author.login}</Text>
                            </>
                        )}
                        <Text style={styles.dateText}>
                            opened on {moment(issue.createdAt).format('MMM D, YYYY')}
                        </Text>
                    </View>
                </View>

                {(!!issue.labels.nodes) && (
                    <View style={styles.labelsContainer}>
                        {issue.labels.nodes.map((label) => (
                            <View
                                key={label.id}
                                style={[
                                    styles.labelBadge,
                                    { backgroundColor: `#${label.color}` }
                                ]}
                            >
                                <Text style={styles.labelText}>{label.name}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={styles.issueBody}>
                    <Text style={styles.bodyText}>{issue.bodyText}</Text>
                </View>

                <View style={styles.commentsHeader}>
                    <Text style={styles.commentsTitle}>
                        Comments ({issue.comments.totalCount})
                    </Text>
                </View>

                {(!!issue.comments.nodes) ? (
                    issue.comments.nodes.map((comment) => (
                        <View key={comment.id} style={styles.commentContainer}>
                            <View style={styles.commentHeader}>
                                <View style={styles.authorInfo}>
                                    {comment.author && (
                                        <>
                                            <Image
                                                source={{ uri: comment.author.avatarUrl }}
                                                style={styles.avatar}
                                            />
                                            <Text style={styles.authorName}>{comment.author.login}</Text>
                                        </>
                                    )}
                                    <Text style={styles.dateText}>
                                        commented on {moment(comment.createdAt).format('MMM D, YYYY')}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.commentBody}>{comment.body}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noCommentsText}>No comments yet</Text>
                )}
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