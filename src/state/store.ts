import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TaskActionType, tasksReducer} from '../reducers/task-reducer';
import {TodoListActionType, todoListReducer} from '../reducers/tl-reducer';
import thunk, {ThunkAction} from 'redux-thunk';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// экшен для типизации санки сборка из всех экшенов из редюсоров
type ActionType = TodoListActionType | TaskActionType
//типизация санок
export type AppThunk = ThunkAction<void, AppRootStateType, unknown, ActionType>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

