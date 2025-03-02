import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import IssueMetadata from './IssueMetadata'
import { CommentItemProps } from '../types/components'

export default function CommentItem({
    comment
}: CommentItemProps) {
    return (
        <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
                <IssueMetadata
                    author={comment.author}
                    createdAt={comment.createdAt}
                    datePrefix="commented on"
                />
            </View>
            <Text style={styles.commentBody}>{comment.body}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
})