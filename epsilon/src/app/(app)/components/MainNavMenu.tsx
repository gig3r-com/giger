"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stack, IconButton, Typography, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { MODES } from "./modesConfig";

export default function NavMenu() {
    const pathname = usePathname() || "/";
    const firstSegment = pathname.split("/")[1]; // "" | creator | director | player

    return (
        <Stack direction="row" spacing={0.5}>
            {MODES.map((mode) => {
                const isActive = firstSegment === mode.key;

                return (
                    <IconButton
                        key={mode.key}
                        component={Link}
                        href={mode.path}
                        disableRipple
                        aria-label={mode.description}
                        sx={(theme) => ({
                            // wtopione w AppBar – brak własnego „kafla”
                            borderRadius: 0,
                            height: "100%",
                            padding: theme.spacing(0.5, 1.5),
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.25,
                            textDecoration: "none",
                            color: "inherit",
                            backgroundColor: "transparent",
                            position: "relative",
                            overflow: "visible",

                            // lekkie podświetlenie tła tylko przy hover, a nie stały box
                            "&:hover": {
                                backgroundColor: alpha(
                                    theme.palette.background.paper,
                                    0.08
                                ),
                            },

                            "&:active": {
                                backgroundColor: alpha(
                                    theme.palette.background.paper,
                                    0.14
                                ),
                            },

                            // cyfrowy underline dla aktywnego trybu – zamiast boxa
                            "&::after": isActive
                                ? {
                                    content: '""',
                                    position: "absolute",
                                    left: "18%",
                                    right: "18%",
                                    bottom: 0,
                                    height: 2,
                                    borderRadius: 999,
                                    backgroundImage: `linear-gradient(
                      to right,
                      ${alpha(theme.palette.primary.main, 0.2)},
                      ${alpha(theme.palette.primary.main, 0.9)},
                      ${alpha(theme.palette.primary.main, 0.2)}
                    )`,
                                    boxShadow: `0 0 6px ${alpha(
                                        theme.palette.primary.main,
                                        0.8
                                    )}`,
                                }
                                : undefined,
                        })}
                    >
                        <Box
                            sx={(theme) => ({
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "& .MuiSvgIcon-root": {
                                    fontSize: 22,
                                    color: isActive
                                        ? theme.palette.primary.light
                                        : alpha(theme.palette.text.secondary, 0.9),
                                    opacity: isActive ? 1 : 0.7,
                                    transition: "color 0.15s ease, opacity 0.15s ease",
                                },
                            })}
                        >
                            {mode.icon}
                        </Box>

                        <Typography
                            variant="caption"
                            sx={(theme) => ({
                                fontSize: 10,
                                lineHeight: 1.2,
                                letterSpacing: 0.08,
                                textTransform: "uppercase",
                                color: isActive
                                    ? theme.palette.primary.light
                                    : alpha(theme.palette.text.secondary, 0.8),
                                whiteSpace: "nowrap",
                            })}
                        >
                            {mode.label}
                        </Typography>
                    </IconButton>
                );
            })}
        </Stack>
    );
}
