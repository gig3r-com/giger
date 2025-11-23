import React, { ReactNode, SyntheticEvent, useMemo } from "react";
import { Box, Tab, Tabs, Tooltip, Paper } from "@mui/material";

export interface TabItem {
  key: string;                    // ← stable, caller-provided key
  label: string;
  component: ReactNode;
  disabled?: boolean;
  disabledReason?: string;        // (optional) tooltip/title for disabled
}

export interface TabsUIProps {
  value: string;                  // ← selected tab key
  onChange: (event: SyntheticEvent, value: string) => void;
  tabs: TabItem[];
  preventSelectDisabled?: boolean; // default true
}

/** Make a safe DOM id from arbitrary keys */
const idFromKey = (k: string) =>
  `tabsui-${k.toLowerCase().replace(/[^a-z0-9_-]+/gi, "-")}`;

const a11yProps = (k: string) => {
  const id = idFromKey(k);
  return {
    id: `${id}-tab`,
    "aria-controls": `${id}-panel`,
  };
};

const TabPanel: React.FC<{
  children: ReactNode;
  value: string;
  tabKey: string;
}> = ({ children, value, tabKey }) => {
  const hidden = value !== tabKey;
  const baseId = idFromKey(tabKey);

  return (
    <div
      role="tabpanel"
      hidden={hidden}
      id={`${baseId}-panel`}
      aria-labelledby={`${baseId}-tab`}
      style={{ maxWidth: "100%" }}
    >
      {!hidden && <Box sx={{ p: 0, maxWidth: "100%" }}>{children}</Box>}
    </div>
  );
};

const TabsUI: React.FC<TabsUIProps> = ({
                                         value,
                                         onChange,
                                         tabs,
                                         preventSelectDisabled = true,
                                       }) => {
  // Fast lookup by key
  const tabMap = useMemo(() => {
    const m = new Map<string, TabItem>();
    tabs.forEach((t) => m.set(t.key, t));
    return m;
  }, [tabs]);

  const firstEnabledKey = useMemo(
    () => tabs.find((t) => !t.disabled)?.key ?? tabs[0]?.key ?? "",
    [tabs]
  );

  // If the controlled `value` doesn't exist anymore (e.g., tabs changed),
  // fall back to the first enabled tab to keep UI consistent.
  const effectiveValue =
    (value && tabMap.has(value) ? value : firstEnabledKey) ?? "";

  const handleChange = (event: SyntheticEvent, newKey: string) => {
    if (preventSelectDisabled && tabMap.get(newKey)?.disabled) return;
    onChange(event, newKey);
  };

  return (
    <>
      <Paper sx={{ px: 1, width: "100%", }}>
        <Tabs
          value={effectiveValue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          TabIndicatorProps={{
            sx: { height: 3, borderRadius: 1, backgroundColor: "primary.main" },
          }}
          sx={{
            minWidth: 0,
            height: 36,
            "& .MuiTabs-scrollButtons": { width: 36, flexShrink: 0 },
            "& .MuiTabs-scrollButtons.Mui-disabled": { opacity: 0.35 },
            "& .MuiTabs-flexContainer": { gap: 0.5 },
            "& .MuiTab-root": {
              minHeight: 50,
              minWidth: 0,
              px: 1.25,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontWeight: 700,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: 240,
            },
          }}
        >
          {tabs.map((t) => {
            const tabEl = (
              <Tab
                key={t.key}
                value={t.key}
                label={t.label}
                disabled={t.disabled}
                {...a11yProps(t.key)}
              />
            );
            return t.disabled && t.disabledReason ? (
              <Tooltip key={t.key} title={t.disabledReason} arrow>
                <span>{tabEl}</span>
              </Tooltip>
            ) : (
              tabEl
            );
          })}
        </Tabs>
      </Paper>

      {tabs.map((t) => (
        <TabPanel key={t.key} value={effectiveValue} tabKey={t.key}>
          {t.component}
        </TabPanel>
      ))}
    </>
  );
};

export default TabsUI;
