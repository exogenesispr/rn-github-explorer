import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apolloClient";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";


export default function Layout() {
    return (
        <ApolloProvider client={client}>
            <SafeAreaProvider>
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