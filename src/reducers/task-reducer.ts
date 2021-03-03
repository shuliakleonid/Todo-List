import {TasksStateType} from '../Components/app/App';
import {ADD_TASK, ADD_TODO_LIST, CHANGE_STATUS_TASK, CHANGE_TITLE_TASK, REMOVE_TASK} from '../constants';
import {v1} from 'uuid';

export type ActionType =
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof AddTodolistAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof changeTaskStatusAC>

const TodoListId = v1()
export const tasksReducer = (state: TasksStateType, action: ActionType) => {
  switch (action.type) {
    case REMOVE_TASK: {
      const copyState = {...state}
      const todolistTask = state[action.todolistId]
      copyState[action.todolistId] = todolistTask.filter(t => t.id !== action.id)
      return copyState
    }
    case ADD_TASK: {
      const copyState = {...state}
      const task = {id: action.todolistId, title: action.title, isDone: false,}
      const todolistTask = state[action.todolistId]
      copyState[action.todolistId] = [task, ...todolistTask]
      return copyState
    }
    case CHANGE_STATUS_TASK: {
      const copyState = {...state}
      const todolistTask = copyState[action.todolistId]
      // найдем нужную таску
      let task = todolistTask.find(t => t.id === action.id)
      if (task) {
        task.isDone = action.isDone
        //засетаем в стейт копию объекта , чтобы react отреагировал перерисовкой
      }
      return {
        ...state, [action.todolistId]: state[action.todolistId]
            .map(el => el.id === action.id
                ? {...el, isDone: action.isDone}
                : {...el})
      }
    }
    case CHANGE_TITLE_TASK: {
      const copyState = {...state}
      const todolistTask = copyState[action.todolistId]
      let task = todolistTask.find(t => t.id === action.id)
      if (task) {
        task.title = action.title
      }
      return {
        ...state, [action.todolistId]: state[action.todolistId]
            .map(el => el.id === action.id
                ? {...el, title: action.title}
                : {...el})
      }
    }
    case ADD_TODO_LIST:{
     return {...state, [action.todoLIstId]:[]}
    }
    default:
      throw new Error('I don\'t understand this type')
  }
}

// создаем экшен криэйтор

export const removeTaskAC = (id: string, todolistId: string,) => ({type: REMOVE_TASK, id, todolistId}) as const
export const addTaskAC = (title: string, todolistId: string,) => ({type: ADD_TASK, title, todolistId}) as const
export const AddTodolistAC = (title: string, ) => ({type: ADD_TODO_LIST, title,todoLIstId:v1()}) as const
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string,) => ({
  type: CHANGE_STATUS_TASK,
  id,
  isDone,
  todolistId
}) as const
export const changeTaskTitleAC = (id: string, title: string, todolistId: string,) => ({
  type: CHANGE_TITLE_TASK,
  id,
  title,
  todolistId
}) as const
