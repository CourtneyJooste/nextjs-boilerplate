import { useState, useCallback, useMemo } from 'react'
import { FormikValues, FormikHelpers } from 'formik'
import { Yup, getFormData } from '../helpers';

interface Options {
    onSubmit: (values: FormikValues, actions: FormikHelpers<any>) => Promise<any>,
    onCompleted?: Function,
    onError?: (e: any) => void
}

export type FormDataOptions = Options

export const useFormData = (yupSchema: Yup.ObjectSchema<any>, { onSubmit, onCompleted, onError }: Options) => {
    const { fields, schema, initialValues: initial} = useMemo(() => getFormData(yupSchema), [yupSchema])
    const [initialValues] = useState(initial)
    const handleOnSubmit = useCallback(async (values: FormikValues, actions: FormikHelpers<any>) => {
        actions.setSubmitting(true)
        try {
            const result =  await onSubmit(values, actions)
            if (result && onCompleted) onCompleted(result)
        } catch (e) {
            if (onError) onError(e)
            //else console.log(e)
        } finally {
            actions.setSubmitting(false)
        }
    }, [onSubmit, onCompleted, onError])
    return {
        fields, validationSchema: schema, initialValues, onSubmit: handleOnSubmit
    } as const
}
