import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useFormikContext, getIn } from 'formik';

import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import type { ArrayObjectFieldProps, ItemStatus } from '@/components/forms/ArrayObjectField';

export type RecordType = {
    id: string;
    type: 'TEXT' | 'FLAG';
    category?: string;
    subCategory?: string;
    title: string;
    data: string;       // "true"/"false" as string for FLAG
    timestamp?: string; // or Date/string – UI uses string
    hackData?: string;
};

type Option = { value: string; label: string };

const typeOptions: Option[] = [
    { value: 'TEXT', label: 'Text' },
    { value: 'FLAG', label: 'Flag' },
];

// Subcategories depend on category
const subCategoryOptionsByCategory: Record<string, Option[]> = {
    system: [
        { value: 'config', label: 'Config' },
        { value: 'runtime', label: 'Runtime' },
    ],
    user: [
        { value: 'profile', label: 'Profile' },
        { value: 'preferences', label: 'Preferences' },
    ],
    security: [
        { value: 'auth', label: 'Auth' },
        { value: 'permissions', label: 'Permissions' },
    ],
};

const flagOptions: Option[] = [
    { value: 'true', label: 'True' },
    { value: 'false', label: 'False' },
];

const statusToChip = (status: ItemStatus) => {
    switch (status) {
        case 'new':
            return { label: 'New', color: 'success' as const };
        case 'edited':
            return { label: 'Edited', color: 'info' as const };
        case 'removed':
            return { label: 'Will be deleted', color: 'error' as const };
        default:
            return null;
    }
};

interface RecordRowProps {
    baseName: string;
    index: number;
    status: ItemStatus;
}

const RecordRow: React.FC<RecordRowProps> = ({ baseName, index, status, categories, subcategories }) => {
    const { values } = useFormikContext<any>();
    const item = getIn(values, `${baseName}[${index}]`) as RecordType;

    const statusChip = statusToChip(status);

    const path = (field: keyof RecordType) => `${baseName}[${index}].${field}`;

    const category = item?.category;
    const type = item?.type;
    const isFlag = type === 'FLAG';

    const subCategoryOptions = (category && subcategories[category]) || [];

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            {/* First row: ID (readonly), Type, status chip */}
            <Stack direction="row" spacing={1} alignItems="flex-start">
                {/* ID: auto-generated elsewhere, not editable */}
                <Input
                    name={path('id')}
                    label="ID"
                    fullWidth
                    size="small"
                    disabled
                />

                <Select
                    name={path('type')}
                    label="Type"
                    fullWidth
                    options={typeOptions}
                />

                {statusChip && (
                    <Chip
                        label={statusChip.label}
                        color={statusChip.color}
                        size="small"
                        sx={{ alignSelf: 'center' }}
                    />
                )}
            </Stack>

            {/* Category + Subcategory (depends on category) */}
            <Stack direction="row" spacing={1}>
                <Select name={path('category')} label="Category" options={categories} />
                <Select name={path('subCategory')} label="Sub-category" options={subCategoryOptions} />
            </Stack>

            {/* Title */}
            <Input
                name={path('title')}
                label="Title"
                fullWidth
                size="small"
            />

            {/* Data: TEXT => textarea, FLAG => True/False select */}
            {isFlag ? (
                <Select
                    name={path('data')}
                    label="Flag value"
                    fullWidth
                    options={flagOptions}
                />
            ) : (
                <Input
                    name={path('data')}
                    label="Data"
                    fullWidth
                    size="small"
                    multiline
                    minRows={3}
                />
            )}

            {/* Timestamp + hackData */}
            <Stack direction="row" spacing={1}>
                <Input
                    name={path('timestamp')}
                    label="Timestamp"
                    type="datetime-local"
                    size="small"
                    fullWidth
                />
                <Input
                    name={path('hackData')}
                    label="Hack data"
                    fullWidth
                    size="small"
                />
            </Stack>

            {/* Optional extra hint based on status */}
            {status !== 'unchanged' && (
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    {status === 'new' && 'This record will be created when you save.'}
                    {status === 'edited' && 'Changes to this record will be saved.'}
                    {status === 'removed' &&
                        'This record will be deleted when you save.'}
                </Typography>
            )}
        </Box>
    );
};

/**
 * Factory to plug into ArrayObjectField<RecordType>.
 * baseName must match ArrayObjectField `name` (e.g. "records").
 */
export const makeRecordRenderItem =
    (baseName: string, categories, subcategories): ArrayObjectFieldProps<RecordType>['renderItem'] =>
        ({ index, status }) =>
            <RecordRow baseName={baseName} index={index} status={status} categories={categories} subcategories={subcategories} />;
