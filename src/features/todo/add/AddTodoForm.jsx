import { useState } from 'react'

export function AddTodoForm({ onAdd }) {
    const [newTitle, setNewTitle] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        const title = newTitle.trim()
        if (!title) return
        onAdd(title)
        setNewTitle('')
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Новая задача"
            />
            <button type="submit">Добавить</button>
        </form>
    )
}
