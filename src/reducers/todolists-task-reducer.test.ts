import {TasksStateType, TodoListType} from '../Components/app/App';
import {AddTodolistAC, tasksReducer} from './task-reducer';
import {addTodolistAC, todoListReducer} from './tl-reducer';


test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodoListType> = [];

  const action = AddTodolistAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
