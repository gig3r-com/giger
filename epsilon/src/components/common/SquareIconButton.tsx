'use client'

import React from 'react'
import { IconButton, IconButtonProps } from '@mui/material'

export function SquareIconButton({
                                     sx,
                                     ...props
                                 }: IconButtonProps) {
    return (
        <IconButton
            {...props}
            sx={{
                borderRadius: 1,          // 👈 slightly squared
                width: 36,
                height: 36,
                ...sx,
            }}
        />
    )
}

export default SquareIconButton
