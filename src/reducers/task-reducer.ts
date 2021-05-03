import {addTodolistAC, removeTodolistAC, setTodoListsAC} from './tl-reducer';
import {TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from '../api/api';
import {AppRootStateType, AppThunk} from '../state/store';
import {TasksStateType} from '../pages/dashboard/Dashboard';
import {setAppStatus} from './app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum ResultResponseCodes {
  success = 0,
  failed = 1,
  captcha = 10
}

export type TaskActionType =
    ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTodolistAC>
    // | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTaskAC>
    // | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof updateTaskAC>

const initialState: TasksStateType = {}

const slice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    removeTaskAC(state, action: PayloadAction<{ todolistId: string, id: string }>) {
      let todolistTask = state[action.payload.todolistId]
      const index = todolistTask.findIndex(tk => tk.id === action.payload.id)
      if (index !== -1) {
        debugger
        todolistTask.splice(index, 1)
        debugger
      }
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string, model: UpdateTaskModelType }>) {
      const todolistTask = state[action.payload.todolistId]
      const index = todolistTask.findIndex(tk => tk.id === action.payload.taskId)
      if (index !== -1) {
        todolistTask[index] = {...todolistTask[index], ...action.payload.model}
      }
    },
    setTaskAC(state, action: PayloadAction<{ tasks: TaskType[], todoId: string }>) {
      state[action.payload.todoId] = action.payload.tasks
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolistId] = []
    });
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.todolistId]
    });
    builder.addCase(setTodoListsAC, (state, action) => {
      action.payload.todoLists.forEach((tl) => {
        state[tl.id] = []
      })
    });
  }
  // extraReducers:{
  //   [addTodolistAC.type]:(state, action: PayloadAction<{}>)=>{},
  //   [removeTodolistAC.type]:(state, action: PayloadAction<{}>)=>{},
  //   [setTodoListsAC.type]:(state, action: PayloadAction<{}>)=>{},
  // }
})

export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, setTaskAC, updateTaskAC} = slice.actions


// export const tasksReducer = (state = initialState, action: TaskActionType): TasksStateType => {
//   switch (action.type) {
//     case ACTIONS_TYPE.SET_TASK: {
//       const copyState = {...state}
//       copyState[action.payload.todoId] = action.payload.task
//       return copyState
//     }
//     case ACTIONS_TYPE.REMOVE_TASK: {
//       const copyState = {...state}
//       const todolistTask = state[action.todolistId]
//       copyState[action.todolistId] = todolistTask.filter(t => t.id !== action.id)
//       return copyState
//     }
//     case ACTIONS_TYPE.ADD_TASK: {
//       const stateCopy = {...state}
//       const newTask = action.payload
//       const tasks = stateCopy[action.payload.todoListId];
//       const newTasks = [newTask, ...tasks];
//       stateCopy[action.payload.todoListId] = newTasks;
//       return stateCopy;
//     }
//     case ACTIONS_TYPE.CHANGE_STATUS_TASK: {
//       let todolistTasks = state[action.todolistId];
//
//       let newTasksArray: Array<TaskType> = todolistTasks
//           .map(t => t.id === action.taskId ? {...t, status: action.status} : t);
//
//       state[action.todolistId] = newTasksArray;
//       return ({...state});
//     }
//
//     case ACTIONS_TYPE.CHANGE_TITLE_TASK:
//       return {
//         ...state, [action.todolistId]: state[action.todolistId]
//             .map(el => el.id === action.id
//                 ? {...el, title: action.title}
//                 : {...el})
//
//       }
//     case ACTIONS_TYPE.ADD_TODOLIST: {
//       return {...state, [action.todolistId]: []}
//     }
//     case ACTIONS_TYPE.REMOVE_TODOLIST: {
//       const copyState = {...state}
//       delete copyState[action.id]
//       return copyState
//     }
//
//     default:
//       return state
//   }
// }
//
// export const removeTaskAC = (todolistId: string, id: string) => ({
//   type: ACTIONS_TYPE.REMOVE_TASK,
//   id,
//   todolistId
// }) as const
// export const addTaskAC = (task: TaskType) => ({
//   type: ACTIONS_TYPE.ADD_TASK, payload: task
// }) as const
// export const changeTaskStatusAC = (status: TaskStatuses, todolistId: string, taskId: string,) => ({
//   type: ACTIONS_TYPE.CHANGE_STATUS_TASK
//   , status, todolistId, taskId
// }) as const
// export const changeTaskTitleAC = (id: string, title: string, todolistId: string,) => ({
//   type: ACTIONS_TYPE.CHANGE_TITLE_TASK,
//   id,
//   title,
//   todolistId
// }) as const
// export const setTaskAC = (task: Array<TaskType>, todoId: string) => {
//   return {type: ACTIONS_TYPE.SET_TASK, payload: {task, todoId}} as const
// }
//

export const fetchTaskThunk = (todoId: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(setAppStatus({status: 'loading'}))
        const tasks = await todoListsAPI.getTasks(todoId)
        dispatch(setTaskAC({tasks: tasks.items, todoId}))
        dispatch(setAppStatus({status: 'succeeded'}))
      } catch (e) {
        handleServerNetworkError(e, dispatch)
      }
    }
export const setRemoveTask = (taskId: string, todoID: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(setAppStatus({status: 'loading'}))
        await todoListsAPI.deleteTask(todoID, taskId)
        dispatch(removeTaskAC({todolistId: todoID, id: taskId}))
      } catch (e) {
        handleServerNetworkError(e, dispatch)
      } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
      }
    }
export const setTask = (todoID: string, title: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(setAppStatus({status: 'loading'}))
        const task = await todoListsAPI.createTask(todoID, title)
        if (task.resultCode === ResultResponseCodes.success) {
          dispatch(addTaskAC(({task: task.data.item})))
        } else {
          handleServerAppError(task, dispatch);
        }
      } catch (error) {
        handleServerNetworkError(error, dispatch)
      } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
      }
    }
export const updateTask = (taskId: string, todoListId: string, domainModel: UpdateTaskModelType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
      const state = getState()
      const allAppTasks = state.tasks
      const forCurrentTodoID = allAppTasks[todoListId]
      const currentTask = forCurrentTodoID.find((t) => t.id === taskId)
      if (currentTask) {
        const model: UpdateTaskModelType = {
          title: currentTask.title,
          description: currentTask.description,
          status: currentTask.status,
          priority: currentTask.priority,
          startDate: currentTask.startDate,
          deadline: currentTask.deadline,
          ...domainModel
        }
        try {
          dispatch(setAppStatus({status: 'loading'}))
          const response = await todoListsAPI.updateTask(todoListId, taskId, model)
          if (response.resultCode === 0) {
            dispatch(updateTaskAC({model: model, todolistId: todoListId, taskId}))
            dispatch(setAppStatus({status: 'succeeded'}))
          } else {
            handleServerAppError(response, dispatch);
          }
        } catch (e) {
          handleServerNetworkError(e, dispatch)
        }
      }
    }
