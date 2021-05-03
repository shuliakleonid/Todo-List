import {AppActionType, setAppStatus, setError} from '../reducers/app-reducer'
import {ResponseType} from '../api/api'
import {Dispatch} from 'redux'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppActionType>) => {
  if (data.messages.length) {
    dispatch(setError({error: data.messages[0]}))
  } else {
    dispatch(setError({error: 'Some error occurred'}))
  }
  dispatch(setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<AppActionType>) => {
  dispatch(setError({error: error.message ? error.message : 'Some error occurred'}))
  dispatch(setAppStatus({status: 'failed'}))
}
