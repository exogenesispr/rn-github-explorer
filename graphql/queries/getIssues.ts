import { gql } from "@apollo/client";

export const GET_ISSUES = gql`
    query GetIssues ($state: [IssueState!], $first: Int!, $after: String) {
        repository(owner: "facebook", name: "react-native") {
            issues(
                states: $state,
                first: $first,
                after: $after,
                orderBy: {field: CREATED_AT, direction: DESC},
                ) {
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                    nodes {
                        id
                        number
                        title
                        body
                        state
                        createdAt
                        author {
                            login
                            avatarUrl
                        }
                        comments {
                            totalCount
                        }
                        labels(first: 3) {
                            nodes {
                                id
                                name
                                color
                            }
                        }
                    }
                
            }
        }
    }
`;

