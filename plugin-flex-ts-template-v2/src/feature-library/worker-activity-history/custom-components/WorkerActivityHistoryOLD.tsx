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

interface OwnProps {
  worker?: IWorker;
}

const WorkerActivityHistory = ({ worker }: OwnProps) => {
  return (
    <Box paddingX="space100" paddingTop="space130" paddingBottom="space160">
      <Box>
        <DataGrid aria-label="label1">
          <DataGridHead>
            <DataGridRow>
              <DataGridHeader>
                <Box display="flex" columnGap="space20">
                  Header
                  <UnsortedIcon decorative={false} title="sort column" />
                </Box>
              </DataGridHeader>
              <DataGridHeader>
                <Box display="flex" columnGap="space20">
                  Header
                  <UnsortedIcon decorative={false} title="sort column" />
                </Box>
              </DataGridHeader>
              <DataGridHeader>
                <Box display="flex" columnGap="space20" justifyContent="flex-end">
                  Header
                  <UnsortedIcon decorative={false} title="sort column" />
                </Box>
              </DataGridHeader>
            </DataGridRow>
          </DataGridHead>
          <DataGridBody>
            <DataGridRow>
              <DataGridCell>Content</DataGridCell>
              <DataGridCell>Content</DataGridCell>
              <DataGridCell>Content</DataGridCell>
            </DataGridRow>
            <DataGridRow>
              <DataGridCell>Content</DataGridCell>
              <DataGridCell>Content</DataGridCell>
              <DataGridCell>Content</DataGridCell>
            </DataGridRow>
            <DataGridRow>
              <DataGridCell>Content</DataGridCell>
              <DataGridCell>Content</DataGridCell>
              <DataGridCell>Content</DataGridCell>
            </DataGridRow>
          </DataGridBody>
        </DataGrid>
      </Box>
    </Box>
  );
};

export default WorkerActivityHistory;
