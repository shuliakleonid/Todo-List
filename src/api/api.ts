import axios from 'axios';

type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}
// type CreateTodolistResponseType<T> = {
//   resultCode: number
//   messages: Array<string>
//   data: T
// }
// type UpdateTodolistResponseType<T> = {
//   resultCode: number
//   messages: Array<string>
//   data: T
// }
//
// type DeleteTodolistResponseType<T> = {
//   resultCode: number
//   messages: Array<string>
//   data: T
// }

type ResponseType<T> = {
  resultCode: number
  messages: Array<string>
  data: T
}
type TasksResponse = {
  error: string | null
  totalCount: number
  items: Array<TaskType>
}
export type TaskType = {
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
type UpdateTaskType = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}
const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '69c9d2d3-e5a4-4bb9-9356-a9517225e2b4'
  }
})

export const API = {
  getTodoLists() {
    return instance.get<Array<TodolistType>>('todo-lists').then(res => res.data)
  },
  createTodoLists(title: string) {
    return instance.post<ResponseType<{
      item: TodolistType
    }>>('todo-lists', {title}).then(res => res.data)
  },
  deleteTodoLists(titleId: string) {
    return instance.delete<ResponseType<{}>>(`todo-lists/${titleId}`).then(res => res.data)
  },
  updateTodoLists(titleId: string, title: string) {
    return instance.put<ResponseType<{}>>(`todo-lists/${titleId}`, {title}).then(res => res.data)
  },
  getTasks(titleId: string) {
    return instance.get<TasksResponse>(`todo-lists/${titleId}/tasks`).then(res => res.data)
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<TasksResponse>(`todo-lists/${todoListId}/tasks/${taskId}`).then(res => res.data)
  },
  createTask(todoListId: string, title: string) {
    return instance.post<ResponseType<TaskType>>(`todo-lists/${todoListId}/tasks`, {title}).then(res => res.data)
  },
  updateTask(todoListId: string, taskId: string, title: string) {
    return instance.put<UpdateTaskType>(`todo-lists/${todoListId}/tasks/${taskId}`, {title}).then(res => res.data)
  }
}
