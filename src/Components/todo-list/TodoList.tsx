import React, {useCallback} from 'react';
import {FilterValueType} from '../app/App';
import {AddItemForm} from '../add-item-form/AddItemForm';
import {EditableSpan} from '../editable-span/EditableSpan';
import {Button, IconButton, List, Paper} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';
import {v1} from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TodoListPropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValueType
  removeTodoList: (todoListID: string) => void
  addTaskTodo: (value: string, todoListId: string) => void
  changeTodoListNewTitle: (id: string, newTitle: string) => void
  changeFilter: (value: FilterValueType, todoListId: string) => void
  toggleCheckbox: (value: string, isDone: boolean, tdoListId: string) => void
  remove: (id: string, todoListId: string) => void
  changeTaskTitle: (id: string, newValue: string, todoListId: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {

//   const todoList = useSelector<AppRootStateType,TodoListType>(state=>state.todolists.filter(todo=>todo.id===props.id)[0])
// const tasksSelect = useSelector<AppRootStateType,Array<TaskType>>(state => state.tasks[props.id])
//
//   const dispatch = useDispatch()
  const allTodolistTasks = props.tasks
  let tasksForTodoList = allTodolistTasks
  if (props.filter === 'active') {
    tasksForTodoList = allTodolistTasks.filter(t => !t.isDone)
  }
  if (props.filter === 'completed') {
    tasksForTodoList = allTodolistTasks.filter(t => t.isDone)
  }

  const buttonValue = useCallback((event: any) => {
    props.changeFilter(event.currentTarget.textContent, props.id)
  }, [props])

  const changeTodoListNewTitle = useCallback((title: string) => {
    props.changeTodoListNewTitle(props.id, title)
  }, [props])

  const addTask = useCallback((title: string): void => {
    props.addTaskTodo(title, props.id)
  }, [props])

  const tasks = tasksForTodoList.map(task => <Task
      key={v1()}
      task={task}
      remove={props.remove}
      todoListId={props.id}
      toggleCheckbox={props.toggleCheckbox}
      changeTaskTitle={props.changeTaskTitle}
  />)
  return (
      <Paper>
        <List>
          <h3>
            <EditableSpan title={props.title} onChange={changeTodoListNewTitle}/>
            <IconButton onClick={() => {
              props.removeTodoList(props.id)
            }}><Delete/></IconButton>
          </h3>
          <AddItemForm addItem={addTask}/>
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

