import React from 'react';
import {FilterValueType} from '../app/App';

export type TaskTypeProps = {
  id: number
  title: string
  isDone: boolean
}
type TodoListPropsType = {
  title: string
  tasks: Array<TaskTypeProps>
  remove: (id: number) => void
  changeFilter: (value: FilterValueType) => void
}

export function TodoList(props: TodoListPropsType) {

  const buttonValue = (event:any) =>{
    props.changeFilter(event.target.textContent)
  }

  const tasks = props.tasks.map(t => {
    const remove = () => {props.remove(t.id)}
    return(
        <li key={t.id}>
          <input type="checkbox" checked={t.isDone}/>
          <span>{t.title}</span>
          <button onClick={remove} > Button </button>
        </li>
    )
  })

  return (
      <div>
        <h3>{props.title}</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        <ul>
          {tasks}
          {/*{*/}
          {/*  props.tasks.map(item => <li key={item.id}>*/}
          {/*    <input type="checkbox" checked={item.isDone}/>*/}
          {/*    <span>{item.title}</span>*/}
          {/*    <button onClick={() => {*/}
          {/*      props.remove(item.id)*/}
          {/*    }}*/}
          {/*    >button*/}
          {/*    </button>*/}
          {/*  </li>)*/}
          {/*}*/}
        </ul>
       <button onClick={ buttonValue }>all</button>
       <button onClick={ buttonValue }>active</button>
       <button onClick={ buttonValue } >completed</button>
      </div>
  )
}
