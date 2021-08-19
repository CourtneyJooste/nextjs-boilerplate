import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd';
import { useFormikContext } from 'formik';

const Component: React.FC<any> = ({ style, type = 'submit', buttonType = 'primary', block = true, className, ...props }) => {

  const { isSubmitting } = useFormikContext() || {}

    return (
        <div style={style} className={`${className}`}>
            <Button
                block={block}
                htmlType={type}
                type={buttonType}
                loading={isSubmitting}
                {...props}
            />
        </div>
    )
}

export const FormButton = styled(Component)`
    width: 96%;
    margin: 0 auto;
`
