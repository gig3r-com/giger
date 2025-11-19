import React from 'react';
import { Stack } from '@mui/material';
import { PLOTS } from "@/configs/UserSelectFields";

import Input from "@/components/forms/Input";
import ArraySelect from "@/components/forms/ArraySelect";
import Card from "@/components/forms/Card";
import labels from "../../labels";

const ConversationsSummary = () => {
    return (
        <Stack direction="row" gap={2}>
            <Card variant="notes" title={labels.plotNotesTitle} subTitle={labels.plotNotesDescription}>
                <ArraySelect color="secondary" name="epsilonPlots" label={labels.epsilonPlots} options={PLOTS} />
            </Card>

            <Card variant="notes" title={labels.chatNotesTitle} subTitle={labels.chatNotesDescription}>
                <Input color="secondary" name="epsilonNotes" multiline minRows={2}
                       label={labels.epsilonConversationNotes} placeholder={labels.epsilonConversationNotesPlaceholder}
                />
            </Card>

            <Card variant="notes" title={labels.plotNotesTitle} subTitle={labels.plotNotesDescription}>
                <Input color="secondary" name="epsilonNotes" multiline minRows={2}
                       label={labels.epsilonPlots} placeholder={labels.epsilonPlotsPlaceholder}
                />
            </Card>
        </Stack>
    );
};

export default ConversationsSummary;
