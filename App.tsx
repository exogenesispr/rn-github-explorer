import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import Home from './components/Home';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Home />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
