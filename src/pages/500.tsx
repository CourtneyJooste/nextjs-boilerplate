import React, { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Button, Result } from 'antd';

interface IProps {
  [x: string]: any;
}

const ServerError: FC<IProps> = (props) => {
  const router = useRouter();

  const handleBack = useCallback(() => router.push('/'), [router]);

  return (
    <div style={{ paddingTop: 40 }}>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary" onClick={handleBack}>Back Home</Button>}
        {...props}
      />
    </div>
  );
};

ServerError.defaultProps = {};

export default ServerError;
