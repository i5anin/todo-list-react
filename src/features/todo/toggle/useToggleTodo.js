

import { updateTodo } from '@/shared/api/todos.js'

export function useToggleTodo(fetchTodos) {
    return function toggle(todo) {
        updateTodo(todo.id, { completed: !todo.completed }).then(fetchTodos)
    }
}
