import '@mui/material/Box'

declare module '@mui/material/Box' {
    interface BoxPropsVariantOverrides {
        panel: true
        panelHeader: true
        panelBody: true
    }
}
