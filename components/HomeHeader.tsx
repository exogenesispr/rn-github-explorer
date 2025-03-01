import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { HomeHeaderProps } from '../types/components';

export default function HomeHeader({
    currentState,
    onStateChange
}: HomeHeaderProps) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>React Native Issues</Text>

            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        currentState === 'OPEN' && styles.activeFilterButton
                    ]}
                    onPress={() => onStateChange('OPEN')}
                >
                    <Text
                        style={[
                            styles.filterButtonText,
                            currentState === 'OPEN' && styles.activeFilterText
                        ]}
                    >
                        Open
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        currentState === 'CLOSED' && styles.activeFilterButton
                    ]}
                    onPress={() => onStateChange('CLOSED')}
                >
                    <Text
                        style={[
                            styles.filterButtonText,
                            currentState === 'CLOSED' && styles.activeFilterText
                        ]}
                    >
                        Closed
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 14,
        backgroundColor: '#0D1117',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    filterContainer: {
        flexDirection: 'row',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    activeFilterButton: {
        backgroundColor: '#f1f8ff',
        borderWidth: 1,
        borderColor: '#0366d6',
    },
    filterButtonText: {
        fontSize: 16,
        color: '#586069',
    },
    activeFilterText: {
        color: '#0366d6',
        fontWeight: 'bold',
    }
})