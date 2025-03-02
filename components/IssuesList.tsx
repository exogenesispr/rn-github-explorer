import {
    FlatList,
    RefreshControl,
    StyleSheet,
    View,
    Text
} from 'react-native'
import { Issue } from '../types/github'
import { IssuesListProps } from '../types/components'
import LoadingView from './LoadingView'
import ErrorView from './ErrorView'
import IssueCard from './IssueCard'

export default function IssuesList({
    data,
    loading,
    error,
    refreshing,
    onRefresh,
    onLoadMore,
    onIssuePress,
    isLoadingMore
}: IssuesListProps) {

    if (!data?.length && loading) {
        return <LoadingView message='Loading issues...' />
    }

    if (error && !data?.length) {
        return (
            <ErrorView
                title='Error loading issues'
                message={error.message}
                buttonText='Try again'
                onButtonPress={onRefresh}
            />
        )
    }

    return (
        <FlatList
            data={data || []}
            keyExtractor={(item: Issue) => item.id}
            renderItem={({ item }) => (
                <IssueCard item={item} onPress={onIssuePress} />
            )}

            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#0366d6']}
                    tintColor='#0366d6'
                />
            }

            maintainVisibleContentPosition={{
                minIndexForVisible: 0
            }}

            onEndReached={onLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                isLoadingMore ? (
                    <View style={styles.loadingFooter}>
                        <LoadingView message='Loading more issues...' size='small' />
                    </View>
                ) : null
            }

            ListEmptyComponent={
                !loading ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            No issues found. Try again adjusting your search.
                        </Text>
                    </View>
                ) : null
            }
        />
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        padding: 24,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#586069',
        textAlign: 'center',
    },
    loadingFooter: {
        padding: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
})