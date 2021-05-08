import {v1} from 'uuid';
import {
  addTodolistAC,
  changeFilterTodolistAC,
  changeTitleTodolistAC,
  FilterValuesType,
  removeTodolistAC,
  TodolistDomainType,
  todoListReducer
} from './tl-reducer';

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]
let newTodolistTitle: string
beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  newTodolistTitle = 'New Todolist';
  startState = [
    {
    id: todolistId1,
    title: "string",
    addedDate: 'string',
    order: 1,
    filter:'all',
    entityStatus:'idle'
  },
    {
    id: todolistId2,
    title: "Food",
    addedDate: '21-02-2012',
    order: 1,
    filter:'all',
    entityStatus:'idle'
  },
  ]
})

test('todolist should be removed', () => {

  const action = removeTodolistAC({todolistId: todolistId1});
  const endState = todoListReducer(startState, action )
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

  const endState = todoListReducer(startState, addTodolistAC({title:newTodolistTitle,todolistId:'TodoId'}))
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState === startState).toBeFalsy()
});

test('correct todolist should change its name', () => {

  const endState = todoListReducer(startState, changeTitleTodolistAC({todolistId:todolistId2,title: newTodolistTitle}));
  expect(endState[1].title).toBe(newTodolistTitle);
  expect(endState[0].title).toBe('string');
});

test('correct filter of todolist should be changed', () => {

  let newFilter: FilterValuesType = 'completed';
  const endState = todoListReducer(startState, changeFilterTodolistAC({filter:newFilter, todolistId:todolistId2}));
  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});
