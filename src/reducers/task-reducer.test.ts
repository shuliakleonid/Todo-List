import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer
} from './task-reducer';
import {addTodolistAC} from './tl-reducer';
import {TaskPriorities, TaskStatuses} from '../api/api';
import {TasksStateType} from '../Components/app-withReducer/AppWithReducers';

let startState:TasksStateType
beforeEach(()=>{
  startState = {
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
})
test('correct task should be deleted from correct array', () => {

  const action = removeTaskAC("2", "todolistId2");
  const endState = tasksReducer(startState, action)

  expect(endState).toEqual(startState);
});


test('correct task should be added to correct array', () => {

  const action = addTaskAC(
      {
        id: "3", title: "tea", description: 'string',
    status: TaskStatuses.New,
    priority: TaskPriorities.Hi,
    startDate: 'string',
    deadline: 'string',
    todoListId: 'string',
    order: 0,
    addedDate: 'string' });
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("tea");
  // expect(endState["todolistId2"][0].isDone).toBe(false);
})
test('status of specified task should be changed', () => {


  const action = changeTaskStatusAC(2, "todolistId2", "taskId2");
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"][1].status).toBe(false);
  expect(endState["todolistId1"][1].status).toBe(true);
});

test('title of specified task should be changed', () => {

  const action = changeTaskTitleAC("2", 'beer', "todolistId2");
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"][1].title).toBe('beer');
  expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {

  const action = addTodolistAC("new todolist");

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
});
