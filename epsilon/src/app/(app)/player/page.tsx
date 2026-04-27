'use client'

import React, {useMemo, useState} from 'react';
import { Paper, Stack, TextField, MenuItem } from "@mui/material";
import Preview from '@/components/common/Preview';
import {PlayerAppsConfig} from "@/playerApps.config";

function Page() {
    const [appMode, setAppMode] = useState('full');
    const [selectedApp, setSelectedApp] = useState(` `);
    const url = useMemo(() => {
        const filtered = PlayerAppsConfig.filter(app => app.value === selectedApp);
        if (!filtered?.length) return '';
        return filtered[0]?.url || '';
    }, [selectedApp]);

    return (
        <Stack direction="column" gap={3}>
            <Stack spacing={1}>
                <Paper className="panel notch" sx={{ p: 3 }}>
                    <Stack direction="row" spacing={2}>

                        <TextField fullWidth select size="small" value={appMode} label="App mode"
                                   onChange={({target}) => setAppMode(target?.value ? target.value : ` `)}
                        >
                            <MenuItem value="full">Full</MenuItem>
                            <MenuItem value="player-app">Player App Only</MenuItem>
                        </TextField>

                        <TextField fullWidth select size="small" value={selectedApp} label="Player app"
                                   onChange={({target}) => setSelectedApp(target?.value ? target.value : ` `)}
                        >
                            <MenuItem value={` `}>None</MenuItem>
                            {
                                PlayerAppsConfig.map(app => (
                                    <MenuItem key={app.value} value={app.value}>{ app.name }</MenuItem>
                                ))
                            }
                        </TextField>

                    </Stack>
                </Paper>

            </Stack>
            <Preview url={url} />
        </Stack>
    );
}

export default Page;