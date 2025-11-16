// AppModeSelect.tsx
import * as React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import DescriptionIcon from "@mui/icons-material/Description";

// If you already export this from your context types, import instead:
export type AppMode = "full" | "police" | "doc";

// Replace with your actual hook or context usage
import { useControllers } from "@/components/modules/controller/index";

const MODE_LABEL: Record<AppMode, string> = {
  full: "Full",
  police: "Police",
  doc: "Doc",
};

const MODE_ICON: Record<AppMode, React.ReactNode> = {
  full: <DashboardIcon fontSize="small" />,
  police: <LocalPoliceIcon fontSize="small" />,
  doc: <DescriptionIcon fontSize="small" />,
};

type AppModeSelectProps = {
  label?: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
  disabled?: boolean;
  id?: string;
};

export default function AppModeSelect({
                                        label = "App mode",
                                        fullWidth = true,
                                        size = "small",
                                        variant = "outlined",
                                        disabled,
                                        id = "app-mode-select",
                                      }: AppModeSelectProps) {
  const { appMode, setAppMode } = useControllers();

  const handleChange = (e: SelectChangeEvent<AppMode>) => {
    const v = e.target.value as AppMode;
    setAppMode(v);
  };

  return (
    <FormControl size={size} variant={variant} fullWidth={fullWidth} disabled={disabled}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select<AppMode>
        labelId={`${id}-label`}
        id={id}
        value={appMode}
        label={label}
        onChange={handleChange}
        renderValue={(mode) => MODE_LABEL[mode as AppMode]}
      >
        {(Object.keys(MODE_LABEL) as AppMode[]).map((mode) => (
          <MenuItem key={mode} value={mode}>
            <ListItemIcon>{MODE_ICON[mode]}</ListItemIcon>
            <ListItemText primary={MODE_LABEL[mode]} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
