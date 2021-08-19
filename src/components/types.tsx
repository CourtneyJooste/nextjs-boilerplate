import { ColProps } from 'antd/lib/grid'
import { FieldAttributes } from 'formik'

export declare type GridProps = ColProps
export declare type InputGridProps = { gridProps?: GridProps }
export declare type FieldProps = { label?: string, required?: boolean }
export declare type InputFieldProps<T, A = {}> = T & FieldAttributes<T & A> & InputGridProps & A