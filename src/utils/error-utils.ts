import {
  AppActionType,
  setAppStatus,
  setError
} from '../reducers/app-reducer'
import {ResponseType} from '../api/api'
import {Dispatch} from 'redux'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppActionType>) => {
    if (data.messages.length) {
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError('Some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<AppActionType>) => {
    dispatch(setError(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatus('failed'))
}
