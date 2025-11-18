import React from 'react';

import { BOOL } from '@/configs/BaseSelectFields';
import {
    SPECIES,
    CHAR_STAT,
    NETWORKS,
    SUBNETWORKS,
    HACKER_STAT,
    COMBAT_STAT,
    ROLES,
} from '@/configs/UserSelectFields';
import labels from '../labels';

import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import ArrayInput from '@/components/forms/ArrayInput';
import ArraySelect from '@/components/forms/ArraySelect';
import Section from '@/components/forms/Section';

import { Stack, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(2),
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

const NotesRow = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    gap: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}));

function MainTab() {
    return (
        <Root direction="column">
            <Row>
                <Section title="IDENTITY" direction="column">
                    <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
                        <Input name="handle" label={labels.handle} />
                        <Select name="active" label={labels.active} options={BOOL} />
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
                        <Input name="name" label={labels.name} />
                        <Input name="surname" label={labels.surname} />
                    </Stack>
                    <ArraySelect name="roles" label={labels.roles} options={ROLES} />
                </Section>

                <Section title="PROFILE" direction="column">
                    <Input name="affiliation" label={labels.affiliation} />
                    <Input name="profession" label={labels.profession} />
                    <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
                        <Input name="wealth" label={labels.wealth} />
                        <Input name="cyberwareLevel" label={labels.cyberwareLevel} />
                    </Stack>
                </Section>

                <Section title="COMMUNITY" direction="column">
                    <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
                        <Input name="vibe" label={labels.vibe} />
                        <Input name="vibeLevel" label={labels.vibeLevel} />
                    </Stack>
                    <Divider flexItem sx={{ my: 1 }} />
                    <ArrayInput name="favoriteUsers" label={labels.favoriteUsers} />
                </Section>
            </Row>

            <Row>
                <Section title="CHARACTER STATS" direction="column">
                    <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
                        <Select
                            name="combatSkill"
                            label={labels.combatSkill}
                            options={COMBAT_STAT}
                        />
                        <Select
                            name="hackerSkill"
                            label={labels.hackerSkill}
                            options={HACKER_STAT}
                        />
                    </Stack>
                    <Divider flexItem sx={{ my: 1 }} />
                    <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
                        <Select
                            name="confrontationistVsAgreeable"
                            label={labels.confrontationistVsAgreeable}
                            options={CHAR_STAT}
                        />
                        <Select
                            name="cowardVsBrave"
                            label={labels.cowardVsBrave}
                            options={CHAR_STAT}
                        />
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
                        <Select
                            name="talkativeVsSilent"
                            label={labels.talkativeVsSilent}
                            options={CHAR_STAT}
                        />
                        <Select
                            name="thinkerVsDoer"
                            label={labels.thinkerVsDoer}
                            options={CHAR_STAT}
                        />
                    </Stack>
                </Section>

                <Stack direction="column" gap={2} sx={{ flex: 1 }}>
                    <Section title="SPECIES" direction="column">
                        <Select
                            name="speciesPublic"
                            label={labels.speciesPublic}
                            options={SPECIES}
                        />
                        <Select
                            name="speciesActual"
                            label={labels.speciesActual}
                            options={SPECIES}
                        />
                    </Section>

                    <Section title="NETWORK" direction="column">
                        <Select
                            name="network"
                            label={labels.network}
                            options={NETWORKS}
                        />
                        <Select
                            name="subnetwork"
                            label={labels.subnetwork}
                            options={SUBNETWORKS}
                        />
                    </Section>
                </Stack>

                <Section title="FACTION" direction="column">
                    <Input name="faction" label={labels.faction} />
                    <Input
                        name="factionRankPublic"
                        label={labels.factionRankPublic}
                    />
                    <Input
                        name="factionRankActual"
                        label={labels.factionRankActual}
                    />
                </Section>
            </Row>

            <Section title="EPSILON NOTES" direction="column">
                <NotesRow>
                    <Input
                        name="epsilonNotes"
                        label="Notes"
                        multiline
                        minRows={4}
                        sx={{ flex: 1 }}
                    />
                    <Input
                        name="epsilonPlots"
                        label="Plots"
                        multiline
                        minRows={4}
                        sx={{ flex: 1 }}
                    />
                </NotesRow>
            </Section>
        </Root>
    );
}

export default MainTab;
