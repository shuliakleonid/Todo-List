import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from './task-reducer';
import {addTodolistAC} from './tl-reducer';
import {TaskPriorities, TaskStatuses} from '../api/api';
import {TasksStateType} from '../pages/dashboard/Dashboard';

let startState:TasksStateType;
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

  const action = removeTaskAC({id:'2', todolistId:'todolistId2'});
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(2)
  expect(endState['todolistId2'].every(t=>t.id !== '2')).toBeTruthy()
  // expect(endState).toEqual(startState);
});


test('correct task should be added to correct array', () => {

  const task = {
    task:{
      id: '3', title: "Bread", description: 'string',
      status: TaskStatuses.New,
      priority: TaskPriorities.Hi,
      startDate: 'string',
      deadline: 'string',
      todoListId: 'todolistId2',
      order: 0,
      addedDate: 'string' }
  };
  const action = addTaskAC(task);
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("Bread");
})
test('status of specified task should be changed', () => {
const model = {
  title: 'string',
  description: 'string',
  status: 2,
  priority: 3,
  startDate: 'string',
  deadline: 'string',
}

  const action = updateTaskAC({model, todolistId:'todolistId2', taskId:'taskId2'});
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"][1].status).toBe(2);
  expect(endState["todolistId1"][1].priority).toBe(2);
});

test('title of specified task should be changed', () => {
  const model = {
    title: 'New Title',
    description: 'string',
    status: 2,
    priority: 3,
    startDate: 'string',
    deadline: 'string',
  }
  const action = updateTaskAC({model, taskId:'2', todolistId:'todolistId2'});
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"][1].title).toBe('New Title');
  expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {

  const action = addTodolistAC({title:'new todolist',todolistId: 'TodoListID-3'});

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
});
