import * as React from 'react';
import { useField } from 'formik';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export type ItemStatus = 'unchanged' | 'new' | 'edited' | 'removed';

export interface ArrayObjectFieldProps<T = any> {
    /** Formik field name, e.g. "items" or "addresses" */
    name: string;

    /** Label above the list */
    label?: React.ReactNode;

    /** Called to create a new empty item when clicking "Add" */
    createItem: () => T;

    /**
     * Render a single item. Use the index in your inner Formik field names,
     * e.g. `name={`${props.name}[${index}].title`}`.
     */
    renderItem: (args: { index: number; status: ItemStatus }) => React.ReactNode;

    /** Decide if a given item can be removed (for "unremovable" items) */
    isItemRemovable?: (item: T, index: number) => boolean;

    /** Optional way to give items a stable key; defaults to index */
    getItemKey?: (item: T, index: number) => string | number;
}

export function ArrayObjectField<T = any>({
                                              name,
                                              label,
                                              createItem,
                                              renderItem,
                                              isItemRemovable,
                                              getItemKey,
                                          }: ArrayObjectFieldProps<T>) {
    const [field, meta, helpers] = useField<T[]>(name);
    const values = Array.isArray(field.value) ? field.value : [];

    // Snapshot of initial items to detect "new" and "edited"
    const initialRef = React.useRef<T[]>(
        Array.isArray(meta.initialValue) ? (meta.initialValue as T[]) : []
    );

    const keyFor = (item: T, index: number) =>
        getItemKey?.(item, index) ?? index;

    const [statusMap, setStatusMap] = React.useState<Record<string | number, ItemStatus>>(
        () => {
            const initial = initialRef.current;
            const map: Record<string | number, ItemStatus> = {};
            values.forEach((item, index) => {
                const key = keyFor(item, index);
                const isNew = index >= initial.length;
                map[key] = isNew ? 'new' : 'unchanged';
            });
            return map;
        }
    );

    // Keep statusMap in sync when values change (e.g. edits, external changes)
    React.useEffect(() => {
        const initial = initialRef.current;
        setStatusMap((prev) => {
            const next: Record<string | number, ItemStatus> = {};

            values.forEach((item, index) => {
                const key = keyFor(item, index);
                const was = prev[key];

                // Preserve "removed" if already marked
                if (was === 'removed') {
                    next[key] = 'removed';
                    return;
                }

                const isNew = index >= initial.length;
                if (isNew) {
                    next[key] = 'new';
                    return;
                }

                const initialItem = initial[index];
                const isChanged =
                    JSON.stringify(item) !== JSON.stringify(initialItem);

                if (isChanged) {
                    next[key] = was === 'new' ? 'new' : 'edited';
                } else {
                    next[key] = 'unchanged';
                }
            });

            return next;
        });
    }, [values]);

    const setTouched = () => helpers.setTouched(true, false);

    const handleAdd = () => {
        const next = [...values, createItem()];
        helpers.setValue(next);
        setTouched();
    };

    const handleMove = (from: number, to: number) => {
        if (to < 0 || to >= values.length) return;
        const copy = [...values];
        const [moved] = copy.splice(from, 1);
        copy.splice(to, 0, moved);
        helpers.setValue(copy);
        setTouched();
    };

    const toggleRemove = (index: number) => {
        const item = values[index];
        const key = keyFor(item, index);

        setStatusMap((prev) => {
            const current = prev[key];

            // If currently removed -> restore and recompute status
            if (current === 'removed') {
                const initial = initialRef.current;
                const isNew = index >= initial.length;
                if (isNew) {
                    return { ...prev, [key]: 'new' };
                }
                const initialItem = initial[index];
                const isChanged =
                    JSON.stringify(item) !== JSON.stringify(initialItem);
                return {
                    ...prev,
                    [key]: isChanged ? 'edited' : 'unchanged',
                };
            }

            // Mark as removed
            return { ...prev, [key]: 'removed' };
        });

        setTouched();
    };

    const bgForStatus = (status: ItemStatus) => {
        switch (status) {
            case 'new':
                return 'rgba(76, 175, 80, 0.08)'; // light green
            case 'edited':
                return 'rgba(33, 150, 243, 0.08)'; // light blue
            case 'removed':
                return 'rgba(244, 67, 54, 0.08)'; // light red
            default:
                return 'background.paper';
        }
    };

    const borderForStatus = (status: ItemStatus) => {
        switch (status) {
            case 'removed':
                return '1px dashed rgba(244, 67, 54, 0.6)';
            case 'new':
            case 'edited':
                return '1px solid rgba(0, 0, 0, 0.12)';
            default:
                return '1px solid rgba(0, 0, 0, 0.08)';
        }
    };

    const labelForStatus = (status: ItemStatus) => {
        switch (status) {
            case 'new':
                return 'New – will be created on save';
            case 'edited':
                return 'Edited – changes will be saved';
            case 'removed':
                return 'Marked for deletion – will be removed on save';
            default:
                return '';
        }
    };

    return (
        <Box>
            {label && (
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {label}
                </Typography>
            )}

            <Box display="flex" flexDirection="column" gap={1}>
                {values.map((item, index) => {
                    const key = keyFor(item, index);
                    const status = statusMap[key] ?? 'unchanged';
                    const isRemoved = status === 'removed';
                    const removable =
                        isItemRemovable ? isItemRemovable(item, index) : true;

                    return (
                        <Paper
                            key={key}
                            variant="outlined"
                            sx={{
                                p: 1.5,
                                display: 'flex',
                                gap: 1,
                                alignItems: 'flex-start',
                                opacity: isRemoved ? 0.7 : 1,
                                bgcolor: bgForStatus(status),
                                border: borderForStatus(status),
                            }}
                        >
                            <Box flexGrow={1}>
                                {renderItem({ index, status })}
                                {status !== 'unchanged' && (
                                    <Typography
                                        variant="caption"
                                        sx={{ mt: 0.5, display: 'block', opacity: 0.8 }}
                                    >
                                        {labelForStatus(status)}
                                    </Typography>
                                )}
                            </Box>

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                gap={0.5}
                            >
                                <Tooltip title="Move up">
                  <span>
                    <IconButton
                        size="small"
                        onClick={() => handleMove(index, index - 1)}
                        disabled={index === 0}
                    >
                      <ArrowUpwardIcon fontSize="small" />
                    </IconButton>
                  </span>
                                </Tooltip>

                                <Tooltip title="Move down">
                  <span>
                    <IconButton
                        size="small"
                        onClick={() => handleMove(index, index + 1)}
                        disabled={index === values.length - 1}
                    >
                      <ArrowDownwardIcon fontSize="small" />
                    </IconButton>
                  </span>
                                </Tooltip>

                                <Tooltip
                                    title={
                                        isRemoved
                                            ? 'Restore item'
                                            : removable
                                                ? 'Mark for deletion'
                                                : 'Cannot be removed'
                                    }
                                >
                  <span>
                    <IconButton
                        size="small"
                        onClick={() => toggleRemove(index)}
                        disabled={!removable}
                    >
                      {isRemoved ? (
                          <RestoreIcon fontSize="small" />
                      ) : (
                          <DeleteIcon fontSize="small" />
                      )}
                    </IconButton>
                  </span>
                                </Tooltip>
                            </Box>
                        </Paper>
                    );
                })}
            </Box>

            <Box mt={1}>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                >
                    Add item
                </Button>
            </Box>

            {meta.touched && meta.error && (
                <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 0.5, display: 'block' }}
                >
                    {String(meta.error)}
                </Typography>
            )}
        </Box>
    );
}

export default ArrayObjectField;
