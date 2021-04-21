import {v1} from 'uuid';
import {ACTIONS_TYPE} from '../constants';
import {AppThunk} from '../state/store';
import {todoListsAPI, TodolistType} from '../api/api';
import {RequestStatusType, setAppStatus, setError} from './app-reducer';
import {fetchTaskThunk} from './task-reducer';

export type TodoListActionType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof changeFilterTodolistAC>
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof changeTodolistEntityStatus>

export const todoListID1 = v1() // original id
export const todoListID2 = v1()

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
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
        entityStatus: 'idle',
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
      return action.payload.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle',}))
    }
    case ACTIONS_TYPE.CHANGE_TODOLIST_ENTITY_STATUS: {
      return state.map(tl => tl.id === action.todoListId ? {...tl, entityStatus:action.status} : tl)
    }
    default:
      return state
  }
}
export const removeTodolistAC = (todolistId: string) => ({type: ACTIONS_TYPE.REMOVE_TODOLIST, id: todolistId}) as const
export const addTodolistAC = (title: string, todolistId: string) => ({
  type: ACTIONS_TYPE.ADD_TODOLIST,
  title,
  todolistId
}) as const
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
export const setTodoListsAC = (todoLists: Array<TodolistType>) => ({
  type: ACTIONS_TYPE.SET_TODOS,
  payload: todoLists
}) as const

export const changeTodolistEntityStatus = (todoListId:string,status:RequestStatusType) => ({type: ACTIONS_TYPE.CHANGE_TODOLIST_ENTITY_STATUS,todoListId,status}) as const


export const fetchTodoListsThunk = (): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(setAppStatus('loading'))
        const todoLists = await todoListsAPI.getTodoLists()
        dispatch(setTodoListsAC(todoLists))
        todoLists.forEach(todoList => dispatch(fetchTaskThunk(todoList.id)))
        dispatch(setAppStatus('succeeded'))
      } catch (e) {
        console.warn(e)
      }
    }
export const setRemoveTodoList = (todoID: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(changeTodolistEntityStatus(todoID,'loading'))
        dispatch(setAppStatus('loading'))
        await todoListsAPI.deleteTodoLists(todoID)
        dispatch(removeTodolistAC(todoID))


      } catch (e) {
        console.warn(e)
      }finally {
        dispatch(setAppStatus('succeeded'))
      }

    }
export const addTodoList = (title: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(setAppStatus('loading'))
        const todolist = await todoListsAPI.createTodoLists(title)
        // dispatch(addTodolistAC(todolist.data.item.title, todolist.data.item.id))
        if (todolist.resultCode === 0) {
          debugger
          dispatch(addTodolistAC(todolist.data.item.title, todolist.data.item.id))
          // dispatch(setAppStatus('succeeded'))
        } else {
          if (todolist.messages.length) {
            dispatch(setError(todolist.messages[0]))
          } else {
            dispatch(setError('Some error occurred'))
          }
        }
      } catch (e) {
        dispatch(setError(e))
        // console.warn(e)
      } finally {
        dispatch(setAppStatus('succeeded'))
      }
    }

export const updateTodoList = (todoID: string, title: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(setAppStatus('loading'))
        await todoListsAPI.updateTodoLists(todoID, title)

        dispatch(changeTitleTodolistAC(todoID, title))
        dispatch(setAppStatus('succeeded'))
      } catch (e) {
        console.warn(e)
      }
    }
