import { Worker } from 'twilio-taskrouter';
import { Stack } from '@twilio-paste/core/stack';
import { Text } from '@twilio-paste/core/text';
import { Avatar } from '@twilio-paste/core/avatar';
import { UserIcon } from '@twilio-paste/icons/esm/UserIcon';
import { v4 as uuidv4 } from 'uuid';
import { withTaskContext, Actions, ITask, Icon, Template, templates } from '@twilio/flex-ui'; // to test

import { DirectoryEntry } from '../types/DirectoryEntry';

export const generateCardComponents = (
  updatedWorkers: Worker[],
  isColdTransferEnabled: boolean,
  isWarmTransferEnabled: boolean,
  workerSearchString: string,
) => {
  return updatedWorkers
    .filter((worker) => {
      // const searchString = searchInputRef.current?.value.toLocaleLowerCase() || '';
      // const searchString = '2';
      return worker.attributes?.full_name.toLocaleLowerCase().includes(workerSearchString);
    })
    .map(
      (worker) =>
        ({
          // cold_transfer_enabled: isColdTransferEnabled && worker.available,
          // warm_transfer_enabled: isWarmTransferEnabled && worker.available,
          cold_transfer_enabled: true,
          warm_transfer_enabled: true,
          label: worker.attributes?.full_name ?? worker.name,
          labelComponent: (
            <Stack orientation="vertical" spacing="space0">
              <Text as="div" element="TRANSFER_DIR_COMMON_ROW_NAME">
                {worker.attributes?.full_name ?? worker.name}
              </Text>
              <Stack orientation="horizontal" spacing="space0">
                <Icon icon={worker.available ? 'GreenIndicator' : 'GreyIndicator'} sizeMultiplier={0.5} />
                <Text as="div" element="TRANSFER_DIR_COMMON_ROW_DESC">
                  {(worker as any).activityName}
                </Text>
              </Stack>
            </Stack>
          ),
          icon: (
            <Avatar
              size="sizeIcon60"
              color="decorative10"
              icon={UserIcon}
              name={worker.attributes?.full_name ?? worker.name}
              src={worker.attributes?.image_url}
            />
          ),
          address: worker.sid,
          type: 'worker',
          key: uuidv4(),
        } as DirectoryEntry),
    );
};
