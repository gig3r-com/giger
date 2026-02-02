// modesConfig.tsx
import React from "react";
import DesignServicesIcon from "@mui/icons-material/DesignServices"; // Creator – tools / building
import MovieFilterIcon from "@mui/icons-material/MovieFilter";      // Director – running the game
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";  // Player – playing

export const MODES = [
    {
        key: "creator",
        path: "/creator",
        label: "Creator",
        description: "Tools for building and configuring the game before play.",
        icon: <DesignServicesIcon />,
    },
    {
        key: "director",
        path: "/director",
        label: "Director",
        description: "Controls and dashboards for running the game live.",
        icon: <MovieFilterIcon />,
    },
    {
        key: "player",
        path: "/player",
        label: "Player",
        description: "Interface for players during the game.",
        icon: <SportsEsportsIcon />,
    },
] as const;

export type ModeKey = (typeof MODES)[number]["key"];
