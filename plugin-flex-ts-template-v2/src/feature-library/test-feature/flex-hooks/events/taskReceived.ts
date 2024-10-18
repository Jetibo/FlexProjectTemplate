import * as Flex from '@twilio/flex-ui';
import { ITask } from '@twilio/flex-ui';

import * as DestinationHelper from '../../helpers/destinationNumber';
import { FlexEvent } from '../../../../types/feature-loader';

export const eventName = FlexEvent.taskReceived;
export const eventHook = async (flex: typeof Flex, manager: Flex.Manager, task: ITask) => {
  const destinationNumber = DestinationHelper.getDestination()?.outbound_to;
  await DestinationHelper.setDestinationAttribute(task.taskSid, task.attributes, destinationNumber);
  // const attributes = { ...task.attributes, outbound_to: destinationNumber };
  // task.setAttributes(attributes);
};
