import { deleteTodo } from '@/shared/api/todos.js'

export function useDeleteTodo(fetchTodos) {
    return function handleDelete(id) {
        deleteTodo(id).then(fetchTodos)
    }
}
