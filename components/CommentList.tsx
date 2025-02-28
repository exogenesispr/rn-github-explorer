import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import CommentItem from './CommentItem'
import { CommentListProps } from '../types/components'

export default function CommentList({
    comments
}: CommentListProps) {
    return (
        <>
            <View style={styles.commentsHeader}>
                <Text style={styles.commentsTitle}>
                    Comments ({comments.totalCount})
                </Text>
            </View>

            {(comments.nodes && comments.nodes.length > 0) ? (
                comments.nodes.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))
            ) : (
                <Text style={styles.noCommentsText}>No comments yet.</Text>
            )
            }
        </>
    )
}

const styles = StyleSheet.create({
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
    noCommentsText: {
        padding: 16,
        textAlign: 'center',
        color: '#586069',
        backgroundColor: 'white',
    },
})