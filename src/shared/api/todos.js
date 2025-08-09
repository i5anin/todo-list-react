const BASE_URL = 'http://localhost:3001'

export async function getTodos() {
    try {
        const res = await fetch(`${BASE_URL}/todos`)
        if (!res.ok) throw new Error('Ошибка при получении задач')
        return await res.json()
    } catch (error) {
        console.error('getTodos:', error.message)
        return []
    }
}

export async function addTodo(todo) {
    try {
        const res = await fetch(`${BASE_URL}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        })
        if (!res.ok) throw new Error('Ошибка при добавлении задачи')
        return await res.json()
    } catch (error) {
        console.error('addTodo:', error.message)
        return null
    }
}

export async function updateTodo(id, updates) {
    try {
        const res = await fetch(`${BASE_URL}/todos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        })
        if (!res.ok) throw new Error('Ошибка при обновлении задачи')
        return await res.json()
    } catch (error) {
        console.error('updateTodo:', error.message)
        return null
    }
}

export async function deleteTodo(id) {
    try {
        const res = await fetch(`${BASE_URL}/todos/${id}`, {
            method: 'DELETE'
        })
        if (!res.ok) throw new Error('Ошибка при удалении задачи')
        // Сервер возвращает пустой ответ — просто возвращаем `id`
        return id
    } catch (error) {
        console.error('deleteTodo:', error.message)
        return null
    }
}

export async function searchTodos(query = '', sort = false) {
    try {
        const searchParams = new URLSearchParams()
        if (query) searchParams.append('q', query)
        if (sort) {
            searchParams.append('_sort', 'title')
            searchParams.append('_order', 'asc')
        }
        const res = await fetch(`${BASE_URL}/todos?${searchParams.toString()}`)
        if (!res.ok) throw new Error('Ошибка при поиске задач')
        return await res.json()
    } catch (error) {
        console.error('searchTodos:', error.message)
        return []
    }
}
