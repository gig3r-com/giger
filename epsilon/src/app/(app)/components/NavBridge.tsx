"use client";

import React from "react";
import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";

/**
 * NavBridge wraps SecNavMenu and renders:
 *
 *  ---------[  children  ]-
 *
 * Left rail fills remaining space, right rail is short.
 * The dashes do NOT go behind the buttons.
 */
export default function NavBridge({ children }: { children: React.ReactNode }) {
    return (
        <Box
            sx={(theme) => {
                const acid = `var(--bio-acid, ${theme.palette.primary.main})`;
                const glow = alpha(theme.palette.primary.main, 0.45);

                return {
                    display: "flex",
                    alignItems: "center",
                    // This is crucial: makes the bridge fill available space
                    flex: 1,
                    minWidth: 80,
                    mx: 1,

                    // LEFT RAIL – takes all remaining width
                    "& .rail-left": {
                        flex: 1,
                        height: 2,
                        backgroundImage: `repeating-linear-gradient(
              90deg,
              ${acid} 0 14px,
              transparent 14px 20px
            )`,
                        opacity: 0.85,
                        filter: `drop-shadow(0 0 4px ${glow})`,
                    },

                    // RIGHT RAIL – short tail after capsule
                    "& .rail-right": {
                        width: 32,
                        height: 2,
                        backgroundImage: `repeating-linear-gradient(
              90deg,
              ${acid} 0 14px,
              transparent 14px 20px
            )`,
                        opacity: 0.85,
                        filter: `drop-shadow(0 0 4px ${glow})`,
                    },

                    // CAPSULE AROUND SecNavMenu (no dashes behind it)
                    "& .capsule": {
                        display: "flex",
                        alignItems: "center",
                        mx: 0.75,
                        position: "relative",
                    },

                    "& .capsule-left": {
                        width: 10,
                        height: "50px",
                        marginRight: '-14px',
                        alignSelf: "center",
                        borderLeft: `2px solid ${acid}`,
                        borderTop: `2px solid ${acid}`,
                        borderBottom: `2px solid ${acid}`,
                        borderRadius: "4px 0 0 4px",
                        filter: `drop-shadow(0 0 4px ${glow})`,
                    },

                    "& .capsule-right": {
                        width: 10,
                        height: "50px",
                        marginLeft: '-14px',
                        alignSelf: "center",
                        borderRight: `2px solid ${acid}`,
                        borderTop: `2px solid ${acid}`,
                        borderBottom: `2px solid ${acid}`,
                        borderRadius: "0 4px 4px 0",
                        filter: `drop-shadow(0 0 4px ${glow})`,
                    },

                    "& .capsule-content": {
                        // children (SecNavMenu) stay fully interactive
                        display: "flex",
                        alignItems: "center",
                        px: 0.75,
                    },

                    // very subtle scanlines inside the bridge zone only
                    "& .scanlines": {
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        backgroundImage: `repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 6px,
              ${alpha(theme.palette.primary.main, 0.04)} 7px
            )`,
                        opacity: 0.5,
                        mixBlendMode: "soft-light",
                    },
                };
            }}
        >
            {/* LEFT rail fills space between MainNav and capsule */}
            <Box className="rail-left" />

            {/* Capsule with SecNavMenu inside */}
            <Box className="capsule">
                <Box className="capsule-left" />
                <Box className="capsule-content">{children}</Box>
                <Box className="capsule-right" />
            </Box>

            {/* Short right rail */}
            <Box className="rail-right" />
        </Box>
    );
}
