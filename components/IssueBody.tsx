import { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { IssueBodyProps } from '../types/components'

export default function IssueBody({
    bodyText,
    maxLines = 10
}: IssueBodyProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const hasContent = !!bodyText
    const isLongContent = (hasContent) && (bodyText.split('\n').length > maxLines || bodyText.length > 300)

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    if (!hasContent) {
        return (
            <View style={styles.issueBody}>
                <Text style={styles.bodyText}>No issue description provided</Text>
            </View>
        )
    }

    return (
        <View style={styles.issueBody}>
            <Text
                style={styles.bodyText}
                numberOfLines={isExpanded ? undefined : maxLines}
            >
                {bodyText}
            </Text>

            {isLongContent && (
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={toggleExpanded}
                >
                    <Text style={styles.toggleText}>
                        {isExpanded ? 'Show less' : 'Show more'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
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
    toggleButton: {
        marginTop: 8,
        paddingVertical: 4,
    },
    toggleText: {
        color: '#0366d6',
        fontWeight: '500',
    }
})