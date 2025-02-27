import { useState } from 'react'
import { ApolloQueryResult } from '@apollo/client'

type RefetchFunction<T> = () => Promise<ApolloQueryResult<T>>

export function useRefresh<T>(refetchFunction: RefetchFunction<T>) {
    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = () => {
        setRefreshing(true)

        refetchFunction()
            .then(() => {
                setRefreshing(false)
            })
            .catch((error) => {
                console.error('error refetching data: ', error)
                setRefreshing(false)
            })
    }

    return {
        refreshing,
        handleRefresh,
    }
}
