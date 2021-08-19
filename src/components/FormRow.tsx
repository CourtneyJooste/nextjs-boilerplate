import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useFormikContext } from 'formik'
//review this ASAP
import { Row, RowProps, Col } from 'antd/lib/grid'

interface Props extends Omit<RowProps, 'title'> {
    disabled?: boolean,
    title?: React.ReactNode
}

const Component: React.FC<Props> = ({ title, gutter = 6, disabled = false, children, ...props }) => {

    const { isSubmitting } = useFormikContext() || {}
    const isDisabled = useCallback((props: any) => disabled || props.disabled || isSubmitting, [disabled, isSubmitting])

    return (
        <Row gutter={gutter} {...props}>
          { title && <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>{title}</Col> }
            { React.Children.map(children, (child: any) => {
                return child
                        ? React.cloneElement(child, {
                            ...child.props, disabled: isDisabled(child.props)
                          }) : null
            }) }
        </Row>
    )
}


export const FormRow = styled(Component)`
  padding: 20px 40px 40px 40px;
  @media only screen and (max-width: 1100px) {
    padding: 20px 20px 40px 20px;
  }
  @media only screen and (max-width: 768px) {
    padding: 10px 10px 30px 10px;
  }
  width: 100%;
`
