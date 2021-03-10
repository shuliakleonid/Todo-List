import {FilterValueType, TodoListType} from '../Components/app/App';
import {v1} from 'uuid';
import {ACTIONS_TYPE} from '../constants';

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


export const todoListReducer = (state: Array<TodoListType>, action: ActionType):Array<TodoListType> => {
  switch (action.type) {
    case ACTIONS_TYPE.ADD_TODOLIST:
      const todoList: TodoListType = {id: action.todolistId, filter: 'all', title: action.title}
      return ([...state, todoList]);
    case ACTIONS_TYPE.REMOVE_TODOLIST:
      return state.filter((item) => item.id !== action.id)
    case ACTIONS_TYPE.CHANGE_FILTER_TODOLIST:
      return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
    case ACTIONS_TYPE.CHANGE_TITLE_TODOLIST:
      return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
    default:
      throw new Error('I don\'t understand this type')
  }
}


// создаем экшен криэйтор

export const removeTodolistAC = (todolistId: string) => ({type: ACTIONS_TYPE.REMOVE_TODOLIST, id: todolistId}) as const
export const addTodolistAC = (title: string) => ({type:ACTIONS_TYPE.ADD_TODOLIST,  title, todolistId:v1()}) as const
export const changeFilterTodolistAC = (todolistId: string, filter: FilterValueType) => ({
  type: ACTIONS_TYPE.CHANGE_FILTER_TODOLIST,
  todolistId,
  filter
}) as const
export const changeTitleTodolistAC = (todolistId: string, title: string) => ({
  type: ACTIONS_TYPE.CHANGE_TITLE_TODOLIST,
  todolistId,
  title
}) as const
