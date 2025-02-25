import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native'
import moment from 'moment'
import { Issue } from '../types/github'

interface IssueCardProps {
    item: Issue,
    onPress?: (issue: Issue) => void,
}

export default function IssueCard({ item, onPress }: IssueCardProps) {
    return (
        <TouchableOpacity
            style={styles.issueCard}
            onPress={() => onPress && onPress(item)}
        >
            <View style={styles.issueHeader}>
                <Text style={styles.issueTitle}>{item.title}</Text>
                <Text style={styles.issueNumber}>#{item.number}</Text>
            </View>

            <View style={styles.issueMetadata}>
                <View style={styles.stateContainer}>
                    <View style={[
                        styles.statusDot,
                        { backgroundColor: item.state === 'OPEN' ? '#2cbe4e' : '#cb2431' }
                    ]} />
                    <Text style={styles.stateText}>{item.state.toUpperCase()}</Text>
                </View>

                <Text style={styles.dateText}>
                    Opened {moment(item.createdAt).fromNow()}
                </Text>
            </View>

            <View style={styles.issueFooter}>
                {item.author && (
                    <View style={styles.authorContainer}>
                        <Image
                            source={{ uri: item.author.avatarUrl }}
                            style={styles.avatar}
                        />
                        <Text style={styles.authorName}>{item.author.login}</Text>
                    </View>
                )}

                <Text style={styles.commentCount}>
                    💬 {item.comments.totalCount}
                </Text>
            </View>


            {(!!item.labels.nodes.length) && (
                <View style={styles.labelsContainer}>
                    {item.labels.nodes.map((label) => (
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
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    issueCard: {
        backgroundColor: 'white',
        padding: 16,
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#e1e4e8',
    },
    issueHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    issueTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8,
    },
    issueNumber: {
        color: '#586069',
        fontSize: 14,
    },
    issueMetadata: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    stateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 4,
    },
    stateText: {
        fontSize: 12,
        color: '#586069',
        marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 12,
        color: '#586069',
        alignItems: 'flex-end',
    },
    issueFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 4,
    },
    authorName: {
        fontSize: 12,
        color: '#586069',
    },
    commentCount: {
        fontSize: 12,
        color: '#586069',
    },
    labelsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    labelBadge: {
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 4,
        marginBottom: 4,
    },
    labelText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
})
