import React from 'react';
import './App.css';
import {TodoList} from './Components/TodoList'

function App() {
    const tasks1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: 'Hello world', isDone: true},
        {id: 2, title: 'I am Happy', isDone: false},
        {id: 3, title: 'Yo', isDone: false}
    ]
    const tasks3 = [
        {id: 1, title: 'You don`t now JS', isDone: false},
        {id: 2, title: 'JS for kids', isDone: false},
        {id: 3, title: 'ECMAScript', isDone: false}
    ]
    return (
        <div className="App">
            <TodoList title='Books' tasks={tasks1}/>
            <TodoList title='Magazine' tasks={tasks2}/>
            <TodoList title='Home' tasks={tasks3}/>
        </div>
    );
}

export default App;
