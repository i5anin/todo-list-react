import { axiosInstance } from './axiosConfig'
import { handleResponse, handleApiError } from './errorHandler'

export function getTodos(limit = 10) {
    return axiosInstance
        .get(`/todos?_limit=${limit}`)
        .then(handleResponse)
        .catch(handleApiError)
}
