import {addTodolistAC, removeTodolistAC, setTodoListsAC} from './tl-reducer';
import {ACTIONS_TYPE} from '../constants';
import {TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from '../api/api';
import {AppRootStateType, AppThunk} from '../state/store';
import {TasksStateType} from '../pages/dashboard/Dashboard';
import {setAppStatus, setError} from './app-reducer';

export enum ResultResponseCodes {
  success = 0,
  failed = 1,
  captcha = 10
}

export type TaskActionType =
    ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof setTodoListsAC>

const initialState: TasksStateType = {}
export const tasksReducer = (state = initialState, action: TaskActionType): TasksStateType => {
  switch (action.type) {
    case ACTIONS_TYPE.SET_TASK: {
      const copyState = {...state}
      copyState[action.payload.todoId] = action.payload.task
      return copyState
    }
    case ACTIONS_TYPE.SET_TODOS: {
      const stateCopy = {...state}
      action.payload.forEach((tl) => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case ACTIONS_TYPE.REMOVE_TASK: {
      const copyState = {...state}
      const todolistTask = state[action.todolistId]
      copyState[action.todolistId] = todolistTask.filter(t => t.id !== action.id)
      return copyState
    }
    case ACTIONS_TYPE.ADD_TASK: {
      const stateCopy = {...state}
      const newTask = action.payload
      const tasks = stateCopy[action.payload.todoListId];
      const newTasks = [newTask, ...tasks];
      stateCopy[action.payload.todoListId] = newTasks;
      return stateCopy;
    }
    case ACTIONS_TYPE.CHANGE_STATUS_TASK: {
      let todolistTasks = state[action.todolistId];

      let newTasksArray: Array<TaskType> = todolistTasks
          .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

      state[action.todolistId] = newTasksArray;
      return ({...state});
    }

    case ACTIONS_TYPE.CHANGE_TITLE_TASK:
      return {
        ...state, [action.todolistId]: state[action.todolistId]
            .map(el => el.id === action.id
                ? {...el, title: action.title}
                : {...el})

      }
    case ACTIONS_TYPE.ADD_TODOLIST: {
      return {...state, [action.todolistId]: []}
    }
    case ACTIONS_TYPE.REMOVE_TODOLIST: {
      const copyState = {...state}
      delete copyState[action.id]
      return copyState
    }

    default:
      return state
  }
}

export const removeTaskAC = (todolistId: string, id: string) => ({
  type: ACTIONS_TYPE.REMOVE_TASK,
  id,
  todolistId
}) as const
export const addTaskAC = (task: TaskType) => ({
  type: ACTIONS_TYPE.ADD_TASK, payload: task
}) as const
export const changeTaskStatusAC = (status: TaskStatuses, todolistId: string, taskId: string,) => ({
  type: ACTIONS_TYPE.CHANGE_STATUS_TASK
  , status, todolistId, taskId
}) as const
export const changeTaskTitleAC = (id: string, title: string, todolistId: string,) => ({
  type: ACTIONS_TYPE.CHANGE_TITLE_TASK,
  id,
  title,
  todolistId
}) as const
export const setTaskAC = (task: Array<TaskType>, todoId: string) => {
  return {type: ACTIONS_TYPE.SET_TASK, payload: {task, todoId}} as const
}


export const fetchTaskThunk = (todoId: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(setAppStatus('loading'))
        const tasks = await todoListsAPI.getTasks(todoId)
        dispatch(setTaskAC(tasks.items, todoId))
        dispatch(setAppStatus('succeeded'))

      } catch (e) {
        console.warn(e)
      }
    }
export const setRemoveTask = (todoID: string, taskId: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(setAppStatus('loading'))
        await todoListsAPI.deleteTask(todoID, taskId)
        dispatch(removeTaskAC(todoID, taskId))
        dispatch(setAppStatus('succeeded'))

      } catch (e) {
        console.warn(e)
      }
    }
export const setTask = (todoID: string, title: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(setAppStatus('loading'))
        const task = await todoListsAPI.createTask(todoID, title)
        debugger
        if (task.resultCode === ResultResponseCodes.success) {
          dispatch(addTaskAC((task.data.item)))
          // dispatch(setAppStatus('succeeded'))
        } else {
          if (task.messages.length) {
            dispatch(setError(task.messages[0]))
          } else {
            dispatch(setError('Some error occurred'))
          }
        }
      } catch (err) {
        dispatch(setError(err.message))
        // console.warn(e)
      } finally {
        dispatch(setAppStatus('succeeded'))
      }
    }
export const updateStatusTask = (todoID: string, taskId: string, status: TaskStatuses): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
      const state = getState()
      const allAppTasks = state.tasks
      const forCurrentTodoID = allAppTasks[todoID]
      const currentTask = forCurrentTodoID.find((t) => t.id === taskId)

      if (currentTask) {
        const model: UpdateTaskModelType = {
          title: currentTask.title,
          description: currentTask.description,
          status: status,
          priority: currentTask.priority,
          startDate: currentTask.startDate,
          deadline: currentTask.deadline,
        }
        try {
          dispatch(setAppStatus('loading'))
          await todoListsAPI.updateTask(todoID, taskId, model)
          dispatch(changeTaskStatusAC(status, todoID, taskId))
          dispatch(setAppStatus('succeeded'))

        } catch (e) {
          console.warn(e)
        }
      }
    }
