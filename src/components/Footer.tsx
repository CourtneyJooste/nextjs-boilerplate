import React, { FC } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

const { Footer: AntFooter } = Layout;

const Copyright = styled.div`
  //padding: 10px;
`;

interface IProps {
  [x: string]: any;
}

export const Footer: FC<IProps> = ({}) => {
  return (
    <AntFooter style={{ textAlign: 'center', background: '#dde0e4' }}>
      <Copyright>Necta Tech ©2021</Copyright>
    </AntFooter>
  );
};

Footer.defaultProps = {};

export default Footer;
