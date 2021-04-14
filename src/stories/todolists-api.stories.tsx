import React, {useEffect, useState} from 'react'
import {TaskPriorities, TaskStatuses, todoListsAPI, UpdateTaskModelType} from '../api/api';

export default {
  title: 'API'
}

export const GetTodoLists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todoListsAPI.getTodoLists().then(res => setState(res))
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке

  }, [])

  return (
      <pre>{ JSON.stringify( state, null, 2 ) }</pre>
  )

}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const title = 'TodoList'
    todoListsAPI.createTodoLists(title).then(res => setState(res))
  }, [])

  return (
      <pre>{ JSON.stringify( state, null, 2 ) }</pre>
  )
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todoID, setTodoID] = useState<string>('')
  const deleteTodo = () => {
    todoListsAPI.deleteTodoLists(todoID).then(res => setState(res))
  }

  return <div>
    <pre>{ JSON.stringify( state, null, 2 ) }</pre>
    <input type="text" placeholder={'Todo List ID'} value={todoID} onChange={(e) => setTodoID(e.currentTarget.value)}/>
    <button onClick={deleteTodo}>Delete Todo List</button>
  </div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todoID = 'e09191ae-4e3f-4735-a26b-7570de10b134'
    const title = 'New TodoList 1232434'
    todoListsAPI.updateTodoLists(todoID, title).then(res => setState(res))
  }, [])

  return <pre>{ JSON.stringify( state, null, 2 ) }</pre>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todoID = 'e09191ae-4e3f-4735-a26b-7570de10b134'
    todoListsAPI.getTasks(todoID).then(res => setState(res))
  }, [])

  return <pre>{ JSON.stringify( state, null, 2 ) }</pre>
}
export const CreateTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todoID,setTodoID] = useState<string>('')
  const [task,setTask] = useState<string>('')
 const createTask=() => {

   todoListsAPI.createTask(todoID, task).then(res => setState(res))
  }

  return <div>
    <pre>{ JSON.stringify( state, null, 2 ) }</pre>
    <input type="text" placeholder={'Todo List ID'} value={todoID} onChange={(e) => setTodoID(e.currentTarget.value)}/>
    <input type="text" placeholder={'Task ID'} value={task} onChange={(e) => setTask(e.currentTarget.value)}/>
    <button onClick={createTask}>Delete Todo List</button>
  </div>
}
export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todoID = 'e09191ae-4e3f-4735-a26b-7570de10b134'
    const taskId = '34693ddf-0d8b-4e07-a7b0-11aee5971cfb'
    todoListsAPI.deleteTask(todoID, taskId).then(res => setState(res))
  }, [])

  return <pre>{ JSON.stringify( state, null, 2 ) }</pre>
}
export const UpdateTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todoID = 'e09191ae-4e3f-4735-a26b-7570de10b134'
    const taskId = '34693ddf-0d8b-4e07-a7b0-11aee5971cfb'
    // const title = 'New dffdsfdsfdsfsdfdsfdfdfdsfdfdsfdsfdsf '
    const model: UpdateTaskModelType = {
      description: '',
      title: '',
      status: TaskStatuses.New,
      priority: TaskPriorities.Hi,
      startDate: '',
      deadline: '',
    }
    todoListsAPI.updateTask(todoID, taskId, model).then(res => setState(res))
  }, [])

  return <pre>{ JSON.stringify( state, null, 2 ) }</pre>
}
