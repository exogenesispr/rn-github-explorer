import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apolloClient";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";


export default function Layout() {
    return (
        <ApolloProvider client={client}>
            <SafeAreaProvider>
                <StatusBar style='auto' />
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: '#f6f8fa' }
                    }}
                />
            </SafeAreaProvider>
        </ApolloProvider>
    )
}