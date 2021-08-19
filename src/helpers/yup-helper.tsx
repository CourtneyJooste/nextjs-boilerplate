import * as Yup from 'yup'
import { mapValues } from 'lodash'

export * from 'yup';

export { Yup }

const defaultValues = {
  string: '',
  number: 0,
  boolean: false,
  date: new Date().toISOString(),
  array: []
} as any;

const mapFields = (description: any, prefix: string = '') => {
  const { fields: data } = description

  const fields: any = mapValues(data, ({ type, tests, ...rest}: any, key: string) => {

    if (type === 'object') return {
      required: tests.some((t: any) => t.name === 'required'),
      name: prefix + key,
      ...rest,
      ...mapFields(data[key] as any, prefix + key + '.')
    }

    return {
      required: tests.some((t: any) => t.name === 'required'),
      name: prefix + key,
      ...rest
    }
  })

  return fields
}

const mapInitialValues = (initialValues: any, description: any) => {
  const { fields: data } = description

  const values = mapValues(data, ({type}: any, key: string) => {
    if (type === 'object') return mapInitialValues(initialValues[key], data[key] as any)
    return initialValues[key] || defaultValues[type]
  }) as any

  return values
}

/**
 * Generates Formik helpers from a yup validation schema.
 *
 * @param schema The yup validation schema
 * @return returns the schema, formik fields, and initial values for each field
 */
export const getFormData = (schema: Yup.ObjectSchema<any>) => {
  const description: any = schema.describe()
  const initialValues = schema.cast(schema)

  return {
    schema: schema as Yup.ObjectSchema<any>,
    fields: mapFields(description),
    initialValues: mapInitialValues(initialValues, description)
  }
}

export default { Yup, getFormData }
