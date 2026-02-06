'use client'

import React from "react";
import { Box, CardContent } from "@mui/material";

const PhoneWebsitePreview = ({ url, title = "Preview" }) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: 320,               // phone width
                maxWidth: "100%",
                aspectRatio: "9 / 19.5",  // phone-ish ratio
                borderRadius: 5,          // outer phone curve
                border: "10px solid #000",
                backgroundColor: "#000",
                boxShadow: 4,
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 120,
                    height: 18,
                    borderRadius: "0 0 14px 14px",
                    backgroundColor: "#000",
                    zIndex: 2,
                }}
            />
            <CardContent
                sx={{
                    p: 0,
                    height: "100%",
                    backgroundColor: "#111",
                }}
            >
                <Box
                    component="iframe"
                    src={url}
                    title={title}
                    sx={{
                        border: "none",
                        width: "100%",
                        height: "100%",
                        borderRadius: 3,
                        backgroundColor: "#fff",
                    }}
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                    loading="lazy"
                />
            </CardContent>
        </Box>
    );
};

export default PhoneWebsitePreview;
