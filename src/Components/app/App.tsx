import React, {useState} from 'react';
import './App.css';
import {TaskTypeProps, TodoList} from '../todo-list/TodoList';

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
  let [tasks, setTasks] = useState<Array<TaskTypeProps>>([
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false},
    {id: 4, title: 'TS', isDone: true},
    {id: 5, title: 'Nest', isDone: false},
    {id: 6, title: 'NodeJS', isDone: true}
  ])
  const [filter, setFilter] = useState<FilterValueType>('all')

  function removeTask(id: number) {
    setTasks(tasks.filter((item) => item.id !== id))
  }

  function changeFilter(value: FilterValueType) {
    setFilter(value);
    console.log(value);
  }

  let tasksForTodoList = tasks
  if (filter === 'active') {
    tasksForTodoList = tasks.filter(t => t.isDone === false)

  }
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone === true)

  }




  return (
      <div className="App">
        <TodoList
            title='Books'
            tasks={tasksForTodoList}
            remove={removeTask}
            changeFilter={changeFilter}
        />
      </div>
  );
}

export default App;
