import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import IssueListScreen from './app/index';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider style={styles.container}>
        <StatusBar style="auto" />

        <IssueListScreen />

      </SafeAreaProvider>
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
