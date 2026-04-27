"use client"

import { useEffect, useState, useTransition } from "react"
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Box,
  Collapse,
  Alert,
  Stack,
} from "@mui/material"

const MOCK_LOGIN_AVAILABLE =
  process.env.NEXT_PUBLIC_ENABLE_MOCK_LOGIN === "true" ||
  process.env.NODE_ENV !== "production"

type MockLoginOption = {
  key: string
  label: string
  username: string
  password: string
  description: string
  redirectTo?: string
}

const MOCK_IDENTITIES: MockLoginOption[] = [
  {
    key: "operator",
    label: "Operator Console",
    username: "mock-operator",
    password: "mock-operator",
    description: "Loads the dashboard stack without upstream data.",
  },
  {
    key: "police",
    label: "OMG Liaison",
    username: "mock-police",
    password: "mock-police",
    description: "Drops you inside the police terminals for UI work.",
    redirectTo: "/sector/police/database",
  },
]

export default function LoginForm({
  action,
  redirectTo,
  error,
}: {
    action: (formData: FormData) => Promise<void>
    redirectTo: string
    error?: string
}) {
  const [mockPanelOpen, setMockPanelOpen] = useState(false)
  const [mockError, setMockError] = useState<string | null>(null)
  const [isMockPending, startMockTransition] = useTransition()

  useEffect(() => {
    if (!MOCK_LOGIN_AVAILABLE) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.code === "KeyM") {
        event.preventDefault()
        setMockPanelOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const triggerMockLogin = (option: MockLoginOption) => {
    if (!MOCK_LOGIN_AVAILABLE) return
    setMockError(null)

    startMockTransition(() => {
      const fd = new FormData()
      fd.set("username", option.username)
      fd.set("password", option.password)
      fd.set("redirectTo", option.redirectTo ?? redirectTo)
      fd.set("provider", "mock")

      action(fd).catch((err) => {
        const message =
          err instanceof Error ? err.message : "Mock login failed unexpectedly."
        setMockError(message)
      })
    })
  }

  return (
    <Box sx={{ minHeight: "calc(100dvh - 64px)", display: "grid", placeItems: "center", p: 2 }}>
      <Card elevation={6} component="form" action={action} className="panel notch" sx={{ width: 440, maxWidth: "100%" }}>
        <CardContent>
          <Typography variant="h5" className="glitch" data-glitch="ACCESS TERMINAL" gutterBottom>
                        ACCESS TERMINAL
          </Typography>
          <div className="caution-bar" />
          <Typography variant="body2" sx={{ mt: 1.5, mb: 2, opacity: .8 }}>
                        Authenticate to enter the system.
          </Typography>

          <input type="hidden" name="redirectTo" value={redirectTo} />

          <TextField
            name="username"
            label="Username"
            size="small"
            fullWidth
            margin="dense"
            required
            autoComplete="username"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            size="small"
            fullWidth
            margin="dense"
            required
            autoComplete="current-password"
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error === "CredentialsSignin" ? "Invalid username or password." : "Sign-in failed."}
            </Typography>
          )}
          {MOCK_LOGIN_AVAILABLE && (
            <Collapse in={mockPanelOpen} unmountOnExit>
              <Alert severity="info" variant="outlined" sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Mock access unlocked
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Use these personas when the upstream auth service is offline. Toggle with Ctrl + Shift + M.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 1.5 }}>
                  {MOCK_IDENTITIES.map((option) => (
                    <Button
                      key={option.key}
                      variant="outlined"
                      color="secondary"
                      disabled={isMockPending}
                      onClick={() => triggerMockLogin(option)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </Stack>
                <Stack spacing={0.25} sx={{ mt: 1, opacity: 0.8 }}>
                  {MOCK_IDENTITIES.map((option) => (
                    <Typography key={`${option.key}-desc`} variant="caption">
                      {option.label}: {option.description}
                    </Typography>
                  ))}
                </Stack>
                {mockError && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {mockError}
                  </Typography>
                )}
              </Alert>
            </Collapse>
          )}
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button type="submit" variant="contained" fullWidth>
                        Jack in
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
