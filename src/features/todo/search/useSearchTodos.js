import { useEffect } from 'react'
import {  searchTodos } from '@/shared/api/todos.js'

export function useSearchTodos(search, sort, setTodos) {
    useEffect(() => {
        const query = search.trim()

        const fetchData = async () => {
            try {
                const result = await searchTodos(query, sort)
                setTodos(result)
            } catch {
                setTodos([])
            }
        }

        fetchData()
    }, [search, sort, setTodos])
}
