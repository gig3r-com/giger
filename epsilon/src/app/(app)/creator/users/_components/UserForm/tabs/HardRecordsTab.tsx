'use client'

import React from 'react';
import ArrayObjectField from '@/components/forms/ArrayObjectField';
import { makeRecordRenderItem } from './makeRecordRenderItem';
import {
    HARD_RECORDS_ASSET_SUBCATEGORIES,
    HARD_RECORDS_CATEGORIES,
    HARD_RECORDS_CRIMINAL_SUBCATEGORIES,
    HARD_RECORDS_FILE_SUBCATEGORIES,
    HARD_RECORDS_MEDICAL_SUBCATEGORIES,
} from "@/configs/UserSelectFields";

const createRecord = (): RecordType => ({
    id:
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : `tmp-${Math.random().toString(36).slice(2, 9)}`,
    type: 'TEXT',
    category: undefined,
    subCategory: undefined,
    title: '',
    data: '',
    timestamp: '',
    hackData: '',
});

function HardRecordsTab(props) {
    return (
        <ArrayObjectField<RecordType>
            name="hardRecords"
            label="Records"
            createItem={createRecord}
            renderItem={makeRecordRenderItem('hardRecords', HARD_RECORDS_CATEGORIES, {
                'ASSET': HARD_RECORDS_ASSET_SUBCATEGORIES,
                'CRIMINAL': HARD_RECORDS_CRIMINAL_SUBCATEGORIES,
                'FILE': HARD_RECORDS_FILE_SUBCATEGORIES,
                'MEDICAL': HARD_RECORDS_MEDICAL_SUBCATEGORIES,
            })}
            // Example: make some items unremovable (e.g. based on id)
            isItemRemovable={(item) => item.id !== 'root'}
            getItemKey={(item, index) => item.id || `tmp-${index}`}
        />
    );
}

export default HardRecordsTab;