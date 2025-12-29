import React from 'react';
import { Avatar, Box, Grid, Stack, Typography } from '@mui/material';
import { ApiUser } from '@/app/api/mappers/user';
import EmptyTab from './EmptyTab';
import SectionCard from '@/components/common/SectionCard';
import InfoRow from '@/components/common/InfoRow';
import StatLine from '@/components/common/StatLine';
import GigReputationBlock from './GigReputationBlock';

const titleCase = (s?: string | null) =>
  (s ?? '')
    .toLowerCase()
    .replace(/(^|\s|_|-)+(\w)/g, (_, __, c) => ` ${c.toUpperCase()}`)
    .trim() || '—';

const fmt = (v?: string | number | null) =>
  v === null || v === undefined || v === '' ? '—' : String(v);

function OverviewTab({ user, fullName }: { user: ApiUser | null, fullName: string }) {

  if (!user) {
    return <EmptyTab />

  }

  return (
    <Grid container spacing={ 2 } sx={{ width: '100%' }}>
      <Grid item xs={ 12 }>
        <SectionCard title="Profile" right={
            <Typography variant="caption" color="text.secondary">
              {user.active ? 'Active' : 'Inactive'}
              {user.hasPlatinumPass ? ' • Platinum' : ''}
              {user.highSecurity ? ' • High Security' : ''}
            </Typography>
          }
        >
          <Stack direction="row" spacing={ 2 } alignItems="center" sx={{ width: '100%' }}>
            <Avatar sx={{ width: 48, height: 48 }}>
              { (user.name?.[0] || user.handle?.[0] || '?').toUpperCase() }
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
                { fullName }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                @{ user.handle }
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ mt: 2, width: '100%' }}>
            <InfoRow label="Type (Actual)" value={titleCase(user.typeActual)} />
            <InfoRow label="Type (Public)" value={titleCase(user.typePublic)} />
            <InfoRow label="Faction" value={titleCase(user.faction)} />
            <InfoRow label="Faction Rank (Actual)" value={fmt(user.factionRankActual)} />
            <InfoRow label="Faction Rank (Public)" value={fmt(user.factionRankPublic)} />
            <InfoRow label="Vibe" value={titleCase(user.vibe)} />
            <InfoRow label="Vibe Function" value={fmt(user.vibeFunction)} />
            <InfoRow label="Vibe Engagement" value={titleCase(user.vibeEngagement)} />
            <InfoRow label="Wealth Level" value={titleCase(user.wealthLevel)} />
          </Box>
        </SectionCard>
      </Grid>

      <Grid item xs={ 12 }>
        <Stack direction="column" spacing={ 2 }>
          <SectionCard title="Network">
            <InfoRow label="Network" value={ fmt(user.networkName) } />
            <InfoRow label="Subnetwork" value={ fmt(user.subnetworkName) } />
            <InfoRow label="Admin" value={ fmt(user.networkAdminName) } />
          </SectionCard>
          <SectionCard title="Reputation & Access">
            <InfoRow label="Insured Amount" value={ fmt(user.insuredAmount) } />
            <InfoRow label="Reputation Note" value={ fmt(user.reputationDescription) } />
            <InfoRow label="Platinum Pass" value={ user.hasPlatinumPass ? 'Yes' : 'No' } />
            <InfoRow label="High Security" value={ user.highSecurity ? 'Yes' : 'No' } />
          </SectionCard>
        </Stack>
      </Grid>

      <Grid item xs={ 12 }>
      </Grid>

      <Grid item xs={12}>
        <Stack direction="column" spacing={ 2 }>
          <GigReputationBlock
            fixer={user.gigReputation?.FIXER}
            hacking={user.gigReputation?.HACKING}
            wellbeing={user.gigReputation?.WELLBEING}
            killer={user.gigReputation?.KILLER}
            max={5}
          />
          <SectionCard title="Stats">
            <Stack spacing={1} sx={{ width: '100%' }}>
              <StatLine label="Cyberware Level" value={user.cyberwareLevel} max={3} />
              <StatLine label="Hacking Skills" value={user.hackingSkills} max={3} />
              <StatLine label="Combat Skill" value={user.combatSkill} max={3} />
              <StatLine label="Confrontationist vs Agreeable" value={user.confrontationistVsAgreeable} max={4} />
              <StatLine label="Coward vs Brave" value={user.cowardVsBrave} max={4} />
              <StatLine label="Talkative vs Silent" value={user.talkativeVsSilent} max={4} />
              <StatLine label="Thinker vs Doer" value={user.thinkerVsDoer} max={4} />
            </Stack>
          </SectionCard>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default OverviewTab;