import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from '../reducers/task-reducer';
import {todoListReducer} from '../reducers/tl-reducer';
import {TaskPriorities, TaskStatuses} from '../api/api';


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListReducer
})

const initialGlobalState = {
  todoLists: [
    {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
  ],
  tasks: {
    ['todolistId1']: [
      {
        id: v1(),
        title: 'HTML&CSS',
        description: 'string',
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: 'string',
        deadline: 'string',
        todoListId: 'string',
        order: 0,
        addedDate: 'string'
      },
      {
        id: v1(),
        title: 'JS',
        description: 'string',
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: 'string',
        deadline: 'string',
        todoListId: 'string',
        order: 0,
        addedDate: 'string'
      }
    ],
    ['todolistId2']: [
      {
        id: v1(),
        title: 'Milk',
        description: 'string',
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: 'string',
        deadline: 'string',
        todoListId: 'string',
        order: 0,
        addedDate: 'string'
      },
      {
        id: v1(),
        title: 'React Book',
        description: 'string',
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: 'string',
        deadline: 'string',
        todoListId: 'string',
        order: 0,
        addedDate: 'string'
      }
    ]
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

