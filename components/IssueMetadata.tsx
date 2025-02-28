import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native'
import { IssueMetadataProps } from '../types/components'
import moment from 'moment'

export default function IssueMetadata({
    author,
    createdAt,
    datePrefix = 'opened on'
}: IssueMetadataProps) {
    return (
        <View style={styles.authorInfo}>
            {author && (
                <>
                    <Image
                        source={{ uri: author.avatarUrl }}
                        style={styles.avatar}
                    />
                    <Text style={styles.authorName}>{author.login}</Text>
                </>
            )}
            <Text style={styles.dateText}>
                {datePrefix} {moment(createdAt).format('MMM D, YYYY')}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
})