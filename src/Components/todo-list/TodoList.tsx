import React, {ChangeEvent} from 'react';
import {FilterValueType} from '../app/App';
import s from './todoList.module.css'
import {AddItemForm} from '../add-item-form/AddItemForm';
import {EditableSpan} from '../editable-span/EditableSpan';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TodoListPropsType = {
  id: string
  title: string
  filter: FilterValueType
  tasks: Array<TaskType>
  changeTodoListNewTitle:(id:string,newTitle:string)=>void
  removeTodoList: (todoListID: string) => void
  remove: (id: string, todoListId: string) => void
  addTaskTodo: (value: string, todoListId: string) => void
  changeFilter: (value: FilterValueType, todoListId: string) => void
  changeTaskTitle:(id:string,newValue:string,todoListId:string)=>void
  toggleCheckbox: (value: string, isDone: boolean, tdoListId: string) => void
}
const TodoList = (props: TodoListPropsType) => {
  /*
  const [valueTodo, setValueTodo] = useState('')
  const [error, setError] = useState<string | null>(null)
*/
  const buttonValue = (event: any) => {
    props.changeFilter(event.currentTarget.textContent, props.id)
  }
  /*
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValueTodo(event.target.value)
    setError(null)
  }
  const onClickButtonAdd = () => {
    if (valueTodo.trim()) {
      props.addTaskTodo(valueTodo, props.id)
      setValueTodo('')
    } else {
      setError('Error write name!')
    }
  }
*/
  const changeTodoListNewTitle =(title:string)=>{
    props.changeTodoListNewTitle(props.id,title)
  }
  const addTask = (title: string): void => {
    props.addTaskTodo(title, props.id)
  }

  const tasks = props.tasks.map(t => {
    const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
      props.toggleCheckbox(t.id, e.currentTarget.checked, props.id)
    }
    const removeHandler = () => {
      props.remove(t.id, props.id)
    }

    const onChangeTitleHandler = (newValue: string): void => {
      props.changeTaskTitle(t.id,newValue,props.id)
    }

    return (
        <li key={t.id} className={t.isDone ? s.done : ''}>
          <input type="checkbox"
                 checked={t.isDone}
                 onChange={onChangeCheckbox}
          />
          {/*<span>{t.title}</span>*/}
          <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
          <button onClick={removeHandler}> Button</button>
        </li>
    )
  })
  return (
      <div>
        <h3><EditableSpan title={props.title} onChange={changeTodoListNewTitle}/>

          <button onClick={() => {
            props.removeTodoList(props.id)
          }}>x
          </button>
        </h3>
        <AddItemForm addItem={addTask}/>
        {/*<div>*/}
        {/*  <input onChange={onChangeHandler}*/}
        {/*         value={valueTodo}*/}
        {/*         className={error ? s.error : ''}*/}
        {/*         onBlur={() => {*/}
        {/*           setError(null)*/}
        {/*         }}*/}
        {/*  />*/}
        {/*  <button onClick={onClickButtonAdd}>+</button>*/}
        {/*  {error && <div className={s.message_error}>{error}</div>}*/}
        {/*</div>*/}
        <ul>          {tasks}        </ul>
        <button className={props.filter === 'all' ? s.active : ''} onClick={buttonValue}>all</button>
        <button className={props.filter === 'active' ? s.active : ''} onClick={buttonValue}>active</button>
        <button className={props.filter === 'completed' ? s.active : ''} onClick={buttonValue}>completed</button>
      </div>
  )
}
export default TodoList;

