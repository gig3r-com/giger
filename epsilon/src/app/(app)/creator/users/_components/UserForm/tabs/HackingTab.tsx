import React from 'react';
import { PERSONAL_ICE, HACKER_STAT, } from '@/configs/UserSelectFields';
import labels from '../labels';

import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import ArrayInput from '@/components/forms/ArrayInput';
import Section from '@/components/forms/Section';
import { Box } from '@mui/material';

function HackingTab() {
    return (
        <Box sx={{ pt: 2 }}>
            <Section title="Hacking" direction="column">
                <Select name="personalIce" label={labels.personalIce} options={PERSONAL_ICE} />
                <Select name="hackerSkill" label={labels.hackerSkill} options={HACKER_STAT} />
                <Input name="hackerName" label={labels.hackerName} />
                <ArrayInput name="exploits" label={labels.exploits} />
            </Section>
        </Box>
    );
}

export default HackingTab;