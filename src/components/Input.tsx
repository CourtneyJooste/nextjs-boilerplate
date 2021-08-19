import React from 'react'
import styled from 'styled-components'
import { Input as InputBase, InputProps } from 'formik-antd'
import { FieldContainer } from './FieldContainer'
import { InputFieldProps, FieldProps } from './types'
import { useFormikContext } from 'formik'

const Component: React.FC<InputFieldProps<InputProps, FieldProps>> = ({ hidden, className, required, label, gridProps = { md: 24, lg: 24, xl: 24, xxl: 24 }, ...props }) => {

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
          <InputBase
            disabled={isSubmitting}
            {...props}
            ref={null}
          />
      </FieldContainer>
  )
}

export const Input = styled(Component)``
