import * as Flex from '@twilio/flex-ui';
import { ContentFragmentProps } from '@twilio/flex-ui';

import WorkerActivityHistory from '../../custom-components/WorkerActivityHistory';
import { FlexComponent } from '../../../../types/feature-loader';
import { StringTemplates } from '../strings';

interface TabbedContentFragmentProps extends ContentFragmentProps {
  tabTitle: string;
}

export const componentName = FlexComponent.WorkerCanvas;
export const componentHook = function addHistoryToWorkerCanvas() {
  Flex.WorkerCanvas.Content.add(<WorkerActivityHistory key="worker-activity-history" />, {
    tabTitle: StringTemplates.ActivityHistory,
  } as TabbedContentFragmentProps);
};
