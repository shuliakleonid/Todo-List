import {ACTIONS_TYPE} from '../constants';
import {AppThunk} from '../state/store';
import {authAPI, LoginDataType} from '../api/tl-api';
import {setAppStatus} from './app-reducer';

export type AuthActionType =
    ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setInitialized>

const initialState = {
  isLoggedIn: false,
  isInitialized:false
};
export type AuthStateType = typeof initialState
export const authReducer = (state: AuthStateType = initialState, action: AuthActionType): AuthStateType => {
  switch (action.type) {
    case ACTIONS_TYPE.SET_IS_LOGGED_IN:
      return {...state, isLoggedIn: action.value}
    case ACTIONS_TYPE.SET_IS_INITIALIZED:
      return {...state, isInitialized: action.value}
    default:
      return {...state}
  }
}
export const setIsLoggedIn = (value: boolean) => ({type: ACTIONS_TYPE.SET_IS_LOGGED_IN, value}) as const
export const setInitialized = (value: boolean) => ({type: ACTIONS_TYPE.SET_IS_INITIALIZED, value}) as const
export const login = (data: LoginDataType): AppThunk =>
    async (dispatch) => {
      dispatch(setAppStatus('loading'))
      try {
        const response = await authAPI.login(data)
        if (response.resultCode === 0) {
          dispatch(setIsLoggedIn(true))
        }
      } catch (e) {
      } finally {
        dispatch(setAppStatus('succeeded'))

      }
    }
    export const initializeApp = (): AppThunk =>
    async (dispatch) => {
      try {
        const response = await authAPI.me()
        dispatch(setInitialized(true))
        if (response.resultCode === 0) {
          dispatch(setIsLoggedIn(true))
        }
      } catch (e) {
      }
    }
