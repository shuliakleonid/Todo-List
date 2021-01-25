import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskTypeProps} from '../todo-list/TodoList';
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed';
const App = () => {
  let [tasks, setTasks] = useState<Array<TaskTypeProps>>([
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
    {id: v1(), title: 'TS', isDone: true},
    {id: v1(), title: 'Nest', isDone: false},
    {id: v1(), title: 'NodeJS', isDone: true}
  ])
  const addTaskTodo = (value: string): void => {
    const newTask: TaskTypeProps = {id: v1(), title: value, isDone: false};
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks)
  }
  const changeCheckbox = (id: string, isDone:boolean): void => {
    const newTask = tasks.map((i: TaskTypeProps) => {
      if (id === i.id) {
        return {...i, isDone: isDone }
      }
      return i
    })
    setTasks(newTask)
  }
  const [filter, setFilter] = useState<FilterValueType>('all')
  function removeTask(id: string) {
    setTasks(tasks.filter((item) => item.id !== id))
  }
  function changeFilter(value: FilterValueType) {
    setFilter(value);
  }
  let tasksForTodoList = tasks
  if (filter === 'active') {
    tasksForTodoList = tasks.filter(t => !t.isDone)
  }
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone)
  }


  return (
      <div className="App">
        <TodoList
            title='Books'
            tasks={tasksForTodoList}
            remove={removeTask}
            changeFilter={changeFilter}
            addTaskTodo={addTaskTodo}
            toggleCheckbox={changeCheckbox}
            filter={filter}
        />
      </div>
  );
}

export default App;
