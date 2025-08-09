import { useEffect, useState } from 'react'
import {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    searchTodos
} from '@/api/todos'

export default function TodoList() {
    const [todos, setTodos] = useState([])
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    useEffect(() => {
        fetchTodos()
    }, [search, sort])

    function fetchTodos() {
        const query = search.trim()
        if (query) {
            searchTodos(query, sort).then(setTodos).catch(() => setTodos([]))
        } else {
            getTodos().then(setTodos).catch(() => setTodos([]))
        }
    }

    function handleAdd(e) {
        e.preventDefault()
        const title = newTitle.trim()
        if (!title) return
        addTodo({ title, completed: false }).then(() => {
            setNewTitle('')
            fetchTodos()
        })
    }

    function handleDelete(id) {
        deleteTodo(id).then(fetchTodos)
    }

    function toggleComplete(todo) {
        updateTodo(todo.id, { completed: !todo.completed }).then(fetchTodos)
    }

    function toggleSort() {
        setSort(prev => !prev)
    }

    return (
        <div className="todo-wrapper">
            <h1>Список дел</h1>

            <form className="todo-form" onSubmit={handleAdd}>
                <input
                    type="text"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="Новая задача"
                />
                <button type="submit">Добавить</button>
            </form>

            <div className="todo-controls">
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Поиск"
                />
                <button onClick={toggleSort}>
                    Сортировка: {sort ? 'по алфавиту' : 'без сортировки'}
                </button>
            </div>

            <ul className="todo-list">
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        className={`todo-item ${todo.completed ? 'completed' : ''}`}
                        onClick={() => toggleComplete(todo)}
                    >
                        <span>{todo.title}</span>
                        <button
                            className="delete-button"
                            onClick={e => {
                                e.stopPropagation()
                                handleDelete(todo.id)
                            }}
                            aria-label="Удалить"
                        >
                            🗑
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )

}
