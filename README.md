# Todo List
[![Todo-List](https://i.ibb.co/TTpqTtZ/TodoList.png)](https://shuliakleonid.github.io/TodoList/)

#### Description of your project
This is Todo App with login and API
#### __In this project I do:__
- cover code with tests
- use Storybook
- fetching data with REST API
- use testing library
- build app with all CRUD operations
## Table of content

- [**Getting Started**](#getting-started)
- [Built With](#built-with)
- [Contributing](#contributing)
- [Get Help](#get-help)
- [Links](#links)

## Getting Started

### Install
```console
npm install 
npm run
```

### Usage
Use API with all CRUD operation
```javascript
export const todoListsAPI = {
  getTodoLists() {
    return instance.get<Array<TodolistType>>('todo-lists').then(res => res.data)
  },
  createTodoLists(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title}).then(res => res.data)
  },
  deleteTodoLists(titleId: string) {
    return instance.delete<ResponseType<{}>>(`todo-lists/${titleId}`).then(res => res.data)
  },
  updateTodoLists(titleId: string, title: string) {
    return instance.put<ResponseType<{}>>(`todo-lists/${titleId}`, {title}).then(res => res.data)
  }
}
```
## Built With
- React
- React Hooks 
- Redux
- Redux Thunk
- Typescript
- Axios
- Storybook
- Units tests
- Jest testing


## Contributing

#### Issues
In the case of a bug report, bugfix or a suggestions, please feel very free to open an issue.

#### Pull request
Pull requests are always welcome, and I'll do my best to do reviews as fast as I can.


## Get Help
- Contact me on zeleny777@email.com
- If appropriate, [open an issue](https://github.com/shuliakleonid/todoList/issues) on GitHub

## Links

Even though this information can be found inside the project on machine-readable
format like in a .json file, it's good to include a summary of most useful
links to humans using your project. You can include links like:

- Project homepage: https://shuliakleonid.github.io/TodoList/
- Repository:https://github.com/shuliakleonid/TodoList

