import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import s from './todoList.module.css';
import {EditableSpan} from '../editable-span/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './TodoList';

type TaskPropsType = {
  toggleCheckbox: (value: string, isDone: boolean, tdoListId: string) => void
  remove: (id: string, todoListId: string) => void
  changeTaskTitle: (id: string, newValue: string, todoListId: string) => void
  task: TaskType
  todoListId: string
}
export const Task = React.memo((props: TaskPropsType) => {
  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    props.toggleCheckbox(props.task.id, e.currentTarget.checked, props.todoListId)
  }

  const removeHandler = () => {
    props.remove(props.task.id, props.todoListId)
  }

  const onChangeTitleHandler = useCallback((newValue: string): void => {
    props.changeTaskTitle(props.task.id, newValue, props.todoListId)
  },[props])

  return (
      <ListItem key={props.task.id} className={props.task.isDone ? s.done : ''}>
        <ListItemIcon>
          <Checkbox color={'primary'}
                    checked={props.task.isDone}
                    onChange={onChangeCheckbox}/>

        </ListItemIcon>
        <ListItemText>
          <EditableSpan
              title={props.task.title}
              onChange={onChangeTitleHandler}/>
        </ListItemText>
        <IconButton onClick={removeHandler}>
          <Delete/>
        </IconButton>
      </ListItem>
  )
})
