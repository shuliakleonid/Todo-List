import {TasksStateType} from '../Components/app/App';
import {
  ADD_TASK,
  ADD_TODOLIST,
  CHANGE_STATUS_TASK,
  CHANGE_TITLE_TASK,
  REMOVE_TASK,
  REMOVE_TODOLIST
} from '../constants';
import {v1} from 'uuid';
import {addTodolistAC, removeTodolistAC} from './tl-reducer';

export type ActionType =
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof changeTaskStatusAC>


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
    case CHANGE_STATUS_TASK:
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
    case CHANGE_TITLE_TASK:
      return {
        ...state, [action.todolistId]: state[action.todolistId]
            .map(el => el.id === action.id
                ? {...el, title: action.title}
                : {...el})

    }
    case ADD_TODOLIST:{
     return {...state, [action.todolistId]:[]}
    }
    case REMOVE_TODOLIST: {
    const copyState= {...state}
    delete copyState[action.id]
      return copyState
    }
    default:
      throw new Error('I don\'t understand this type')
  }
}

// создаем экшен криэйтор

export const removeTaskAC = (id: string, todolistId: string,) => ({type: REMOVE_TASK, id, todolistId}) as const
export const addTaskAC = (title: string, todolistId: string,) => ({type: ADD_TASK, title, todolistId:v1()}) as const
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
