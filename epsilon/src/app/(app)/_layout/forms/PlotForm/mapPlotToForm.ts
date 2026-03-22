import { initialValues } from './initialValues';
import type { Plot } from '@/types';

export const mapPlotToForm = (data: Plot) => {
    return {
        ...initialValues,
        id: data?.id ?? null,
        name: data?.name ?? initialValues.name,
        description: data?.description ?? initialValues.description,
        users: data?.users ?? initialValues.users,
    };
};