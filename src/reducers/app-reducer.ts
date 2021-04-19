import {ACTIONS_TYPE} from '../constants';


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionType = ReturnType<typeof setAppStatus>
    | ReturnType<typeof setError>


const initialState = {
  status: 'loading' as RequestStatusType,
  error:  null as null | string
}

export type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
  switch (action.type) {
    case ACTIONS_TYPE.SET_STATUS: {
      return {...state, status: action.status}
    }
    case ACTIONS_TYPE.SET_ERROR: {
      return {...state, error: action.error}
    }
    default:
      return state
  }
}

export const setAppStatus = (status: RequestStatusType) => ({type: ACTIONS_TYPE.SET_STATUS, status}) as const
export const setError = (error: string | null) => ({type: ACTIONS_TYPE.SET_ERROR, error}) as const
//
//
// export const fetchTaskThunk = (todoId: string): AppThunk =>
//     async (dispatch) => {
//       try {
//
//         const tasks = await todoListsAPI.getTasks(todoId)
//         dispatch(setTaskAC(tasks.items, todoId))
//       } catch (e) {
//         console.warn(e)
//       }
//     }
