import React, {useCallback} from 'react';
import {AddItemForm} from '../add-item-form/AddItemForm';
import {EditableSpan} from '../editable-span/EditableSpan';
import {Button, IconButton, List, Paper} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';
import {v1} from 'uuid';
import {TaskStatuses, TaskType} from '../../api/api';
import {useDispatch} from 'react-redux';
import {FilterValuesType, setRemoveTodoList, updateTodoList} from '../../reducers/tl-reducer';
import {setTask} from '../../reducers/task-reducer';
import {RequestStatusType} from '../../reducers/app-reducer';

type TodoListPropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  enentityStatus: RequestStatusType
  remove: (id: string, todoListId: string) => void
  addTask: (value: string, todoListId: string) => void
  changeTodoListNewTitle: (id: string, newTitle: string) => void
  changeFilter: (value: FilterValuesType, todoListId: string) => void
  changeTaskTitle: (id: string, newValue: string, todoListId: string) => void
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {
  const dispatch = useDispatch()
  let tasksForTodoList = props.tasks
  if (props.filter === 'active') {
    tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
  }
  if (props.filter === 'completed') {
    tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
  }
  const buttonValue = useCallback((event: any) => {
    props.changeFilter(event.currentTarget.textContent, props.id)
  }, [props])
  const changeTodoListNewTitle = useCallback((title: string) => {
    dispatch(updateTodoList(props.id, title))
  }, [props.id, dispatch])
  const addTask = useCallback((title: string) => {
    dispatch(setTask(props.id, title))
  }, [props.id, dispatch])
  const removeTodolist = () => {
    dispatch(setRemoveTodoList(props.id))
  }
  const tasks = tasksForTodoList.map(task => <Task
      disabled={props.enentityStatus === 'loading'}
      key={v1()}
      task={task}
      todoListId={props.id}
      changeTaskStatus={props.changeTaskStatus}
      changeTaskTitle={props.changeTaskTitle}
  />)
  return (
      <Paper>
        <List>
          <h3>
            <EditableSpan title={props.title} onChange={changeTodoListNewTitle}/>
            <IconButton
                onClick={removeTodolist}
                disabled={props.enentityStatus === 'loading'}>
              <Delete/>
            </IconButton>
          </h3>
          <AddItemForm addItem={addTask} disabled={props.enentityStatus === 'loading'}/>
          <ul>
            {tasks}
          </ul>
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
})
export default TodoList;

