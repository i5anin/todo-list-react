export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            onClick={() => onToggle(todo)}
        >
            <span>{todo.title}</span>
            <button
                className="delete-button"
                onClick={(e) => {
                    e.stopPropagation()
                    onDelete(todo.id)
                }}
                aria-label="Удалить"
            >
                🗑
            </button>
        </li>
    )
}
