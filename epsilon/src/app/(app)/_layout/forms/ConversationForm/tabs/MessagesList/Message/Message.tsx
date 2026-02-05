import React, { useMemo } from 'react';
import { Box, Divider, Stack } from '@mui/material';
import { DenseInput, DenseSelect } from '../../../../inputs';
import MessageNote from './MessageNote';
import MessageBody from './MessageBody';
import Date from './Date';
import { MESSAGE_TYPE } from '@/configs/ConversationSelectFields';
import { useField } from 'formik';
import { colors } from '@/components/ThemeRegistry';
import { alpha } from '@mui/material/styles';

type MessagesListProps = {
    index: number;
    side: 'left' | 'right';
}

export function Message(props: MessagesListProps) {
    const { index, side } = props;
    const [hacker] = useField(`messages[${ index }].hacker`);
    const [participants] = useField('participants');
    const participantsOptions = useMemo(() => participants.value.map(user => ({
        label: user,
        value: user,
    })), [participants]);
    const { before, after } = useMemo(() => {
        if (side === 'left') return {
            before: `linear-gradient(90deg,${ alpha(colors.bioAcid, 0.1) } 0%, transparent 100%)`,
            after: `linear-gradient(90deg,${ alpha(colors.graphite0, 0.2) } 0%, transparent 100%)`,
        }
        if (side === 'right') return {
            before: `linear-gradient(90deg,transparent 0%, ${ alpha(colors.bioAcid, 0.1) } 100%)`,
            after: `linear-gradient(90deg,transparent 0%, ${ alpha(colors.graphite0, 0.2) } 100%)`,
        }
        return { before: ``, after: `` };
    }, [side]);
    const { left, right } = useMemo(() => {
        if (side === 'left') return { left: -32, right: 0 };
        if (side === 'right') return { left: 0, right: -32 };
        return { left: 0, right: 0 };
    }, [side]);

    return (
        <Stack direction="column" width="100%"
               sx={ {
                   flex: 4, p: 1, borderRadius: 1, border: '1px solid', borderColor: 'divider',
                   position: 'relative',
                   '&::before': {
                       zIndex: -1,
                       content: '""',
                       position: 'absolute',
                       left, right, top: -8, bottom: -8,
                       background: before,
                   },
                   '&::after': {
                       zIndex: -1,
                       content: '""',
                       position: 'absolute',
                       left: 0, right: 0, top: 0, bottom: 0,
                       borderRadius: 1,
                       background: after,
                   },
               } }
        >
            <Stack direction="row" spacing={ 1 }>
                <div style={ { flex: 2 } }/>
                <Date index={ index }/>
            </Stack>
            <Stack direction="row" spacing={ 1 }>
                <Box flex="1">
                    <DenseSelect label="Type" name={ `messages[${ index }].type` } options={ MESSAGE_TYPE }/>
                </Box>
                <Box flex="2">
                    <DenseSelect label="Sender" name={ `messages[${ index }].sender` } options={ participantsOptions }/>
                </Box>
                <Box flex="2">
                    <DenseInput label="Hacker" name={ `messages[${ index }].hacker` }
                                color={ hacker.value ? 'cpPink' : 'graphite2' }/>
                </Box>
            </Stack>
            <Divider sx={ { mt: 1, mb: 2 } }/>
            <MessageBody index={ index }/>
            <MessageNote index={ index }/>
        </Stack>
    );
}

export default Message;