import {combineReducers} from 'redux';
import {TaskActionType, tasksReducer} from '../reducers/task-reducer';
import {TodoListActionType, todoListReducer} from '../reducers/tl-reducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {AppActionType, appReducer} from '../reducers/app-reducer';
import {AuthActionType, authReducer} from '../reducers/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListReducer,
  app:appReducer,
  auth:authReducer,
})
// непосредственно создаём store
export const store = configureStore({// подключаем редакс тул кид и дев тулз
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})
// export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// экшен для типизации санки сборка из всех экшенов из редюсоров
type ActionType = TodoListActionType | TaskActionType | AppActionType | AuthActionType
//типизация санок
export type AppThunk = ThunkAction<void, AppRootStateType, unknown, ActionType>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
// @ts-ignore
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// export const store = createStore(rootReducer, composeEnhancers((applyMiddleware(thunk))))

