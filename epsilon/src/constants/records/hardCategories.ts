import type { HardRecordCategories, Options, } from '@/types';
import userConfig from '@/configs/user';
import { capitalize } from '@/utils/clientUtils';

export const RECORD_HARD_CATEGORIES = userConfig.hardRecordsCategories;
export const RECORD_HARD_CATEGORIES_OPTIONS: Options<HardRecordCategories> = userConfig.hardRecordsCategories.map(cat => ({
    label: capitalize(cat),
    value: cat,
}));

export const RECORD_HARD_SUBCATEGORIES_BY_CATEGORY = {
    [userConfig.recordCatCriminal]: userConfig.criminalHardRecordsSubcategories,
    [userConfig.recordCatMedical]: userConfig.medicalHardRecordsSubcategories,
    [userConfig.recordCatFile]: userConfig.fileHardRecordsSubcategories,
}

export const RECORD_HARD_SUBCATEGORIES_BY_CATEGORY_OPTIONS = {
    [userConfig.recordCatCriminal]: userConfig.criminalHardRecordsSubcategories.map(subCat => ({
        label: capitalize(subCat),
        value: subCat,
    })),
    [userConfig.recordCatMedical]: userConfig.medicalHardRecordsSubcategories.map(subCat => ({
        label: capitalize(subCat),
        value: subCat,
    })),
    [userConfig.recordCatFile]: userConfig.fileHardRecordsSubcategories.map(subCat => ({
        label: capitalize(subCat),
        value: subCat,
    })),
}