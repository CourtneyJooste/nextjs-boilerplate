import React, { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Button, Result } from 'antd';

interface IProps {
  [x: string]: any;
}

const NotFound: FC<IProps> = (props) => {
  const router = useRouter();

  const handleBack = useCallback(() => router.push('/'), [router]);

  return (
    <div style={{ paddingTop: 40 }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={handleBack}>Back Home</Button>}
        {...props}
      />
    </div>
  );
};

NotFound.defaultProps = {};

export default NotFound;
