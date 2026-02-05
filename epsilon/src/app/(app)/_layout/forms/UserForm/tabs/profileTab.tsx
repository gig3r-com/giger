import React from 'react';
import { Input, Radio, Segment, Select } from '../../inputs';
import { Stack } from '@mui/material';
import { PersonalInjury } from '@mui/icons-material';
import { BOOL } from '@/configs/BaseSelectFields';
import { NETWORKS, SUBNETWORKS, } from '@/configs/UserSelectFields';
import {
    USER_AFFILIATIONS_OPTIONS,
    USER_COMBAT_SKILLS_OPTIONS,
    USER_CYBERWARE_LEVELS_OPTIONS,
    USER_FACTION_RANKS_OPTIONS,
    USER_FACTIONS_OPTIONS,
    USER_HACKING_SKILLS_OPTIONS,
    USER_PERSONALITY_STATS_OPTIONS,
    USER_PROFESSIONS_OPTIONS,
    USER_ROLES_OPTIONS,
    USER_SPECIES_OPTIONS,
    USER_VIBE_LEVELS_OPTIONS,
    USER_VIBES_OPTIONS,
    USER_WEALTH_LEVELS_OPTIONS,
} from '@/configs/User';

export function ProfileTab() {
    return (
        <Stack sx={ { mt: 2, width: '100%' } } spacing={ 3 }>

            <Segment icon={ <PersonalInjury/> } title="Profile" description="Profile">
                <Input label="Handle" name="handle"/>
                <Radio label="Active" name="active" options={ BOOL }/>
                <Input label="Summary" name="summary" multiline minRows={ 3 }/>
                <Input label="Name" name="name"/>
                <Input label="Surname" name="surname"/>
                <Select label="Roles" name="roles" options={ USER_ROLES_OPTIONS }/>

                <Radio label="Species (Public)" name="speciesPublic" options={ USER_SPECIES_OPTIONS }/>
                <Radio label="Species (Actual)" name="speciesActual" options={ USER_SPECIES_OPTIONS }/>

                <Radio label="Vibe" name="vibe" options={ USER_VIBES_OPTIONS }/>
                <Radio label="Vibe level" name="vibeLevel" options={ USER_VIBE_LEVELS_OPTIONS }/>

                <Select label="Affiliation" name="affiliation" options={ USER_AFFILIATIONS_OPTIONS }/>
                <Select label="Profession" name="profession" options={ USER_PROFESSIONS_OPTIONS }/>
                <Select label="Wealth level" name="wealthLevel" options={ USER_WEALTH_LEVELS_OPTIONS }/>
                <Radio label="Cyberware Level" name="cyberwareLevel" options={ USER_CYBERWARE_LEVELS_OPTIONS }/>
            </Segment>

            <Segment icon={ <PersonalInjury/> } title="Faction">
                <Select label="Faction" name="faction" options={ USER_FACTIONS_OPTIONS }/>
                <Select label="Faction Rank (Actual)" name="factionRankActual" options={ USER_FACTION_RANKS_OPTIONS }/>
                <Select label="Faction Rank (Public)" name="factionRankPublic" options={ USER_FACTION_RANKS_OPTIONS }/>
            </Segment>

            <Segment title="Network">
                <Select label="Network" name="network" options={ NETWORKS }/>
                <Select label="Subnetwork" name="subnetwork" options={ SUBNETWORKS }/>
            </Segment>

            <Segment title="Skills">
                <Radio label="Combat skill" name="combatSkill" options={ USER_COMBAT_SKILLS_OPTIONS }/>
                <Radio label="Hacking skills" name="hackingSkills" options={ USER_HACKING_SKILLS_OPTIONS }/>
            </Segment>

            <Segment title="Sliders">
                <Radio label="Confrontationist vs Agreeable" name="confrontationistVsAgreeable"
                       options={ USER_PERSONALITY_STATS_OPTIONS }/>
                <Radio label="Coward vs Brave" name="cowardVsBrave" options={ USER_PERSONALITY_STATS_OPTIONS }/>
                <Radio label="Talkative vs Silent" name="talkativeVsSilent" options={ USER_PERSONALITY_STATS_OPTIONS }/>
                <Radio label="Thinker vs Doer" name="thinkerVsDoer" options={ USER_PERSONALITY_STATS_OPTIONS }/>
            </Segment>

            <Segment title="Misc">
                <Input label="Notes" name="epsilonNotes" multiline minRows={ 5 } color="epsilonPurple"/>
            </Segment>

        </Stack>
    );
}

export default ProfileTab;