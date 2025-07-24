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
            <form onSubmit={handleAdd}>
                <input
                    type="text"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="Новая задача"
                />
                <button type="submit">Добавить</button>
            </form>

            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск"
            />

            <button onClick={toggleSort}>
                Сортировка: {sort ? 'по алфавиту' : 'без сортировки'}
            </button>

            <ul className="todo-list">
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        className={todo.completed ? 'completed' : ''}
                        onClick={() => toggleComplete(todo)}
                    >
                        {todo.title}
                        <button onClick={() => handleDelete(todo.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
