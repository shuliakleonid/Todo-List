import React, {ChangeEvent, useState} from 'react';
import {FilterValueType} from '../app/App';
import s from './todoList.module.css'

export type TaskTypeProps = {
  id: string
  title: string
  isDone: boolean
}
type TodoListPropsType = {
  title: string
  filter: FilterValueType
  tasks: Array<TaskTypeProps>
  remove: (id: string) => void
  addTaskTodo: (value: string) => void
  changeFilter: (value: FilterValueType) => void
  toggleCheckbox: (value: string, isDone: boolean) => void
}
const TodoList = (props: TodoListPropsType) => {
  const [valueTodo, setValueTodo] = useState('')
  const [error, setError] = useState<string | null>(null)
  const buttonValue = (event: any) => {
    props.changeFilter(event.currentTarget.textContent)
  }
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValueTodo(event.target.value)
    setError(null)
  }
  const onClickButtonAdd = () => {
    if (valueTodo.trim()) {
      props.addTaskTodo(valueTodo)
      setValueTodo('')
    } else {
      setError('Error write name!')
    }
  }

  const tasks = props.tasks.map(t => {
    const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
      props.toggleCheckbox(t.id, e.currentTarget.checked)
    }
    const removeHandler = () => {
      props.remove(t.id)
    }
    return (
        <li key={t.id} className={t.isDone ? s.done : ''}>
          <input type="checkbox"
                 checked={t.isDone}
                 onChange={onChangeCheckbox}
          />
          <span>{t.title}</span>
          <button onClick={removeHandler}> Button</button>
        </li>
    )
  })
  return (
      <div>
        <h3>{props.title}</h3>
        <div>
          <input onChange={onChangeHandler}
                 value={valueTodo}
                 className={error ? s.error : ''}
                 onBlur={() => {
                   setError(null)
                 }}
          />
          <button onClick={onClickButtonAdd}>+</button>
          {error && <div className={s.message_error}>{error}</div>}
        </div>
        <ul>          {tasks}        </ul>
        <button className={props.filter === 'all' ? s.active : ''} onClick={buttonValue}>all</button>
        <button className={props.filter === 'active' ? s.active : ''} onClick={buttonValue}>active</button>
        <button className={props.filter === 'completed' ? s.active : ''} onClick={buttonValue}>completed</button>
      </div>
  )
}
export default TodoList;
