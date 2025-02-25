import { gql } from "@apollo/client";

export const SEARCH_ISSUES = gql`
query SearchIssues($query: String!, $first: Int!, $after: String) {
    search(
        query: $query,
        type: ISSUE, 
        first: $first,
        after: $after,
    ) {
        issueCount
        pageInfo {
            hasNextPage
            endCursor
        }
        edges {
            node{
                ... on Issue {
                    id
                    number
                    title
                    body
                    state
                    createdAt
                    repository {
                        nameWithOwner
                    }
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
}
`