import { DenseSelect, Segment } from '../../inputs';
import { Box } from '@mui/material';
import { useField } from 'formik';
import { useMemo } from 'react';

export function ConversationParticipants() {
    const [participants] = useField('participants');
    const participantsOptions = useMemo(() => participants.value.map(user => ({
        label: user,
        value: user,
    })), [participants]);

    return (
        <>
            <Segment title="Participants" labelWidth={ 10 }>
                <Box sx={ { mt: '8px' } }>
                    <DenseSelect label="Main" name="epsilonMainParticipant" options={ participantsOptions }
                                 color="epsilonPurple"/>
                </Box>
                <Box sx={ { mt: '8px' } }>
                    <DenseSelect label="Participants" name="participants" options={ participantsOptions }/>
                </Box>
                <Box sx={ { mt: '8px' } }>
                    <DenseSelect label="Anonymized" name="anonymizedUsers" options={ participantsOptions }/>
                </Box>
            </Segment>
            <Box sx={ { p: 1 } }/>
            <Segment title="Hackers" labelWidth={ 10 }>
                <DenseSelect name="hackers" options={ participantsOptions }/>
            </Segment>
        </>
    );
}
