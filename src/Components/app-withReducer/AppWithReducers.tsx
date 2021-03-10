import React, {useReducer} from 'react';
import './AppWithReducers.css';
import TodoList, {TaskType} from '../todo-list/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from '../add-item-form/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
  addTodolistAC,
  changeFilterTodolistAC,
  changeTitleTodolistAC,
  removeTodolistAC,
  todoListReducer
} from '../../reducers/tl-reducer';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer
} from '../../reducers/task-reducer';

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
  const todoListID1 = v1() // original id
  const todoListID2 = v1()


  const [todoLists, dispatchTodoLists] = useReducer(todoListReducer,[
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to buy', filter: 'all'}
  ])

  const [tasks, dispatchTasks] = useReducer(tasksReducer,
      {
        [todoListID1]: [// arr with origin id
          {id: v1(), title: 'HTML&CSS', isDone: true},
          {id: v1(), title: 'JS', isDone: true},
          {id: v1(), title: 'ReactJS', isDone: false},
          {id: v1(), title: 'TS', isDone: true},
          {id: v1(), title: 'Nest', isDone: false},
          {id: v1(), title: 'NodeJS', isDone: true}
        ],
        [todoListID2]: [
          {id: v1(), title: 'Milk', isDone: true},
          {id: v1(), title: 'Bear', isDone: false},
          {id: v1(), title: 'Bread', isDone: true},
          {id: v1(), title: 'Meat', isDone: true},
          {id: v1(), title: 'Eggs', isDone: false},
          {id: v1(), title: 'Banana', isDone: true}
        ]
      },
  )

  const changeTodoListNewTitle = (todolistId: string, title: string) => {
    dispatchTodoLists(changeTitleTodolistAC(todolistId,title))
  }
  const addTaskTodo = (value: string, todoListId: string): void => {
    dispatchTasks(addTaskAC(value,todoListId))
  }
  const changeCheckbox = (id: string, isDone: boolean, todoListId: string): void => {
    dispatchTasks(changeTaskStatusAC(id,isDone,todoListId))
  }
  const changeTaskTitle = (id: string, newTitle: string, todoListId: string): void => {
    dispatchTasks(changeTaskTitleAC(id,todoListId,newTitle))
  }
  const removeTask = (id: string, todoListId: string) => {
    dispatchTasks(removeTaskAC(id,todoListId))
  }
  const changeFilter = (newFilterValue: FilterValueType, todoListId: string) => {
    dispatchTodoLists(changeFilterTodolistAC(todoListId,newFilterValue))
  }
  const removeTodoList = (todoListID: string) => {
    let action = removeTodolistAC(todoListID)
    dispatchTasks(action)
    dispatchTodoLists(action)
  }
  const addTodoList = (title: string) => {
    let action = addTodolistAC(title)
    dispatchTodoLists(action)
    dispatchTasks(action)
  }



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
                if (t.filter === 'active') {
                  tasksForTodoList = tasks[t.id].filter(t => !t.isDone)
                }
                if (t.filter === 'completed') {
                  tasksForTodoList = tasks[t.id].filter(t => t.isDone)
                }

                return (
                    <Grid item key={t.id}>
                      <Paper>
                        <TodoList
                            id={t.id}
                            title={t.title}
                            tasks={tasksForTodoList}
                            filter={t.filter}
                            remove={removeTask}
                            changeFilter={changeFilter}
                            addTaskTodo={addTaskTodo}
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


