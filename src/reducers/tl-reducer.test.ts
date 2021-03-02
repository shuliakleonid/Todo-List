import {v1} from 'uuid';
import {FilterValueType, TodoListType} from '../Components/app/App';
import {
  addTodolistAC,
  changeFilterTodolistAC,
  changeTitleTodolistAC,
  removeTodolistAC,
  todoListReducer
} from './tl-reducer';


test('todolist should be removed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodoListType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
  const endState = todoListReducer(startState,removeTodolistAC(todolistId1))
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]

  const endState = todoListReducer(startState, addTodolistAC(newTodolistTitle))

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState===startState).toBeFalsy()
});

test('correct todolist should change its name', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]

  const endState = todoListReducer(startState, changeTitleTodolistAC(todolistId2,newTodolistTitle));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValueType = "completed";

  const startState: Array<TodoListType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]

  const endState = todoListReducer(startState, changeFilterTodolistAC(newFilter,newFilter));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
