import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import { LabelsListProps } from '../types/components';

export default function LabelsList({
    labels
}: LabelsListProps) {
    if (!labels.nodes) {
        return null
    }

    return (
        <View style={styles.labelsContainer}>
            {labels.nodes.map((label) => (
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
    )
}

const styles = StyleSheet.create({
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
})