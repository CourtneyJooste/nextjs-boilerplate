import React, { useMemo } from 'react'
import { Col, ColProps } from 'antd/lib/grid'
import { Form } from 'antd'
import { getIn, useFormikContext } from 'formik'

const { Item } = Form
export type ContainerProps = ColProps & { required?: boolean, label?: string, name?: string, errorText?: string }

const getError = (errors: any, touched: any, name?: string): any => {
    if (!name) return ''
    const error = getIn(errors, name);
    if (typeof error === 'object' && Object.keys(error).length > 0) return getIn(touched, name) && error[Object.keys(error)[0]];
    return getIn(touched, name) && error
}

const FieldContainerComponent: React.FC<ContainerProps> = ({
    errorText, className = '', required = false, label = '', name, children, hidden = false,
    xs = 24, sm = 24, md = 12, lg = 12, xl = 12, xxl = 12, ...props
}) => {

    const { errors, touched } = useFormikContext()
    const _errorText = useMemo(() => getError(errors, touched, name), [touched, name, errors])
    const labelText = useMemo(() => label && `${label}${required ? '*' : ''}`, [label, required])
    const validateStatus = useMemo(() => (errorText || _errorText ? 'error' : undefined), [_errorText, errorText]);
    const breakpoints = { xs, sm, md, lg, xl, xxl }

    if (hidden) return null

    return (
        <Col
            {...breakpoints}
            {...props}
        >
            <Item
                label={labelText}
                help={errorText || _errorText}
                className={`${className} ant-input-root`}
                validateStatus={validateStatus}
            >
                { children }
            </Item>
        </Col>
    )
}

export default FieldContainerComponent

export { FieldContainerComponent as FieldContainer }
