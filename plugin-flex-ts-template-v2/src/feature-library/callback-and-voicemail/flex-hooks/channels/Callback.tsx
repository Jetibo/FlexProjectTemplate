import * as Flex from '@twilio/flex-ui';
import React from 'react';
import { CallOutgoingIcon } from '@twilio-paste/icons/esm/CallOutgoingIcon';

import { TaskAttributes } from '../../../../types/task-router/Task';
import { StringTemplates } from '../strings/Callback';

export const channelHook = function createCallbackChannel(flex: typeof Flex, manager: Flex.Manager) {
  const channelDefinition = flex.DefaultTaskChannels.createDefaultTaskChannel(
    'callback',
    (task) => {
      const { taskType } = task.attributes as TaskAttributes;
      return task.taskChannelUniqueName === 'voice' && taskType === 'callback';
    },
    'CallbackIcon',
    'CallbackIcon',
    'palegreen',
  );

  const getTaskName = (task: Flex.ITask, queue: boolean): string => {
    if (queue) {
      return `${task.queueName}: ${(manager.strings as any)[StringTemplates.Callback]} (${task.attributes.name})`;
    }
    return `${(manager.strings as any)[StringTemplates.Callback]} (${task.attributes.name})`;
  };

  const { templates } = channelDefinition;
  const CallbackChannel: Flex.TaskChannelDefinition = {
    ...channelDefinition,
    templates: {
      ...templates,
      TaskListItem: {
        ...templates?.TaskListItem,
        firstLine: (task: Flex.ITask) => getTaskName(task, true),
      },
      TaskCanvasHeader: {
        ...templates?.TaskCanvasHeader,
        title: (task: Flex.ITask) => getTaskName(task, true),
      },
      IncomingTaskCanvas: {
        ...templates?.IncomingTaskCanvas,
        firstLine: (task: Flex.ITask) => getTaskName(task, true),
      },
      TaskCard: {
        ...templates?.TaskCard,
        firstLine: (task: Flex.ITask) => getTaskName(task, false),
      },
      Supervisor: {
        ...templates?.Supervisor,
        TaskCanvasHeader: {
          ...templates?.Supervisor?.TaskCanvasHeader,
          title: (task: Flex.ITask) => getTaskName(task, false),
        },
        TaskOverviewCanvas: {
          ...templates?.Supervisor?.TaskOverviewCanvas,
          firstLine: (task: Flex.ITask) => getTaskName(task, true),
        },
      },
    },
    icons: {
      active: <CallOutgoingIcon element="C_AND_V_ICON" decorative={true} key="active-callback-icon" />,
      list: <CallOutgoingIcon element="C_AND_V_ICON" decorative={true} key="list-callback-icon" />,
      main: <CallOutgoingIcon element="C_AND_V_ICON" decorative={true} key="main-callback-icon" />,
    },
  };

  // Register Channel
  return CallbackChannel;
};
