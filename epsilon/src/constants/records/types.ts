import type { RecordType, Options, } from '@/types';
import userConfig from '@/configs/user';
import { capitalize } from '@/utils/clientUtils';

export const RECORD_TYPES = userConfig.recordsTypes;
export const RECORD_TYPES_OPTIONS: Options<RecordType> = userConfig.recordsTypes.map(type => ({
    label: capitalize(type),
    value: type,
}));