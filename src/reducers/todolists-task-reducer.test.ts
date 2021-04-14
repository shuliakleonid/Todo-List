import {removeTodolistAC, addTodolistAC, todoListReducer, TodolistDomainType} from './tl-reducer';
import { tasksReducer} from './task-reducer';
import {TaskPriorities, TaskStatuses} from '../api/api';
import {TasksStateType} from '../Components/app-withReducer/AppWithReducers';


test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodoListsState: Array<TodolistDomainType> = [];

  const action = addTodolistAC("new todolist");
  const endTasksState = tasksReducer(startTasksState, action)
  const endTodoListsState = todoListReducer(startTodoListsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodoLists = endTodoListsState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodoLists).toBe(action.todolistId);
});

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      { id: "1", title: "CSS",
        description: 'string',
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: 'string',
        deadline: 'string',
        todoListId: 'string',
        order: 0,
        addedDate: 'string' },
      { id: "2", title: "JS",  description: 'string',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Hi,
        startDate: 'string',
        deadline: 'string',
        todoListId: 'string',
        order: 0,
        addedDate: 'string' },
      { id: "3", title: "React",  description: 'string',
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: 'string',
        deadline: 'string',
        todoListId: 'string',
        order: 0,
        addedDate: 'string'  }
    ],
    "todolistId2": [
      { id: "1", title: "bread",description: 'string',
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: 'string',
        deadline: 'string',
        todoListId: 'string',
        order: 0,
        addedDate: 'string' },
      { id: "2", title: "milk", description: 'string',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Hi,
        startDate: 'string',
        deadline: 'string',
        todoListId: 'string',
        order: 0,
        addedDate: 'string'},
      { id: "3", title: "tea", description: 'string',
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: 'string',
        deadline: 'string',
        todoListId: 'string',
        order: 0,
        addedDate: 'string' }
    ]
  };
  const action = removeTodolistAC("todolistId2");
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
})
