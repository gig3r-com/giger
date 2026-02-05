import { Stack } from '@mui/material';
import MessageWrapper from './Message/MessageWrapper';
import { useField } from 'formik';

export function MessagesList() {
    const [messages] = useField('messages');
    const [{ value }] = useField('epsilonMainParticipant');

    return (
        <Stack direction="column" width="100%" height="100%" padding={ 1 } paddingTop={ 0 } paddingRight={ 3 }>
            { messages.value.map((msg, index) => (
                <MessageWrapper index={ index } side={ msg.sender === value ? 'left' : 'right' }/>
            )) }
        </Stack>
    );
}