import React, { FC, useMemo } from 'react';
import Zoom from 'react-reveal/Zoom';
import Icon from '@ant-design/icons';
import { IconText } from './index';
import styled from 'styled-components';

const Outer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 22px;
`;

const Desc = styled.div`
  padding-top: 15px;
  font-size: 15px;
`;

const LargeIcon = styled(Icon)`
  svg {
    font-size: 60px;
  }
`;

interface IProps {
  icon: any;
  text?: string | React.ReactElement;
  large?: boolean;
  [x: string]: any;
}

export const IconItem: FC<IProps> = ({ icon, text, large, children}) => {

  if (large) {
    return (
      <Zoom>
        <Outer>
          <LargeIcon component={icon} />
          <Title>{text}</Title>
          <Desc>{children}</Desc>
        </Outer>
      </Zoom>
    )
  }

  return (
    <Zoom>
      <IconText>
        <Icon component={icon} />
        {text}
        {children}
      </IconText>
    </Zoom>
  );
};

IconItem.defaultProps = {};

export default IconItem;
