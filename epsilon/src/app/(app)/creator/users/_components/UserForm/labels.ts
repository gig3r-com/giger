import {Chip, Stack} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import {alpha} from "@mui/material/styles";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Select from "@/components/forms/Select";
import {WEALTH_LEVELS} from "@/configs/UserSelectFields";
import React from "react";

const labels = {
    handle: 'Handle',
    active: 'Active',
    name: 'Name',
    surname: 'Surname',
    roles: 'Roles',

    faction: 'Faction',
    factionRankPublic: 'Rank public',
    factionRankActual: 'Rank actual',

    speciesPublic: 'Species public',
    speciesActual: 'Species actual',
    vibe: 'vibe',
    vibeLevel: 'vibeLevel',
    favoriteUsers: 'favoriteUsers',

    confrontationistVsAgreeable: 'Confrontationist ↔ Agreeable',
    cowardVsBrave: 'Coward ↔ Brave',
    talkativeVsSilent: 'Talkative ↔ Silent',
    thinkerVsDoer: 'Thinker ↔ Doer',

    affiliation: 'affiliation',
    profession: 'profession',
    wealth: 'Wealth level',
    cyberwareLevel: 'cyberwareLevel',

    network: 'Network',
    subnetwork: 'Subnetwork',
    combatSkill: 'Combat skill',
    hackerSkill: 'Hacker skill',
    hackerName: 'Hacker name',
    personalIce: 'personalIce',
    exploits: 'Exploits',

    /*
     * *******************
     * Banking
     * *******************
     */



    /*
     * *******************
     * Epsilon
     * *******************
     */
    chatNotesTitle: 'CONVERSATIONS NOTES',
    chatNotesDescription: 'How a character speaks, writes, common sayings.',
    epsilonConversationNotes: 'Conversations notes',
    epsilonConversationNotesPlaceholder: `How this character speaks/writes?\nSayings: "...", "...", "..."`,

    plotNotesTitle: 'PLOT NOTES',
    plotNotesDescription: `Character's plots, hooks, etc.`,
    epsilonPlots: `Character's plots`,
    epsilonPlotsPlaceholder: `* Plot#1\n* Plot#2`,

    epsilonConversationsNotes: '',
}

export default labels;