import React from 'react';
import { useField } from 'formik';

import {
    HACKER_STAT,
} from '@/configs/UserSelectFields';
import {
    RECORD_TYPES_OPTIONS,
    HARD_RECORD_CATEGORIES,
    HARD_RECORD_CATEGORIES_OPTIONS,
    RECORD_CATEGORIES_DEFINITIONS
} from '@/configs/Record';
import { BOOL } from "@/configs/BaseSelectFields";

import Card from '@/components/forms/Card';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import { Grid, Stack, Divider } from '@mui/material';
import type { HardRecord } from '@/types/Record';

function HardRecord({ index, MoveUpIcon, MoveDownIcon, RemoveIcon }) {
    const name = `criminalHardRecords[${index}]`;
    const [field, meta, helpers] = useField<HardRecord>(name);
    const { title, id, type, category, subCategory } = field.value;
    const catDef = RECORD_CATEGORIES_DEFINITIONS[category];
    const CatIcon = catDef?.icon;

    const header =
        <Stack direction="row" gap={1}>
            <Input name={`${name}.title`} label={'Title'} sx={{ flex: 3 }} />
            <Select name={`${name}.type`} label={'Type'} options={RECORD_TYPES_OPTIONS} sx={{ flex: 1 }} />
            {/*{ MoveUpIcon }*/}
            {/*{ MoveDownIcon }*/}
            {/*{ RemoveIcon }*/}
        </Stack>

    return (
        <Grid size={12}>
            <Card icon={CatIcon ? <CatIcon /> : null} title={header}>
                <Stack direction="row" gap={2} alignItems="flex-start">
                    <Grid container spacing={2} flex={5}>
                        <Grid size={6}>
                            <Select name={`${name}.category`} label={'Cat'} options={HARD_RECORD_CATEGORIES_OPTIONS} />
                        </Grid>
                        <Grid size={6}>
                            <Select name={`${name}.subCategory`} label={'Subcat'} options={catDef?.subcategoriesOptions || []} />
                        </Grid>
                        <Grid size={12}>
                            <Input name={`${name}.data`} label={'Text'} multiline minRows={4} />
                        </Grid>
                    </Grid>
                    <Divider flexItem orientation="vertical" />
                    <Grid container spacing={2} flex={2}>
                        <Grid size={6}>
                            <Select name={`${name}.isReveled`} label={'isReveled'} options={BOOL} />
                        </Grid>
                        <Grid size={6}>
                            <Input name={`${name}.revealCode`} label={'revealCode'} />
                        </Grid>
                        <Grid size={6}>
                            <Select name={`${name}.isEncrypted`} label={'isEncrypted'} options={BOOL} />
                        </Grid>
                        <Grid size={6}>
                            <Select name={`${name}.encryptionLevel`} label={'encryptionLevel'} options={HACKER_STAT} />
                        </Grid>
                    </Grid>
                </Stack>
            </Card>
        </Grid>
    );
}

export default HardRecord;