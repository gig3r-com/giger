'use client'

import {
  Typography, Stack, Button, Paper 
} from "@mui/material"
import AppModeSelect from '@/components/common/AppModeSelect';

export default function DashboardPage() {
  return (
    <Stack spacing={1}>
      <Typography variant="h4" className="glitch" data-glitch="CONTROL HUB">
                CONTROL HUB
      </Typography>

      <Paper className="panel notch" sx={{ p: 3 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
                    Welcome back. Systems nominal.
        </Typography>
        <AppModeSelect />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
          <Button>Deploy Node</Button>
          <Button color="secondary">Open Console</Button>
          <Button variant="outlined">Diagnostics</Button>
        </Stack>
      </Paper>

    </Stack>
  )
}
