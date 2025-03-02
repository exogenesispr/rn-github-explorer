import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import { IssueHeaderProps } from '../types/components'

export default function IssueHeader({
    title,
    onBackPress
}: IssueHeaderProps) {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={onBackPress}
            >
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    },
})