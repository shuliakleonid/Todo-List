import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import s from './todoList.module.css';
import {EditableSpan} from '../editable-span/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from '../../api/api';

export type TaskPropsType = {
  disabled: boolean
  task: TaskType
  todoListId: string
  removeTask: (id: string, todoListId: string) => void
  changeTaskTitle: (id: string, newValue: string, todoListId: string) => void
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
  console.log(props,'Task')
  const onChangeCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked
    props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId)
  }, [props]);

  const onChangeTitleHandler = useCallback((newValue: string) => {
    props.changeTaskTitle(props.task.id, newValue, props.todoListId)
  }, [props]);

  return (
      <ListItem key={props.task.id} className={props.task.status === TaskStatuses.Completed ? s.done : ''}>
        <ListItemIcon>
          <Checkbox color={'primary'}
                    checked={props.task.status === TaskStatuses.Completed}
                    onChange={onChangeCheckbox}/>
        </ListItemIcon>
        <ListItemText>
          <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        </ListItemText>
        <IconButton onClick={() => props.removeTask(props.task.id, props.todoListId)} disabled={props.disabled}>
          <Delete/>
        </IconButton>
      </ListItem>
  )
})
