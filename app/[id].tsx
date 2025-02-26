import React from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    ScrollView,
    Image,
} from 'react-native'

import { useQuery } from '@apollo/client'

import { useLocalSearchParams, useRouter } from 'expo-router'
import moment from 'moment'
import { GET_ISSUE_DETAIL } from '../graphql/queries/getIssueDetail'
import { IssueDetailResult } from '../types/github'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function IssueDetailScreen() {
    const params = useLocalSearchParams()
    const router = useRouter()
    const issueNumber = Number(params.id)
    console.log(params.id)

    const { loading, error, data } = useQuery<IssueDetailResult>(GET_ISSUE_DETAIL, {
        variables: { number: issueNumber },
        skip: !issueNumber
    })

    const handleGoBack = () => {
        router.back()
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
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error loading issue</Text>
                <Text style={styles.errorDetail}>{error.message}</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleGoBack}
                >
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const issue = data?.repository?.issue

    if (!issue) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Issue not found</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => console.log('pressed button to go back to issue list')}
                >
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    errorDetail: {
        color: '#cb2431',
        marginBottom: 16,
        textAlign: 'center',
    },
})