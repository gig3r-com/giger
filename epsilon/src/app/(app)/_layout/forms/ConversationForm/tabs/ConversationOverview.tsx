import { Input, Radio, Segment } from '../../inputs';
import { BOOL } from '@/configs/BaseSelectFields';

export function ConversationOverview() {
    return (
        <Segment title="General" labelWidth={ 10 }>
            <Input name="title" label="Title" description="Optional display title" labelWidth={ 50 }/>
        </Segment>
    );
}
