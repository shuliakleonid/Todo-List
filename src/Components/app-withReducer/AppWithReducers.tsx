import React, {useCallback} from 'react';
import TodoList, {TaskType} from '../todo-list/TodoList';
import {AddItemForm} from '../add-item-form/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
  addTodolistAC,
  changeFilterTodolistAC,
  changeTitleTodolistAC,
  removeTodolistAC
} from '../../reducers/tl-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../reducers/task-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}


export const AppWithReducers = () => {
  //BLL
  // const todoListID1 = v1() // original id
  // const todoListID2 = v1()


  const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const dispatch = useDispatch()


  const changeTodoListNewTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTitleTodolistAC(todolistId, title))
  }, [dispatch])
  const addTaskTodo = useCallback((value: string, todoListId: string): void => {
    dispatch(addTaskAC(value, todoListId))
  }, [dispatch])
  const changeCheckbox = useCallback((id: string, isDone: boolean, todoListId: string): void => {
    dispatch(changeTaskStatusAC(id, isDone, todoListId))
  }, [dispatch])
  const changeTaskTitle = useCallback((id: string, newTitle: string, todoListId: string): void => {
    dispatch(changeTaskTitleAC(id, todoListId, newTitle))
  }, [dispatch])
  const removeTask = useCallback((id: string, todoListId: string) => {
    dispatch(removeTaskAC(id, todoListId))
  }, [dispatch])
  const changeFilter = useCallback((newFilterValue: FilterValueType, todoListId: string) => {
    dispatch(changeFilterTodolistAC(todoListId, newFilterValue))
  }, [dispatch])
  const removeTodoList = useCallback((todoListID: string) => {
    let action = removeTodolistAC(todoListID)
    dispatch(action)
  }, [dispatch])
  const addTodoList = useCallback((title: string) => {
    let action = addTodolistAC(title)
    dispatch(action)
  }, [dispatch])


  return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu/>
            </IconButton>
            <Typography variant="h3">
              Todo
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Container fixed>

          <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodoList}/>
          </Grid>
          <Grid container spacing={10}>
            {
              todoLists.map((t) => {
                let tasksForTodoList = tasks[t.id]

                return (
                    <Grid item key={t.id}>
                      <Paper>
                        <TodoList
                            id={t.id}
                            title={t.title}
                            filter={t.filter}
                            remove={removeTask}
                            tasks={tasksForTodoList}
                            addTaskTodo={addTaskTodo}
                            changeFilter={changeFilter}
                            toggleCheckbox={changeCheckbox}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListNewTitle={changeTodoListNewTitle}
                        />
                      </Paper>
                    </Grid>
                )
              })
            }
          </Grid>
        </Container>

      </div>
  )
}


