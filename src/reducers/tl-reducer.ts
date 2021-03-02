import {FilterValueType, TodoListType} from '../Components/app/App';
import {ADD_TODOLIST, CHANGE_FILTER_TODOLIST, CHANGE_TITLE_TODOLIST, REMOVE_TODOLIST} from '../constants';
import {v1} from 'uuid';

// type RemoveTodoListActionType = {
//   type: 'REMOVE_TODOLIST'
//   id: string
// }
//
// type AddTodoListActionType = {
//   type: 'ADD_TODOLIST'
//   title: string
// }
//
// type ChangeTodoListFilterActionType = {
//   type: 'CHANGE_FILTER_TODOLIST'
//   id: string
//   filter: FilterValueType
// }
//
// type ChangeTodoListTitleActionType = {
//   type: 'CHANGE_TITLE_TODOLIST'
//   id: string
//   title: string
// }

export type ActionType =
    ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeFilterTodolistAC> |
    ReturnType<typeof changeTitleTodolistAC>


export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {
  switch (action.type) {
    case ADD_TODOLIST:
      const todoList: TodoListType = {id: v1(), filter: 'all', title: action.title}
      return ([...state, todoList]);
    case REMOVE_TODOLIST:
      return state.filter((item) => item.id !== action.id)
    case CHANGE_FILTER_TODOLIST:
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case CHANGE_TITLE_TODOLIST:
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    default:
      throw new Error('I don\'t understand this type')
  }
}


// создаем экшен криэйтор

export const removeTodolistAC = (todolistId: string) => ({type: REMOVE_TODOLIST, id: todolistId}) as const
export const addTodolistAC = (title: string) => ({type: ADD_TODOLIST,  title}) as const
export const changeFilterTodolistAC = (todolistId: string, filter: FilterValueType) => ({
  type: CHANGE_FILTER_TODOLIST,
  id: todolistId,
  filter
}) as const
export const changeTitleTodolistAC = (todolistId: string, title: string) => ({
  type: CHANGE_TITLE_TODOLIST,
  id: todolistId,
  title
}) as const
