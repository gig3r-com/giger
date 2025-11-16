import { ReactNode } from 'react';

export interface FormProps {
    initialValues,
    schema,
    onSubmit: (any) => void,
    children: ReactNode,
    className?: string,
}
