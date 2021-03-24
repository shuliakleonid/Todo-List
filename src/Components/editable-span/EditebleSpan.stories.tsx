import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {EditableSpan, EditableSpanTypeProps} from './EditableSpan';


export default {
  title: 'TODOLISTS/EditableSpan',
  component: EditableSpan,
  argTypes: {
    onChange: {
      description: 'Value EditableSpan change'
    },
    value: {
      defaultValue: 'HTML',
      description: 'Start value EditableSpan'
    }
  }
} as Meta;


const Template: Story<EditableSpanTypeProps> = (args) => <EditableSpan {...args} />;



export const EditableSpaStory = Template.bind({});
EditableSpaStory.args = {
  onChange: action('Value EditableSpan change')
};
