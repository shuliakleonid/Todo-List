import {v1} from 'uuid';
import {ACTIONS_TYPE} from '../constants';
import {AppThunk} from '../state/store';
import {todoListsAPI, TodolistType} from '../api/api';

export type TodoListActionType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof changeFilterTodolistAC>
    | ReturnType<typeof changeTitleTodolistAC>

export const todoListID1 = v1() // original id
export const todoListID2 = v1()

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todoListReducer = (state = initialState, action: TodoListActionType): Array<TodolistDomainType> => {
  switch (action.type) {
    case ACTIONS_TYPE.ADD_TODOLIST: {
        return [{
          id: action.todolistId,
          title: action.title,
          filter: 'all',
          addedDate: '',
          order: 0 // порядок листа в очереди
        }, ...state]
      }
    case ACTIONS_TYPE.REMOVE_TODOLIST:
      return state.filter((item) => item.id !== action.id)
    case ACTIONS_TYPE.CHANGE_FILTER_TODOLIST:
      return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
    case ACTIONS_TYPE.CHANGE_TITLE_TODOLIST:
      return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
    case ACTIONS_TYPE.SET_TODOS: {
      return action.payload.map((tl) => ({...tl, filter: 'all'}))
    }
    default:
      return state
  }
}

export const removeTodolistAC = (todolistId: string) => ({type: ACTIONS_TYPE.REMOVE_TODOLIST, id: todolistId}) as const
export const addTodolistAC = (title: string) => ({type: ACTIONS_TYPE.ADD_TODOLIST, title, todolistId: v1()}) as const
export const changeFilterTodolistAC = (todolistId: string, filter: FilterValuesType) => ({
  type: ACTIONS_TYPE.CHANGE_FILTER_TODOLIST,
  todolistId,
  filter
}) as const
export const changeTitleTodolistAC = (todolistId: string, title: string) => ({
  type: ACTIONS_TYPE.CHANGE_TITLE_TODOLIST,
  todolistId,
  title
}) as const
export const setTodoListsAC = (todoLists: Array<TodolistType>) => ({type: ACTIONS_TYPE.SET_TODOS, payload: todoLists} ) as const


export const fetchTodoListsThunk = (): AppThunk =>  (dispatch) => {
  todoListsAPI.getTodoLists()
      .then((res) => {
        dispatch(setTodoListsAC(res))
      })
}
export const setRemoveTodoList = (todoID: string): AppThunk => (dispatch) => {
  todoListsAPI.deleteTodoLists(todoID)
      .then((res) => {
        dispatch(removeTodolistAC(todoID))
      })
}
export const addTodoList = (title: string): AppThunk => (dispatch) => {
  todoListsAPI.createTodoLists(title)
      .then((res) => {
        dispatch(addTodolistAC(title))
      })
}
export const updateTodoList = (todoID: string, title: string): AppThunk => (dispatch) => {
  todoListsAPI.updateTodoLists(todoID, title)
      .then((res) => {
        dispatch(changeTitleTodolistAC(todoID, title))
      })
}
