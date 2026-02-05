"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    IconButton,
    Typography,
    Box,
    Menu,
    MenuItem,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { MODES } from "./modesConfig";

export default function NavMenu() {
    const pathname = usePathname() || "/";
    const firstSegment = pathname.split("/")[1];

    const activeMode =
        MODES.find((mode) => mode.key === firstSegment) ?? MODES[0];

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <IconButton
                disableRipple
                onClick={handleOpen}
                aria-label={activeMode.description}
                sx={(theme) => ({
                    borderRadius: 0,
                    px: 1.75,
                    py: 0.75,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    "&:hover": {
                        backgroundColor: alpha(theme.palette.background.paper, 0.08),
                    },
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        left: "18%",
                        right: "18%",
                        bottom: 0,
                        height: 2,
                        borderRadius: 999,
                        backgroundImage: `linear-gradient(
              to right,
              ${alpha(theme.palette.primary.main, 0.25)},
              ${alpha(theme.palette.primary.main, 0.95)},
              ${alpha(theme.palette.primary.main, 0.25)}
            )`,
                        boxShadow: `0 0 6px ${alpha(
                            theme.palette.primary.main,
                            0.8
                        )}`,
                    },
                })}
            >
                <Box
                    sx={(theme) => ({
                        height: '22px',
                        "& .MuiSvgIcon-root": {
                            fontSize: 22,
                            color: theme.palette.primary.light,
                        },
                    })}
                >
                    {activeMode.icon}
                </Box>

                <Typography
                    variant="caption"
                    sx={(theme) => ({
                        fontSize: 10,
                        letterSpacing: 0.08,
                        textTransform: "uppercase",
                        color: theme.palette.primary.light,
                        whiteSpace: "nowrap",
                    })}
                >
                    {activeMode.label}
                </Typography>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                PaperProps={{
                    elevation: 8,
                    sx: (theme) => ({
                        mt: 1,
                        minWidth: 180,
                        borderRadius: 2,
                        backgroundColor: alpha(theme.palette.background.paper, 0.95),
                        backdropFilter: "blur(12px)",
                    }),
                }}
            >
                {MODES.map((mode) => {
                    const isActive = mode.key === activeMode.key;

                    return (
                        <MenuItem
                            key={mode.key}
                            component={isActive ? "div" : Link}
                            href={isActive ? undefined : mode.path}
                            disabled={isActive}
                            onClick={handleClose}
                            sx={(theme) => ({
                                gap: 1.25,
                                py: 1,
                                opacity: isActive ? 1 : 0.9,
                                cursor: isActive ? "default" : "pointer",

                                "& .MuiSvgIcon-root": {
                                    fontSize: 20,
                                    color: isActive
                                        ? theme.palette.primary.light
                                        : alpha(theme.palette.text.primary, 0.85),
                                },

                                ...(isActive && {
                                    backgroundColor: alpha(
                                        theme.palette.primary.main,
                                        0.12
                                    ),
                                }),

                                "&:hover": !isActive
                                    ? {
                                        backgroundColor: alpha(
                                            theme.palette.primary.main,
                                            0.08
                                        ),
                                    }
                                    : undefined,
                            })}
                        >
                            {mode.icon}

                            <Typography
                                variant="body2"
                                sx={(theme) => ({
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive
                                        ? theme.palette.primary.light
                                        : theme.palette.text.primary,
                                })}
                            >
                                {mode.label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}
