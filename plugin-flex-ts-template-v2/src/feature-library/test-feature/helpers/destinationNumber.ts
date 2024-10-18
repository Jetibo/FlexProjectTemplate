import * as Flex from '@twilio/flex-ui';

import TaskRouterService from '../../../utils/serverless/TaskRouter/TaskRouterService';
import logger from '../../../utils/logger';

const instanceSid = Flex.Manager.getInstance().serviceConfiguration.flex_service_instance_sid;
const STORAGE_KEY = `destination_number_${instanceSid}`;

export const getDestination = () => {
  const storageValue = localStorage.getItem(STORAGE_KEY);

  if (!storageValue) {
    return {};
  }

  const parsedValue = JSON.parse(storageValue);

  if (!parsedValue) {
    return {};
  }
  return parsedValue;
};

export const setDestination = (value: string) => {
  const newValue = {
    outbound_to: value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
  logger.debug(`[test-feature] Set ${STORAGE_KEY} to ${value}`, newValue);
};

export const setDestinationAttribute = async (taskSid: string, taskAttributes: any, value: string) => {
  const newAttributes = {
    outbound_to: value,
  };

  try {
    await TaskRouterService.updateTaskAttributes(taskSid, newAttributes);
  } catch (error: any) {
    logger.error(`[test-feature] Failed to set outbound_to attribute for ${taskSid} to ${value}`, error);
  }
  logger.debug(`[test-feature] Set outbound_to attribute for ${taskSid} to ${value}`, newAttributes);
};

// export const clearHangUpBy = (reservationSid: string) => {
//   const storage = getHangUpBy();

//   if (storage[reservationSid]) {
//     delete storage[reservationSid];
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
//     logger.debug(`[hang-up-by] Removed ${STORAGE_KEY} value for ${reservationSid}`);
//   }
// };
