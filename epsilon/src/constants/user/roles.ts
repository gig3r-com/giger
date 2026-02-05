import type { RecordType, Options, } from '@/types';
import userConfig from '@/configs/user';
import { capitalize } from '@/utils/clientUtils';

export const USER_ROLES = userConfig.roles;
export const USER_ROLES_OPTIONS: Options<RecordType> = userConfig.roles.map(role => ({
    label: capitalize(role),
    value: role,
}));