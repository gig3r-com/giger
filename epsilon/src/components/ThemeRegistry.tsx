'use client'

import * as React from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import {
  ThemeProvider, CssBaseline, createTheme, alpha
} from '@mui/material'

function createEmotionCache() {
  const cache = createCache({ key: 'mui', prepend: true })
  cache.compat = true
  return cache
}

const colors = {
  graphite0: '#07090c',
  graphite1: '#0b0f14',
  graphite2: '#11161d',
  graphite3: '#151c24',
  steel: '#9aa7b2',
  bioAcid: '#b6ff2e',
  cpYellow: '#f9f002',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: colors.bioAcid },
    secondary: { main: colors.cpYellow },
    background: {
      default: colors.graphite0,
      paper: alpha(colors.graphite2, 0.9),
    },
    text: {
      primary: '#d7e3ea',
      secondary: alpha('#d7e3ea', 0.72),
    },
    divider: alpha('#d7e3ea', 0.08),
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    button: { fontWeight: 700, letterSpacing: 0.3, textTransform: 'none' },
  },
  components: {
    MuiButtonGroup: {
      styleOverrides: {
        grouped: {
          paddingTop: 5,
          paddingBottom: 5,
        },
      },
    },

    // ⬇️ Global CSS + Scrollbar styling
    MuiCssBaseline: {
      styleOverrides: (theme) => {
        const track = alpha(theme.palette.text.primary, 0.06);
        const thumb = alpha(theme.palette.text.primary, 0.30);
        const thumbHover = alpha(theme.palette.text.primary, 0.50);

        return {
          // keep your CSS vars
          ':root': {
            '--cp-yellow': colors.cpYellow,
            '--bio-acid': colors.bioAcid,
            '--g0': colors.graphite0,
            '--g1': colors.graphite1,
            '--g2': colors.graphite2,
            '--g3': colors.graphite3,
            '--drawer-width': '240px',
          },

          // Firefox scrollbars
          '*': {
            scrollbarWidth: 'thin',
            scrollbarColor: `${thumb} ${track}`, // thumb track
          },

          // WebKit/Chromium scrollbars
          '*::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '*::-webkit-scrollbar-track': {
            backgroundColor: track,
            borderRadius: 8,
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: thumb,
            borderRadius: 8,
            border: '2px solid transparent',
            backgroundClip: 'content-box',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: thumbHover,
          },

          // Optional: prevent layout shift when scrollbars appear
          html: {
            scrollbarGutter: 'stable',
          },

          // Touch devices: slightly larger targets
          '@media (pointer: coarse)': {
            '*::-webkit-scrollbar': { width: 10, height: 10 },
          },
        };
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to bottom, rgba(8,12,16,.9), rgba(8,12,16,.95))',
          borderBottom: `1px solid ${alpha(colors.bioAcid, .5)}`,
          boxShadow: `0 0 16px ${alpha(colors.bioAcid,.18)}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(180deg, rgba(17,22,29,.9), rgba(21,28,36,.9))',
          border: `1px solid ${alpha(colors.bioAcid,.22)}`,
          boxShadow: `0 0 18px ${alpha(colors.bioAcid,.10)}`,
        },
      },
    },

    // Inputs / Selects / Pickers cohesiveness
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          background:
            'linear-gradient(180deg, rgba(17,22,29,.6), rgba(21,28,36,.6))',
          '& fieldset': {
            borderColor: alpha(theme.palette.primary.main, 0.35),
          },
          '&:hover fieldset': {
            borderColor: alpha(theme.palette.primary.main, 0.6),
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.18)}`,
          },
          paddingTop: 4,
          paddingBottom: 4,
        }),
        input: {
          paddingTop: 5,
          paddingBottom: 5,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: alpha(theme.palette.text.primary, 0.8),
          '&.Mui-focused': { color: theme.palette.primary.main },
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: ({ theme }) => ({
          color: alpha(theme.palette.text.primary, 0.9),
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          background:
            'linear-gradient(180deg, rgba(17,22,29,.95), rgba(21,28,36,.95))',
          border: `1px solid ${alpha(theme.palette.primary.main, .22)}`,
          boxShadow: `0 0 18px ${alpha(theme.palette.primary.main,.10)}`,
        }),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: alpha(theme.palette.text.primary, 0.12),
        }),
      },
    },
    MuiToggleButton: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
            color: theme.palette.primary.main,
            borderColor: alpha(theme.palette.primary.main, 0.48),
          },
          '&.Mui-selected:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.18),
          },
          '&.Mui-selected.Mui-disabled': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            color: alpha(theme.palette.primary.main, 0.6),
            borderColor: alpha(theme.palette.primary.main, 0.24),
          },
        }),
      },
    },
    MuiToggleButtonGroup: {
      defaultProps: {
        color: 'primary',
      },
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = React.useState(() => createEmotionCache())

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{ __html: Object.values(cache.inserted).join(' ') }}
    />
  ))

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
