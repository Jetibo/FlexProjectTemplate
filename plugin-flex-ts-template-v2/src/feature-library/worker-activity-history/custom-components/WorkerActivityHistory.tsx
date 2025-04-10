import React, { useEffect, useState } from 'react';
import { IWorker, Template, Theme, styled, templates } from '@twilio/flex-ui';
import { Box } from '@twilio-paste/core/box';
import {
  DataGrid,
  DataGridHead,
  DataGridRow,
  DataGridHeader,
  DataGridBody,
  DataGridCell,
} from '@twilio-paste/core/data-grid';
import { UnsortedIcon } from '@twilio-paste/icons/esm/UnsortedIcon';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { Checkbox } from '@twilio-paste/core/checkbox';

import TaskRouterService, { Event } from '../../../utils/serverless/TaskRouter/TaskRouterService';

interface OwnProps {
  worker?: IWorker;
}

// const testData = [{}];

// const WorkerActivityHistory = ({ worker }: OwnProps) => {
export default function WorkerActivityHistory(props: OwnProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [workerActivities, setWorkerActivities] = useState([] as Event[]);

  useEffect(() => {
    listEvents();
  }, [props.worker?.sid]);

  const listEvents = async () => {
    if (!props.worker) return;

    setIsLoading(true);
    const eventsData = await TaskRouterService.getWorkerActivityHistory(props.worker.sid);
    setWorkerActivities(eventsData);
    // setWorkerActivities(testData);
    console.log('test eventsData', eventsData);
    setIsLoading(false);
  };

  return (
    <Box paddingX="space100" paddingTop="space130" paddingBottom="space160">
      <h1>TEST</h1>
      <Box>
        <DataGrid aria-label="label1">
          <DataGridHead>
            <DataGridRow>
              <DataGridHeader>
                <Box display="flex" columnGap="space20">
                  Event Date
                  <UnsortedIcon decorative={false} title="sort column" />
                </Box>
              </DataGridHeader>
              <DataGridHeader>
                <Box display="flex" columnGap="space20">
                  Previous Activity
                  <UnsortedIcon decorative={false} title="sort column" />
                </Box>
              </DataGridHeader>
              <DataGridHeader>
                <Box display="flex" columnGap="space20" justifyContent="flex-end">
                  Activity
                  <UnsortedIcon decorative={false} title="sort column" />
                </Box>
              </DataGridHeader>
            </DataGridRow>
          </DataGridHead>
          <DataGridBody>
            {workerActivities
              .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
              .map((data) => (
                <DataGridRow key={data.sid}>
                  {/* <DataGridCell>{data.eventDate}</DataGridCell> */}
                  <DataGridCell>
                    <div>
                      {new Date(data.eventDate).toISOString().split('T')[0]}
                      <br />
                      {new Date(data.eventDate).toISOString().split('T')[1].split('.')[0]} UTC
                    </div>
                  </DataGridCell>
                  <DataGridCell>{data.eventData.worker_previous_activity_name}</DataGridCell>
                  <DataGridCell>{data.eventData.worker_activity_name}</DataGridCell>
                </DataGridRow>
              ))}
          </DataGridBody>
        </DataGrid>
      </Box>
    </Box>
  );
}

// export default WorkerActivityHistory;
