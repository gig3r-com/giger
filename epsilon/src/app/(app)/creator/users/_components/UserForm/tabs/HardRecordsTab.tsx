'use client';

import React, { useState, useMemo } from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import HardRecord from './records/HardRecord';

function HardRecordsTab() {
    const [category, setCategory] = useState('criminal');
    const { values } = useFormikContext();

    const list = useMemo(() => {
        if (category === 'criminal') return values.criminalHardRecords;
        if (category === 'medical') return values.medicalHardRecords;
        if (category === 'assets') return values.fileHardRecords;
        return [];
    }, [category, values]);

    const isSelected = (name) => category === name;

    return (
        <Stack direction="column" gap={2}>
            <Stack direction="row" gap={2} justifyContent="space-between">
                <ButtonGroup>
                    <Button
                        variant={isSelected('criminal') ? 'contained' : 'outlined'}
                        onClick={() => setCategory('criminal')}
                    >
                        Criminal records
                    </Button>
                    <Button
                        variant={isSelected('medical') ? 'contained' : 'outlined'}
                        onClick={() => setCategory('medical')}
                    >
                        Medical records
                    </Button>
                    <Button
                        variant={isSelected('assets') ? 'contained' : 'outlined'}
                        onClick={() => setCategory('assets')}
                    >
                        Files
                    </Button>
                </ButtonGroup>

                <Button size="small">Add Hard Record</Button>
            </Stack>
            {
                list.map((record, index) => {
                    return (
                        <HardRecord
                            index={index}
                            name={'criminalHardRecords'}
                        />
                    )
                })
            }
        </Stack>
    );
}

export default HardRecordsTab;
