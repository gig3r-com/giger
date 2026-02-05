import React, { useMemo, useCallback, useRef } from 'react';
import { useField } from 'formik';
import { styled } from '@mui/material/styles';

import {
    SPECIES,
    CHAR_STAT,
    HACKER_STAT,
    COMBAT_STAT,
} from '@/configs/UserSelectFields';
import { USER_ROLES_OPTIONS } from '@/constants'
import labels from '../labels';

import Input from '@/components/forms/Input';
import RichTextInput from '@/components/forms/RichTextInput';
import Select from '@/components/forms/Select';
import ArrayInput from '@/components/forms/ArrayInput';
import ArraySelect from '@/components/forms/ArraySelect';
import Card from '@/components/forms/Card';

import { Stack, Divider, Button, Grid } from '@mui/material';

import FingerprintIcon from '@mui/icons-material/Fingerprint';
import GroupsIcon from '@mui/icons-material/Groups';
import MemoryIcon from '@mui/icons-material/Memory';

const Root = styled(Stack)(({ theme }) => ({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    gap: theme.spacing(2),
}));

const Row = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    gap: theme.spacing(2),
    alignItems: 'stretch',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}));


function MainTab() {
    const [idField] = useField('id');
    const [activeField, , activeHelpers] = useField('active');
    const cardColor = useMemo(() => activeField.value ? 'normal' : 'error', [activeField.value]);
    const setActive = useCallback(() => { return activeHelpers.setValue(true); }, [activeHelpers]);
    const setInactive = useCallback(() => { activeHelpers.setValue(false); }, [activeHelpers]);
    const activeToggleButton = useMemo(() => {
        if (activeField.value) return <Button color="primary" size="small" onClick={setInactive}>ACTIVE</Button>;
        return <Button color="error" size="small" onClick={setActive}>INACTIVE</Button>;
    }, [activeField.value, activeHelpers]);

    return (
        <Root direction="column">
            <Row>
                <Card variant={cardColor} icon={<FingerprintIcon />} title={`IDENTITY ID: ${idField.value}`} action={activeToggleButton}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <Input name="handle" label={labels.handle} />
                        </Grid>
                        <Grid size={6}>
                            <Input name="name" label={labels.name} />
                        </Grid>
                        <Grid size={6}>
                            <Input name="surname" label={labels.surname} />
                        </Grid>
                        <Grid size={6}>
                            <Select name="speciesPublic" label={labels.speciesPublic} options={SPECIES} />
                        </Grid>
                        <Grid size={6}>
                            <Select name="speciesActual" label={labels.speciesActual} options={SPECIES} />
                        </Grid>
                        <Grid size={12}>
                            <ArraySelect name="roles" label={labels.roles} options={USER_ROLES_OPTIONS} />
                        </Grid>
                        <Grid size={12}>
                            <RichTextInput name="summary" />
                        </Grid>
                    </Grid>
                </Card>

                <Card variant={cardColor} icon={<GroupsIcon/>} title="COMMUNITY">
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <Input name="vibe" label={labels.vibe}/>
                        </Grid>
                        <Grid size={6}>
                            <Input name="vibeLevel" label={labels.vibeLevel}/>
                        </Grid>
                        <Grid size={6}>
                            <Input name="profession" label={labels.profession}/>
                        </Grid>
                        <Grid size={6}>
                            <Input name="faction" label={labels.faction} />
                        </Grid>
                        <Grid size={6}>
                            <Input name="factionRankPublic" label={labels.factionRankPublic} />
                        </Grid>
                        <Grid size={6}>
                            <Input name="factionRankActual" label={labels.factionRankActual} />
                        </Grid>
                        <Grid size={6}>
                            <Input name="affiliation" label={labels.affiliation} />
                        </Grid>
                        <Grid size={12}>
                            <ArrayInput name="favoriteUsers" label={labels.favoriteUsers} />
                        </Grid>
                    </Grid>
                </Card>
            </Row>

            <Row>
                <Card variant={cardColor} icon={<MemoryIcon />} title="CHARACTER STATS">
                    <Stack direction="row" gap={2}>
                        <Stack direction="column" gap={2} flex={1}>
                            <Select name="confrontationistVsAgreeable" label={labels.confrontationistVsAgreeable} options={CHAR_STAT} />
                            <Select name="cowardVsBrave" label={labels.cowardVsBrave} options={CHAR_STAT} />
                            <Select name="talkativeVsSilent" label={labels.talkativeVsSilent} options={CHAR_STAT} />
                            <Select name="thinkerVsDoer" label={labels.thinkerVsDoer} options={CHAR_STAT} />
                        </Stack>
                        <Divider orientation="vertical" flexItem />
                        <Stack direction="column" gap={2} flex={1}>
                            <Input name="wealth" label={labels.wealth} />
                            <Input name="cyberwareLevel" label={labels.cyberwareLevel} />
                            <Select name="combatSkill" label={labels.combatSkill} options={COMBAT_STAT} />
                            <Select name="hackerSkill" label={labels.hackerSkill} options={HACKER_STAT} />
                        </Stack>
                    </Stack>
                </Card>

                <Card variant="notes" title="EPSILON NOTES">
                    <Input
                        name="epsilonNotes"
                        label="Notes"
                        multiline
                        minRows={7}
                    />
                    <ArrayInput
                        name="epsilonPlots"
                        label="Plots"
                    />
                </Card>
            </Row>

        </Root>
    );
}

export default MainTab;
