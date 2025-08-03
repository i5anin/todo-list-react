import { axiosInstance } from './axios/axiosConfig.js'
import { handleResponse, handleApiError } from './axios/errorHandler.js'

export function getTodos() {
    return axiosInstance
        .get('/todos')
        .then(handleResponse)
        .catch(handleApiError)
}

export function addTodo(todo) {
    return axiosInstance
        .post('/todos', todo)
        .then(handleResponse)
        .catch(handleApiError)
}

export function updateTodo(id, updates) {
    return axiosInstance
        .patch(`/todos/${id}`, updates)
        .then(handleResponse)
        .catch(handleApiError)
}

export function deleteTodo(id) {
    return axiosInstance
        .delete(`/todos/${id}`)
        .then(handleResponse)
        .catch(handleApiError)
}

export function searchTodos(query, sort = false) {
    let url = `/todos?q=${encodeURIComponent(query)}`
    if (sort) url += '&_sort=title&_order=asc'
    return axiosInstance
        .get(url)
        .then(handleResponse)
        .catch(handleApiError)
}
