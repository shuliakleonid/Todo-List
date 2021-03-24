import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormType} from './AddItemForm';
import {action} from '@storybook/addon-actions';


export default {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,

} as Meta;

const Template: Story<AddItemFormType> = (args) => <AddItemForm {...args} />;

export const AddItemFormStories = Template.bind({});
AddItemFormStories.args = {
addItem: action('clicked add item')
};
