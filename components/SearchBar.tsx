import {
    View,
    TextInput,
    StyleSheet,
} from 'react-native'
import { useState, useEffect } from 'react'

import { SearchBarProps } from '../types/components'


export default function SearchBar({
    initialValue = '',
    onSearch,
    debounceTime = 700
}: SearchBarProps) {
    const [searchText, setSearchText] = useState(initialValue)

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchText)
        }, debounceTime)

        return () => clearTimeout(timer)
    }, [searchText, onSearch, debounceTime])

    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder='Search issues...'
                value={searchText}
                onChangeText={setSearchText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        padding: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e4e8',
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#e1e4e8',
        borderRadius: 4,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
})