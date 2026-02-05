import React from 'react';
import { ConversationOverview } from './ConversationOverview';
import { ConversationParticipants } from './ConversationParticipants';
import { MessagesList } from './MessagesList';
import { Box, Stack } from '@mui/material';

function AllTabs() {

    return (
        <Stack spacing={ 2 } direction="row">
            <Stack sx={ { borderRight: 1, borderColor: 'divider', flex: 1 } }>
                <ConversationOverview/>
                <Box sx={ { p: 1 } }/>
                <ConversationParticipants/>
            </Stack>
            <Box sx={ { flex: 2 } }>
                <MessagesList/>
            </Box>
        </Stack>
    );
}

export default AllTabs;