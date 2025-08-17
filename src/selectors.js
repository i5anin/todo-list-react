export const selectTodos = ({ todos }) => todos;

export const selectSearchInput = ({ options }) => options.searchInput;

export const selectSearchPhrase = ({ options }) => options.searchPhrase;

export const selectIsAlphabetSorting = ({ options }) => options.isAlphabetSorting;

export const selectIsLoading = ({ options }) => options.isLoading;

export const selectEditingTodoId = ({ editingTodo }) => editingTodo.id;

export const selectEditingTodoTitle = ({ editingTodo }) => editingTodo.title;
