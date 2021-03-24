import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';
import {AppWithReducers} from './AppWithReducers';
import {ReduxStoreProviderDecorator} from '../../stories/ReduxStoreProviderDecorator';


export default {
  title: 'TODOLISTS/AppWithReducers',
  component: AppWithReducers,
  decorators:[ ReduxStoreProviderDecorator]

} as Meta;

const Template: Story = (args) => <AppWithReducers {...args} />;


export const AppWithReducersStories = Template.bind({});
AppWithReducersStories.args = {

};
