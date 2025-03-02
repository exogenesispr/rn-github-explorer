import { UseGetIssueDetailResult } from '../types/hooks'
import { useQuery } from '@apollo/client'
import { IssueDetailResult } from '../types/github'
import { GET_ISSUE_DETAIL } from '../graphql/queries/getIssueDetail'
import { useRefresh } from './useRefresh'


export function useGetIssueDetail(
    issueNumber: number
): UseGetIssueDetailResult {
    const { loading, error, data, refetch } = useQuery<IssueDetailResult>(GET_ISSUE_DETAIL, {
        variables: {
            number: issueNumber
        },
        skip: !issueNumber,
        notifyOnNetworkStatusChange: true,
    })

    const { refreshing, handleRefresh: onRefresh } = useRefresh(refetch)

    const handleRefresh = () => {
        onRefresh()
    }

    const issue = data?.repository?.issue

    return {
        issue,
        loading,
        error,
        refreshing,
        handleRefresh
    }
}