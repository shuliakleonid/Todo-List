import {removeTodolistAC,addTodolistAC, todoListReducer} from './tl-reducer';
import {TasksStateType, TodoListType} from '../Components/app/App';
import { tasksReducer} from './task-reducer';


test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodoListType> = [];

  const action = addTodolistAC("new todolist");


  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const action = removeTodolistAC("todolistId2");

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
})
