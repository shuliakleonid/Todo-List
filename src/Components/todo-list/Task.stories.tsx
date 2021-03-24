import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {Task, TaskPropsType} from './Task';


export default {
  title: 'TODOLISTS/Task',
  component: Task,

} as Meta;
const toggleCheckbox = action('Status Task')
const remove = action('Remove Task')
const changeTaskTitle = action('Change Title Task')


const Template: Story<TaskPropsType> = (args) => <Task {...args} />;
const baseArgs = {
  toggleCheckbox,
  remove,
  changeTaskTitle,

}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  ...baseArgs,
  task:{id:'1',isDone:true,title:'JS'},
  todoListId:'todolistId1'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
  ...baseArgs,
  task:{id:'2',isDone:false,title:'JS'},
  todoListId:'todolistId1'
};
