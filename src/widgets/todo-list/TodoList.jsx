import { useState } from 'react'
import { useSearchTodos } from '@/features/todo/search/useSearchTodos'
import { useDeleteTodo } from '@/features/todo/delete/useDeleteTodo'
import { useToggleTodo } from '@/features/todo/toggle/useToggleTodo'
import {addTodo, getTodos, searchTodos} from '@/shared/api/todos.js'
import TodoItem from '@/entities/todo/ui/TodoItem'
import { AddTodoForm } from '@/features/todo/add/AddTodoForm'

export default function TodoList() {
    const [todos, setTodos] = useState([])
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState(false)

    const fetchTodos = () => {
        const query = search.trim()
        const action = query ? searchTodos : getTodos
        action(query, sort).then(setTodos).catch(() => setTodos([]))
    }

    const handleDelete = useDeleteTodo(fetchTodos)
    const toggleComplete = useToggleTodo(fetchTodos)

    useSearchTodos(search, sort, setTodos)

    function handleAdd(title) {
        addTodo({ title, completed: false }).then(fetchTodos)
    }

    function toggleSort() {
        setSort((prev) => !prev)
    }

    return (
        <div className="todo-wrapper">
            <h1>Список дел</h1>

            <AddTodoForm onAdd={handleAdd} />

            <div className="todo-controls">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Поиск"
                />
                <button onClick={toggleSort}>
                    Сортировка: {sort ? 'по алфавиту' : 'без сортировки'}
                </button>
            </div>

            <ul className="todo-list">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleComplete}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
        </div>
    )
}
