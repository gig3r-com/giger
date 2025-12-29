"use client"

import { Container, Typography, Paper, Button, Stack } from "@mui/material"
import AppModeSelect from '@/components/common/AppModeSelect';

export default function DashboardView({
  userName,
  signOutAction,
}: {
    userName: string
    signOutAction: () => void
}) {
  return (
    <Container sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" className="glitch" data-glitch="CONTROL HUB">
                    CONTROL HUB
        </Typography>
        <form action={signOutAction}>
          <Button type="submit" variant="outlined">Sign out</Button>
        </form>
      </Stack>

      <Paper className="panel notch" sx={{ p: 3 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
                    Welcome, <strong>{userName}</strong>.
        </Typography>

??
        <AppModeSelect />


        <Typography variant="body2" sx={{ opacity: .8 }}>
                    Systems online. Choose your next operation.
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 3 }}>
          <Button>Deploy Node</Button>
          <Button color="secondary">Open Console</Button>
          <Button variant="outlined">Diagnostics</Button>
        </Stack>
      </Paper>
    </Container>
  )
}
