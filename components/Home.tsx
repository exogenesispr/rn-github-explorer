import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';

const GET_ISSUES = gql`
    query GetIssues{
        repository(owner: "facebook", name: "react-native") {
            issues(first: 50, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
                edges {
                    node{
                        id
                        title
                        body
                        createdAt
                    }
                }
            }
        }
    }
`;

const Home = () => {
    const { loading, error, data } = useQuery(GET_ISSUES)

    if (loading)
        return <ActivityIndicator style={styles.loader} />

    if (error)
        return <Text style={styles.error}>Error: {error.message}</Text>

    return (
        <View style={styles.container}>
            <Text style={styles.header}>React Native Issues</Text>
            <FlatList
                data={data.repository.issues.edges}
                keyExtractor={(item) => item.node.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.issueCard}>
                            <Text style={styles.issueTitle}>{item.node.title}</Text>
                            <Text style={styles.issueBody}>{item.node.body.substring(0, 150)}...</Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    error: {
        color: "red",
        textAlign: "center",
        marginTop: 20
    },
    issueCard: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#f9f9f9",
        borderRadius: 5
    },
    issueTitle: {
        fontSize: 16,
        fontWeight: "bold"
    },
    issueBody: {
        fontSize: 14,
        color: "#555"
    },
})