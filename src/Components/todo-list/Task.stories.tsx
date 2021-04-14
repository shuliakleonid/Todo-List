import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {Task, TaskPropsType} from './Task';
import {TaskStatuses} from '../../api/api';


export default {
  title: 'TODOLISTS/Task',
  component: Task,

} as Meta;
const changeTaskStatus = action('Status Task')
const remove = action('Remove Task')
const changeTaskTitle = action('Change Title Task')


const Template: Story<TaskPropsType> = (args) => <Task {...args} />;
const baseArgs = {
  changeTaskStatus,
  remove,
  changeTaskTitle,

}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  ...baseArgs,
  task: {
    id: '1',
    status: TaskStatuses.New,
    title: 'JS',
    description: 'string',
    priority: 1,
    startDate: 'string',
    deadline: 'string',
    todoListId: 'string',
    order: 0,
    addedDate: 'string',
  },
  todoListId: 'todolistId1'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
  ...baseArgs,
  task: {id: '2',
    status: TaskStatuses.InProgress,
    title: 'JS',
    description: 'string',
    priority: 1,
    startDate: 'string',
    deadline: 'string',
    todoListId: 'string',
    order: 0,
    addedDate: 'string',
  },
  todoListId: 'todolistId1'
};
