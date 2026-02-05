'use client'

import * as React from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline, createTheme, alpha } from '@mui/material'

/* ---------------- Emotion cache ---------------- */
function createEmotionCache() {
    const cache = createCache({ key: 'mui', prepend: true })
    cache.compat = true
    return cache
}

/* ---------------- Colors ---------------- */
export const colors = {
    graphite0: '#07090c',
    graphite1: '#0b0f14',
    graphite2: '#11161d',
    graphite3: '#151c24',
    steel: '#9aa7b2',
    bioAcid: '#b6ff2e',
    cpYellow: '#f9f002',        // Time ?
    cpPink: '#FF0178',          // Hacking
    cpCyan: '#00FFF6',          // Conversations
    epsilonPurple: '#D400FF',   // Epsilon notes etc
}

/* ---------------- Theme typing ---------------- */
declare module '@mui/material/styles' {
    interface Palette {
        panel: {
            bg: string
            headerBg: string
        }
    }

    interface PaletteOptions {
        panel?: {
            bg?: string
            headerBg?: string
        }
    }
}

/* ---------------- Theme ---------------- */
const theme = createTheme({
    palette: {
        mode: 'dark',

        primary: { main: colors.bioAcid },
        secondary: { main: colors.cpCyan },

        // App background: more glassy
        background: {
            default: alpha(colors.graphite0, 0.95),
            paper: alpha(colors.graphite1, 0.9),
        },

        text: {
            primary: '#d7e3ea',
            secondary: alpha('#d7e3ea', 0.72),
        },

        divider: alpha('#d7e3ea', 0.08),

        // Panels: less glossy, more solid
        panel: {
            bg: alpha(colors.graphite2, 0.85),
            headerBg: colors.graphite3,
        },
    },

    shape: { borderRadius: 12 },

    typography: {
        fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        button: { fontWeight: 700, letterSpacing: 0.3, textTransform: 'none' },
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: (theme) => ({
                '*': { scrollbarWidth: 'thin' },
            }),
        },

        MuiPaper: {
            styleOverrides: { root: { background: alpha(colors.graphite2, 0.85) } },
        },
    },
})

/* ---------------- ThemeRegistry Component ---------------- */
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
