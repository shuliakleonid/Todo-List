import React, {ChangeEvent} from 'react';
import {FilterValueType} from '../app/App';
import s from './todoList.module.css'
import {AddItemForm} from '../add-item-form/AddItemForm';
import {EditableSpan} from '../editable-span/EditableSpan';
import {Button, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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
  changeTodoListNewTitle: (id: string, newTitle: string) => void
  removeTodoList: (todoListID: string) => void
  remove: (id: string, todoListId: string) => void
  addTaskTodo: (value: string, todoListId: string) => void
  changeFilter: (value: FilterValueType, todoListId: string) => void
  changeTaskTitle: (id: string, newValue: string, todoListId: string) => void
  toggleCheckbox: (value: string, isDone: boolean, tdoListId: string) => void
}
const TodoList = (props: TodoListPropsType) => {

  const buttonValue = (event: any) => {
    props.changeFilter(event.currentTarget.textContent, props.id)
  }
  const changeTodoListNewTitle = (title: string) => {
    props.changeTodoListNewTitle(props.id, title)
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
      props.changeTaskTitle(t.id, newValue, props.id)
    }

    return (
        <ListItem key={t.id} className={t.isDone ? s.done : ''}>
          <ListItemIcon>
            <Checkbox color={'primary'}
                      checked={t.isDone}
                      onChange={onChangeCheckbox}/>

          </ListItemIcon>
          <ListItemText><EditableSpan title={t.title} onChange={onChangeTitleHandler}/></ListItemText>
          <IconButton onClick={removeHandler}><Delete/></IconButton>
        </ListItem>
    )
  })
  return (
      <Paper>
        <List>
          <h3><EditableSpan title={props.title} onChange={changeTodoListNewTitle}/>
            <IconButton onClick={() => {
              props.removeTodoList(props.id)
            }}><Delete/></IconButton>
          </h3>
          <AddItemForm addItem={addTask}/>
          <ul>          {tasks}        </ul>
          <Button variant="contained"
                  color={props.filter === 'all' ? 'secondary' : 'primary'}
                  onClick={buttonValue}>all</Button>
          <Button variant="contained"
                  color={props.filter === 'active' ? 'secondary' : 'primary'}
                  onClick={buttonValue}>active</Button>
          <Button variant="contained"
                  color={props.filter === 'completed' ? 'secondary' : 'primary'}
                  onClick={buttonValue}>completed</Button>
        </List> </Paper>
  )
}
export default TodoList;


