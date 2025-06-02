import { FC, useEffect, useRef, } from 'react';
import {Formik, Form as FormikForm} from 'formik';
import { FormProps } from 'form.model';

export const Form: FC<FormProps> = (props) => {
    const { initialValues, schema, onSubmit, children, className, } = props;
    const formRef = useRef(null);
    useEffect(() => {
        if (formRef.current && Object.keys(schema).length != 0) {
            formRef.current.validateForm()
        }
    }, [initialValues, schema])

    return (
        <Formik innerRef={formRef} initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
            {
                () => {
                    return (
                        <FormikForm className={className}>
                            {children}
                        </FormikForm>
                    )
                }
            }
        </Formik>
    );
}