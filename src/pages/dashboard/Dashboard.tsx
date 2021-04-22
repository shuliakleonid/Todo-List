import React, {useCallback, useEffect} from 'react';
import TodoList from '../../Components/todo-list/TodoList';
import {AddItemForm} from '../../Components/add-item-form/AddItemForm';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Toolbar,
  Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
  addTodoList,
  changeFilterTodolistAC,
  changeTitleTodolistAC,
  fetchTodoListsThunk,
  FilterValuesType,
  TodolistDomainType
} from '../../reducers/tl-reducer';
import {changeTaskTitleAC, removeTaskAC, setTask, updateStatusTask} from '../../reducers/task-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {TaskStatuses, TaskType} from '../../api/api';
import {AppStateType} from '../../reducers/app-reducer';
import {ErrorSnackbar} from '../../Components/error-snackbars/ErrorSnackbar';
import {NavLink, Redirect} from 'react-router-dom';
import {AuthStateType, initializeApp, setIsLoggedIn} from '../../reducers/auth-reducer';

export type TasksStateType = { [key: string]: Array<TaskType> }

export const Dashboard = () => {
  const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const {status} = useSelector<AppRootStateType, AppStateType>(state => state.app)
  const {isLoggedIn } = useSelector<AppRootStateType, AuthStateType>(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
    dispatch(fetchTodoListsThunk())
    if (!isLoggedIn) {
      return
    }
  }, [dispatch,isLoggedIn])

  const changeTodoListNewTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTitleTodolistAC(todolistId, title))
  }, [dispatch])


  const addTask = useCallback((title: string, todoListId: string): void => {
    dispatch(setTask(title, todoListId))
  }, [dispatch])
  const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string): void => {
    dispatch(updateStatusTask(todolistId, id, status))
  }, [dispatch])
  const changeTaskTitle = useCallback((id: string, newTitle: string, todoListId: string): void => {
    dispatch(changeTaskTitleAC(id, todoListId, newTitle))
  }, [dispatch])
  const removeTask = useCallback((id: string, todoListId: string) => {
    dispatch(removeTaskAC(id, todoListId))
  }, [dispatch])
  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    dispatch(changeFilterTodolistAC(todolistId, value))
  }, [dispatch])
  const addTodoListClick = useCallback((title: string) => {
    dispatch(addTodoList(title))
  }, [dispatch])

  const handleLogOut = () => {
    dispatch(setIsLoggedIn(false))
  }

  if (!isLoggedIn) {
    return <Redirect to={'/login'}/>
  }
  // if (!isInitialized) {
  //   return <div
  //       style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
  //     <CircularProgress/>
  //   </div>
  // }

  return (
      <div className="App">
        <ErrorSnackbar/>
        <AppBar position="static">
          {status === 'loading' && <LinearProgress color="secondary"/>}
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu/>
            </IconButton>
            <Typography variant="h3">
              Todo
            </Typography>
            <Button onClick={handleLogOut} color="inherit"><NavLink to="/login">Login</NavLink></Button>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodoListClick}/>
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
                            enentityStatus={t.entityStatus}
                            addTask={addTask}
                            remove={removeTask}
                            tasks={tasksForTodoList}
                            changeFilter={changeFilter}
                            changeTaskStatus={changeStatus}
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


