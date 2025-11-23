import * as React from 'react';
import { useField } from 'formik';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
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

export interface ArrayObjectFieldProps<T> {
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
    renderItem: (args: { index: number; status: ItemStatus, name: string }) => React.ReactNode;

    /** Decide if a given item can be removed (for "unremovable" items) */
    isItemRemovable?: (item: T, index: number) => boolean;

    /** Optional way to give items a stable key; defaults to index */
    getItemKey?: (item: T, index: number) => string | number;
}

export function ArrayObjectField<T>(props: ArrayObjectFieldProps<T>) {
    const {
        name,
        label,
        createItem,
        renderItem,
        isItemRemovable,
        getItemKey,
    } = props;
    const [field, meta, helpers] = useField<T[]>(name);
    const values = Array.isArray(field.value) ? field.value : [];
    const initialRef = React.useRef<T[]>(
        Array.isArray(meta.initialValue) ? (meta.initialValue) : []
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

    const moveUpIcon = (index: number) =>
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

    const moveDownIcon = (index: number) =>
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

    const removeIcon = (index: number, isRemoved: boolean, removable: boolean) =>
        <Tooltip title={isRemoved ? 'Restore item' : removable ? 'Mark for deletion' : 'Cannot be removed'}>
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

    return (
        <Box>
            {label && <Typography variant="subtitle1" sx={{ mb: 1 }}>{label}</Typography>}
            <Grid container spacing={2}>
                {
                    values.map((item, index) => {
                        const key = keyFor(item, index);
                        const status = statusMap[key] ?? 'unchanged';
                        const isRemoved = status === 'removed';
                        const removable = isItemRemovable ? isItemRemovable(item, index) : true;

                        return renderItem({
                            index,
                            status,
                            name,
                            MoveUpIcon: moveUpIcon(index),
                            MoveDownIcon: moveDownIcon(index),
                            RemoveIcon: removeIcon(index, isRemoved, removable),
                            handleAdd,
                        });
                    })
                }
            </Grid>
            {/*<Box mt={1}>*/}
            {/*     <Button*/}
            {/*        variant="outlined"*/}
            {/*        size="small"*/}
            {/*        startIcon={<AddIcon />}*/}
            {/*        onClick={handleAdd}*/}
            {/*    >*/}
            {/*        Add item*/}
            {/*    </Button>*/}
            {/*</Box>*/}

            {/*{meta.touched && meta.error && (*/}
            {/*    <Typography*/}
            {/*        variant="caption"*/}
            {/*        color="error"*/}
            {/*        sx={{ mt: 0.5, display: 'block' }}*/}
            {/*    >*/}
            {/*        {String(meta.error)}*/}
            {/*    </Typography>*/}
            {/*)}*/}
        </Box>
    );
}

export default ArrayObjectField;