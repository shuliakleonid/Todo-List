import React from 'react';

type TaskTypeProps = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks:Array<TaskTypeProps>
}

export function TodoList(props:PropsType ) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input placeholder='date of birth' type={'data'}/></li>
                <li><input type='button' value={'text inside button'}/></li>
                <li><input type="radio" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}