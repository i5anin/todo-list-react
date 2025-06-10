import { useEffect, useState } from 'react'
import { getTodos } from '@/api/todos' // 👉 если alias #src = ./src настроен

export default function TodoList() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos()
            .then(setTodos)
            .catch(() => setTodos([]))
    }, [])

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                    {todo.title}
                </li>
            ))}
        </ul>
    )
}
