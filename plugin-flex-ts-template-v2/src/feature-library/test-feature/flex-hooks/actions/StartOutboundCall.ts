import * as Flex from '@twilio/flex-ui';

import { FlexAction, FlexActionEvent } from '../../../../types/feature-loader';
import * as DestinationHelper from '../../helpers/destinationNumber';

export const actionEvent = FlexActionEvent.replace;
export const actionName = FlexAction.StartOutboundCall;
export const actionHook = function replaceDestinationWithSipUri(flex: typeof Flex, _manager: Flex.Manager) {
  flex.Actions.replaceAction(FlexAction.StartOutboundCall, async (payload, original) => {
    // Flex.TaskListItem.visible = false;
    // Flex.TaskList.Content.remove('TaskListItem');
    // Flex.TaskListContainer.Content.remove('taskList');
    if (Flex.DefaultTaskChannels.Call.templates && Flex.DefaultTaskChannels.Call.templates.TaskListItem) {
      Flex.DefaultTaskChannels.Call.templates.TaskListItem.firstLine = payload.destination;
    }
    const destinationNumber = payload.destination;
    DestinationHelper.setDestination(destinationNumber);
    const sipUrl = `sip:${payload.destination}@74.216.209.100?X-Termination-URI=navigatr-stream1-qa-allstream.pstn.twilio.com`;
    const modifiedPayload = {
      ...payload,
      destination: sipUrl,
      taskAttributes: { to: payload.destination },
    };

    original(modifiedPayload);
  });
};
