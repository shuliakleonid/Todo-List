import React, {useState} from 'react';
import './App.css';
import {TodoList} from './Components/TodoList'

// import {setFlagsFromString} from 'v8';
export type FilterValuesType = 'all' | 'completed' | 'active'
function App() {
    let tasks1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'TS', isDone: true},
        {id: 5, title: 'Nest', isDone: false},
        {id: 6, title: 'NodeJS', isDone: true}
    ]
    // const tasks2 = [
    //     {id: 1, title: 'Hello world', isDone: true},
    //     {id: 2, title: 'I am Happy', isDone: false},
    //     {id: 3, title: 'Yo', isDone: false}
    // ]
    // const tasks3 = [
    //     {id: 1, title: 'You don`t now JS', isDone: false},
    //     {id: 2, title: 'JS for kids', isDone: false},
    //     {id: 3, title: 'ECMAScript', isDone: false}
    // ]

    // let arr = useState(tasks1);// массив объектов стартовый
    // let tasks = arr[0];// массив обрабатываемый( и измененный после обработки)
    // console.log(tasks)
    // let setTasks = arr[1];// массив обработанный и пререзапускает компоненту

    let [tasks, setTasks] = useState(tasks1)
    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: number) {
        let filteredTasks1 = tasks.filter((item) => item.id !== id)
        setTasks(filteredTasks1)
    }

    function changeFilter(value:FilterValuesType){
        setFilter(value)
    }


    let tasksForTodoList = tasks;
    if( filter === 'completed'){
        tasksForTodoList = tasks.filter( t => t.isDone===true)
    }
    if( filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

        return (
        <div className="App">
            <TodoList
                title='Books'
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter = {changeFilter}
            />
            {/*<TodoList title='Magazine' tasks={tasks2}/>*/}
            {/*<TodoList title='Home' tasks={tasks3}/>*/}
        </div>
    );
}

export default App;
