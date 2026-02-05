import { useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';
import { useFormsStore } from '@/store/formsStore';

export function FormController({ tabCode }: { tabCode: string }) {
    const { values } = useFormikContext();
    const { updateTabFormData } = useFormsStore();

    const valuesRef = useRef(values);

    useEffect(() => {
        valuesRef.current = values;
    }, [values]);

    useEffect(() => {
        return () => {
            if (valuesRef.current !== undefined) {
                console.warn({ values: valuesRef.current });
                updateTabFormData(tabCode, valuesRef.current);
            }
        };
    }, [tabCode]);

    return null;
}
