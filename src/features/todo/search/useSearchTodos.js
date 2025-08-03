import { useEffect } from 'react'
import { getTodos, searchTodos } from '@/shared/api/todos.js'

export function useSearchTodos(search, sort, setTodos) {
    useEffect(() => {
        const query = search.trim()

        const fetchData = async () => {
            try {
                const result = query
                    ? await searchTodos(query, sort)
                    : await getTodos()
                setTodos(result)
            } catch {
                setTodos([])
            }
        }

        fetchData()
    }, [search, sort, setTodos])
}