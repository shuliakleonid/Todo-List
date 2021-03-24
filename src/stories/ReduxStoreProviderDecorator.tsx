import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from '../reducers/task-reducer';
import {todoListReducer} from '../reducers/tl-reducer';


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListReducer
})

const initialGlobalState = {
  todoLists: [
    {id: 'todolistId1', title: 'What to learn', filter: 'all'},
    {id: 'todolistId2', title: 'What to buy', filter: 'all'}
  ],
  tasks: {
    ['todolistId1']: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true}
    ],
    ['todolistId2']: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'React Book', isDone: true}
    ]
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn:()=>React.ReactNode) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

