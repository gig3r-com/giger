import React from 'react';
import {
  Stack,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from 'dayjs';
import DatePicker from '@/components/conversations/Message/DatePicker';
import { useConversationForm } from '@/components/forms/ConversationFormProvider';
import HackingSelect from '@/components/conversations/Message/HackingSelect';
import SenderSelect from '@/components/conversations/Message/SenderSelect';

export interface MessageControlsProps {

}

function MessageControls(props: MessageControlsProps) {
  const { sender, hack, update, participants, date } = props;
  const form = useConversationForm();
  const valueAsDayjs: Dayjs | null = date ? dayjs(date) : null;
  const hackers = form.values.hackers ?? [];
  const isHacked = !!hack?.by;

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={ 1 } alignItems="stretch">
        <HackingSelect
          isHacked={isHacked}
          hackers={hackers}
          changeIsHacked={(next) => {
            if (!next) {
              update({ hack: null });
            } else {
              const first = hackers[0] ?? '';
              update({ hack: { by: first, note: '', confidence: 0.5 } });
            }
          }}
        />
        <SenderSelect sender={ sender ?? '' } participants={ participants } changeSender={ (e: SelectChangeEvent<string>) => update({ sender: e.target.value }) } />
      </Stack>
    </>
  );
}

export default MessageControls;