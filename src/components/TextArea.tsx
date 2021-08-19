import React from 'react'
import styled from 'styled-components'
import { Input, TextAreaProps } from 'formik-antd'
import { ColProps } from 'antd/lib/grid'
import { FieldContainer } from './FieldContainer'
import { useFormikContext } from 'formik'

const { TextArea: TextAreaBase } = Input

interface AddedProps {
  label?: string,
  required?: boolean,
  gridProps?: ColProps,
}

const Component: React.FC<TextAreaProps & AddedProps> = ({ hidden, gridProps = { md: 24, lg: 24, xl: 24, xxl: 24 }, required, label, className, ...props }) => {

  const { isSubmitting } = useFormikContext() || {}

  return (
      <FieldContainer
        { ...gridProps }
        name={props.name}
        required={required}
        label={label}
        className={`${className} ant-field-container`}
        hidden={hidden}
      >
          <TextAreaBase
            disabled={isSubmitting}
            autoSize={{ minRows: 4, maxRows: 10 }}
            {...props}
          />
      </FieldContainer>
  )
}


export const TextArea = styled(Component)``
