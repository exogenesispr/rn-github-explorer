import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: `${process.env.EXPO_PUBLIC_API_URL}`,
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
    },
})

export default client