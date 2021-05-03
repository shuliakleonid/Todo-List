import {v1} from 'uuid';
import {AppThunk} from '../state/store';
import {todoListsAPI, TodolistType} from '../api/api';
import {RequestStatusType, setAppStatus} from './app-reducer';
import {fetchTaskThunk} from './task-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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

const slice = createSlice({
  name: 'todoList',
  initialState: initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      if(index !==-1){
        state.splice(index,1)
      }
    },
    addTodolistAC(state, action: PayloadAction<{ title: string, todolistId: string }>) {
      state.unshift( {
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: 'all',
        addedDate: '',
        entityStatus: 'idle',
        order: 0 // порядок листа в очереди
      })
    },
    changeFilterTodolistAC(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].filter = action.payload.filter
      // state = state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
    },
    changeTitleTodolistAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].title = action.payload.title
      // state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
    },
    setTodoListsAC(state, action: PayloadAction<{ todoLists: Array<TodolistType> }>) {
      return action.payload.todoLists.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle',}))
    },
    changeTodolistEntityStatus(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].entityStatus = action.payload.status
      // state = state.map(tl => tl.id === action.payload.todolistId ? {...tl, entityStatus: action.payload.status} : tl)
    }
  }
})
export const todoListReducer = slice.reducer
export const {
  removeTodolistAC,
  addTodolistAC,
  changeFilterTodolistAC,
  changeTitleTodolistAC,
  setTodoListsAC,
  changeTodolistEntityStatus
} = slice.actions
// export const todoListReducer = (state = initialState, action: TodoListActionType): Array<TodolistDomainType> => {
//   switch (action.type) {
//     case ACTIONS_TYPE.ADD_TODOLIST: {
//       return [{
//         id: action.todolistId,
//         title: action.title,
//         filter: 'all',
//         addedDate: '',
//         entityStatus: 'idle',
//         order: 0 // порядок листа в очереди
//       }, ...state]
//     }
//     case ACTIONS_TYPE.REMOVE_TODOLIST:
//       return state.filter((item) => item.id !== action.id)
//     case ACTIONS_TYPE.CHANGE_FILTER_TODOLIST:
//       return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
//     case ACTIONS_TYPE.CHANGE_TITLE_TODOLIST:
//       return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
//     case ACTIONS_TYPE.SET_TODOS: {
//       return action.payload.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle',}))
//     }
//     case ACTIONS_TYPE.CHANGE_TODOLIST_ENTITY_STATUS: {
//       return state.map(tl => tl.id === action.todoListId ? {...tl, entityStatus: action.status} : tl)
//     }
//     default:
//       return state
//   }
// }
// export const removeTodolistAC = (todolistId: string) => ({type: ACTIONS_TYPE.REMOVE_TODOLIST, id: todolistId}) as const
// export const addTodolistAC = (title: string, todolistId: string) => ({
//   type: ACTIONS_TYPE.ADD_TODOLIST,
//   title,
//   todolistId
// }) as const
// export const changeFilterTodolistAC = (todolistId: string, filter: FilterValuesType) => ({
//   type: ACTIONS_TYPE.CHANGE_FILTER_TODOLIST,
//   todolistId,
//   filter
// }) as const
// export const changeTitleTodolistAC = (todolistId: string, title: string) => ({
//   type: ACTIONS_TYPE.CHANGE_TITLE_TODOLIST,
//   todolistId,
//   title
// }) as const
// export const setTodoListsAC = (todoLists: Array<TodolistType>) => ({
//   type: ACTIONS_TYPE.SET_TODOS,
//   payload: todoLists
// }) as const
// export const changeTodolistEntityStatus = (todoListId: string, status: RequestStatusType) => ({
//   type: ACTIONS_TYPE.CHANGE_TODOLIST_ENTITY_STATUS,
//   todoListId,
//   status
// }) as const
export const fetchTodoListsThunk = (): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(setAppStatus({status: 'loading'}))
        const todoLists = await todoListsAPI.getTodoLists()
        dispatch(setTodoListsAC({todoLists}))
        todoLists.forEach(todoList => dispatch(fetchTaskThunk(todoList.id)))
        dispatch(setAppStatus({status: 'succeeded'}))
      } catch (e) {
        handleServerNetworkError(e, dispatch)

      }
    }
export const setRemoveTodoList = (todoID: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(changeTodolistEntityStatus({todolistId: todoID, status: 'loading'}))
        dispatch(setAppStatus({status: 'loading'}))
        await todoListsAPI.deleteTodoLists(todoID)
        dispatch(removeTodolistAC({todolistId: todoID}))
      } catch (e) {
        handleServerNetworkError(e, dispatch)
      } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
      }

    }
export const addTodoList = (title: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(setAppStatus({status: 'loading'}))
        const todolist = await todoListsAPI.createTodoLists(title)
        // dispatch(addTodolistAC(todolist.data.item.title, todolist.data.item.id))
        if (todolist.resultCode === 0) {
          dispatch(addTodolistAC({title: todolist.data.item.title, todolistId: todolist.data.item.id}))
          // dispatch(setAppStatus('succeeded'))
        } else {
          handleServerAppError(todolist, dispatch);
        }
      } catch (e) {
        handleServerNetworkError(e, dispatch)
      } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
      }
    }
export const updateTodoList = (todoID: string, title: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(setAppStatus({status: 'loading'}))
        await todoListsAPI.updateTodoLists(todoID, title)
        dispatch(changeTitleTodolistAC({todolistId: todoID, title}))
        dispatch(setAppStatus({status: 'succeeded'}))
      } catch (e) {
        handleServerNetworkError(e, dispatch)
      }
    }
