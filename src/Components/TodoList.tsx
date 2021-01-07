import React from 'react';
import {FilterValuesType} from '../App';

type TaskTypeProps = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskTypeProps>
    removeTask: (id:number) => void
    changeFilter: (value:FilterValuesType) => void
}

export function TodoList(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(item => <li>
                        <input type="checkbox" checked={item.isDone}/>
                        <span>{item.title}</span>
                        <button onClick={() => {
                            props.removeTask(item.id)
                        }}>button
                        </button>
                    </li>)
                }


                {/*<li><input placeholder='date of birth' type={'data'}/></li>*/}
                {/*<li><input type='button' value={'text inside button'}/></li>*/}
                {/*<li><input type="radio" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>*/}


            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')

                }}>All</button>
                <button onClick={() => {
                    props.changeFilter('active')

                }}>Active</button>
                <button onClick={() => {
                    props.changeFilter('completed')

                }}>Completed</button>
            </div>
        </div>
    )
}