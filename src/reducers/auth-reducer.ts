import {AppThunk} from '../state/store';
import {authAPI, LoginDataType} from '../api/tl-api';
import {setAppStatus} from './app-reducer';
import {handleServerNetworkError} from '../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AuthActionType =
    ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setInitialized>

const initialState = {
  isLoggedIn: false,
  isInitialized: false
};

// Redux Tool Kid
const slice = createSlice({// создаем слайс и пишем в нем параметры
  name: 'name',
  initialState: initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
    setInitialized(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value
    }
  }
})
export const authReducer = slice.reducer;
export const {setIsLoggedIn, setInitialized} = slice.actions

export type AuthStateType = typeof initialState
// export const authReducer = (state: AuthStateType = initialState, action: AuthActionType): AuthStateType => {
//   switch (action.type) {
//     case ACTIONS_TYPE.SET_IS_LOGGED_IN:
//       return {...state, isLoggedIn: action.value}
//     case ACTIONS_TYPE.SET_IS_INITIALIZED:
//       return {...state, isInitialized: action.value}
//     default:
//       return {...state}
//   }
// }
// export const setIsLoggedIn = (value: boolean) => ({type: ACTIONS_TYPE.SET_IS_LOGGED_IN, value}) as const
// export const setInitialized = (value: boolean) => ({type: ACTIONS_TYPE.SET_IS_INITIALIZED, value}) as const
export const login = (data: LoginDataType): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(setAppStatus({status: 'loading'}))
        const response = await authAPI.login(data)
        if (response.resultCode === 0) {
          dispatch(setIsLoggedIn({value: true}))
        }
      } catch (e) {
      } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
      }
    }
export const initializeApp = (): AppThunk =>
    async (dispatch) => {
      try {
        const response = await authAPI.me()
        if (response.resultCode === 0) {
          dispatch(setIsLoggedIn({value: true}))
        }
      } catch (e) {
        handleServerNetworkError(e, dispatch)
      } finally {
        dispatch(setInitialized({value: true}))
      }
    }
export const logOut = (): AppThunk =>
    async (dispatch) => {
      try {
        debugger
        const response = await authAPI.logOut()
        if (response.resultCode === 0) {
          dispatch(setIsLoggedIn({value: false}))
        }
      } catch (e) {
        handleServerNetworkError(e, dispatch)
      }
    }


