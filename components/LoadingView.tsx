import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
} from 'react-native'
import { LoadingViewProps } from '../types/components'

export default function LoadingView({
    message = 'Loading...',
    color = '#0366d6',
    size = 'large'
}: LoadingViewProps) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={size} color={color} />
            <Text style={styles.loadingText}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f8fa'
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#586069',
        textAlign: 'center',
    },
})