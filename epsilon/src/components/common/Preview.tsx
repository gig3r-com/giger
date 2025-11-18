'use client';

import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Preview = ({ url, scale = 0.8 }) => {
    const safeScale = scale > 0 ? scale : 0.01;
    const inverseScalePercent = `${100 / safeScale}%`;

    return (
        <Box
            sx={(t) => ({
                position: "relative",
                width: "85%",
                maxWidth: "1200px",
                aspectRatio: "16 / 9",
                border: `2px solid ${t.palette.primary.main}`,
                borderRadius: 1,
                overflow: "hidden",
                background: "rgba(0, 0, 0, 0.8)",
            })}
        >
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    background: "rgba(0, 0, 0, 0.8)",
                }}
            >
                <Box
                    sx={{
                        transform: `scale(${safeScale})`,
                        transformOrigin: "top left",
                        width: inverseScalePercent,
                        height: inverseScalePercent,
                        background: "rgba(0, 0, 0, 0.8)",
                    }}
                >
                    { url && <iframe
                        src={url}
                        title="Iframe preview"
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            backgroundColor: "#000",
                        }}
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                        referrerPolicy="no-referrer"
                    /> }
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        zIndex: 2,
                    }}
                >
                <Tooltip title="Open this page">
                        <IconButton
                            size="small"
                            component="a"
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                border: '1px solid #b6ff2e',
                                bgcolor: "rgba(0, 0, 0, 1)",
                                transition: 'all 0.1s',
                                "&:hover": {
                                    transform: 'scale(1.3)',
                                },
                            }}
                        >
                            <OpenInNewIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
};

export default Preview;
