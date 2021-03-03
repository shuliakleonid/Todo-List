import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from '../todo-list/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from '../add-item-form/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}


const App = () => {
  //BLL
  const todoListID1 = v1() // original id
  const todoListID2 = v1()


  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to buy', filter: 'all'}
  ]) //id todo list для каждой свой id по которому мы можем находить его

  const [tasks, setTasks] = useState<TasksStateType>(
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

  const changeTodoListNewTitle = (id: string, newTitle: string) => {
    const todoList = todoLists.find(tl => tl.id === id)
    if (todoList) {
      todoList.title = newTitle
      setTodoLists([...todoLists])
    }
  }
  const addTaskTodo = (value: string, todoListId: string): void => {
    const newTask = {id: v1(), title: value, isDone: false};
    const todoListTasks = tasks[todoListId]
    tasks[todoListId] = [newTask, ...todoListTasks]
    setTasks({...tasks})

    // const newTasks = [newTask, ...tasks];
    // setTasks(newTasks)
  }
  const changeCheckbox = (id: string, isDone: boolean, todoListId: string): void => {
    const todoListTasks = tasks[todoListId];
    const task: TaskType | undefined = todoListTasks.find(tl => tl.id === id)
    if (task) {
      task.isDone = isDone
      setTasks({...tasks})
    }
  }
  const changeTaskTitle = (id: string, newTitle: string, todoListId: string): void => {
    const todoListTasks = tasks[todoListId];
    const task: TaskType | undefined = todoListTasks.find(tl => tl.id === id)
    if (task) {
      task.title = newTitle
      setTasks({...tasks})
    }
  }
  const removeTask = (id: string, todoListId: string) => {
    const todoListTasks = tasks[todoListId];
    tasks[todoListId] = todoListTasks.filter((item) => item.id !== id)
    setTasks({...tasks})
    // setTasks(tasks.filter((item) => item.id !== id))
  }
  const changeFilter = (newFilterValue: FilterValueType, todoListId: string) => {
    const todoList = todoLists.find(tl => tl.id === todoListId)
    if (todoList) {
      todoList.filter = newFilterValue
      setTodoLists([...todoLists]);
    }
  }
  const removeTodoList = (todoListID: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    delete tasks[todoListID]
  }
  const addTodoList = (title: string) => {
    let todoList: TodoListType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodoLists([todoList, ...todoLists]);
    setTasks({
      ...tasks,
      [todoList.id]: []
    })
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


export default App;