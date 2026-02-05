'use client'

import React from 'react'
import { Typography, TypographyProps } from '@mui/material'

type GlitchTitleProps = TypographyProps & {
    children: string
}

export function GlitchTitle({
                                children,
                                ...typographyProps
                            }: GlitchTitleProps) {
    return (
        <Typography
            variant="h6"
            className="glitch"
            data-glitch={children}
            {...typographyProps}
        >
            {children}
        </Typography>
    )
}

export default GlitchTitle
