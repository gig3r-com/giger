import * as React from "react";
import { useFormikContext } from "formik";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
    "& .MuiTreeItem-label": {
        fontSize: 12,
        fontFamily: "Monaco, Menlo, Consolas, 'Courier New', monospace",
    },
}));

type JsonValue = any;

const renderTree = (
    value: JsonValue,
    label: string,
    path: string
): React.ReactNode => {
    const isObject =
        value !== null && typeof value === "object" && !Array.isArray(value);
    const isArray = Array.isArray(value);

    if (isObject || isArray) {
        const entries: [string, JsonValue][] = isArray
            ? value.map((v: JsonValue, i: number) => [String(i), v])
            : Object.entries(value);

        return (
            <StyledTreeItem itemId={path} label={label}>
                {entries.map(([k, v]) =>
                    renderTree(v, k, path ? `${path}.${k}` : k)
                )}
            </StyledTreeItem>
        );
    }

    let display: string;
    if (typeof value === "string") display = `"${value}"`;
    else if (value === null) display = "null";
    else if (typeof value === "undefined") display = "undefined";
    else display = String(value);

    return (
        <StyledTreeItem
            itemId={path}
            label={label ? `${label}: ${display}` : display}
        />
    );
};

export const FormDebug: React.FC = () => {
    const { values, errors, touched } = useFormikContext<any>();

    return (
        <Paper
            variant="outlined"
            sx={{
                mt: 2,
                p: 1.5,
                bgcolor: "#000000",
                color: "#ffffff",
                borderRadius: 2,
                fontSize: 12,
                overflow: "auto",
            }}
        >
            <Typography
                variant="caption"
                sx={{ mb: 1, display: "block", opacity: 0.8 }}
            >
                Formik debug
            </Typography>

            <Box sx={{ pl: 0.5 }}>
                <SimpleTreeView
                    aria-label="Formik debug tree"
                    slots={{
                        expandIcon: ChevronRightIcon,
                        collapseIcon: ExpandMoreIcon,
                    }}
                    sx={{ flexGrow: 1, overflowY: "auto" }}
                >
                    {renderTree(values, "values", "values")}
                    {renderTree(errors, "errors", "errors")}
                    {renderTree(touched, "touched", "touched")}
                </SimpleTreeView>
            </Box>
        </Paper>
    );
};
