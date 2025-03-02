import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import { IssueTitleStateProps } from '../types/components'

export default function IssueTitleAndState({
    title,
    state,
}: IssueTitleStateProps) {
    return (
        <View style={styles.issueHeader}>
            <Text style={styles.issueTitle}>{title}</Text>
            <View style={[
                styles.stateTag,
                { backgroundColor: state === 'OPEN' ? '#2cbe4e' : '#cb2431' }
            ]}>
                <Text style={styles.stateText}>{state}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
})