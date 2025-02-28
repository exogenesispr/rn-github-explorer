import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ErrorViewProps } from '../types/components'

export default function ErrorView({
    title = "Error loading issue",
    message,
    buttonText = "Back to Issues List",
    onButtonPress
}: ErrorViewProps) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{title}</Text>
                <Text style={styles.errorDetail}>{message}</Text>
                <TouchableOpacity
                    style={styles.backToListButton}
                    onPress={onButtonPress}
                >
                    <Text style={styles.backToListText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f8fa',
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f6f8fa',
    },
    errorText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#24292e',
        marginBottom: 12,
    },
    errorDetail: {
        fontSize: 16,
        color: '#586069',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
        maxWidth: '90%',
    },
    backToListButton: {
        backgroundColor: '#0366d6',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 6,
    },
    backToListText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
})