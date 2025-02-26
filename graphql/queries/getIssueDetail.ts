import { gql } from "@apollo/client";

export const GET_ISSUE_DETAIL = gql`
query GetIssueDetail($number: Int!) {
    repository(owner: "facebook", name: "react-native") {
        issue(number: $number) {
            id
            number
            title
            bodyText
            state
            createdAt
            url
            author {
                login
                avatarUrl
                url
            }
            comments(first: 10) {
                totalCount
                pageInfo {
                    hasNextPage
                    endCursor
                }
                nodes {
                    id
                    author {
                        login
                        avatarUrl
                    }
                    body
                    createdAt
                }
            }
            labels(first: 5) {
                nodes {
                    id
                    name
                    color
                }
            }
        }
    }
}
`