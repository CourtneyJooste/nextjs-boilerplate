import React, { FC, useCallback } from 'react';
import { Button, Dropdown, Layout } from 'antd';
import { useDeviceSize, useMenu, NavItem } from '../hooks';
import styled from 'styled-components';
import { MenuOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'

const { Header } = Layout;

const NavOuter = styled(Header)`
  position: fixed;
  z-index: 16;
  width: 100%;
  display: flex;
  flex-direction: row;
  //color: white;
  .ant-menu-title-content {
   //color: white;
  }
  .ant-menu-horizontal {
    border-bottom: none;
  }
  background: white;
  
  @media only screen and (max-width: 768px) {
    padding: 0 20px;
  }
`

const Navlogo = styled.div`
  padding-right: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    height: 45px;
    width: auto;
  }
`;

const Space = styled.div`
  flex: 1;
`;

const Btn = styled(Button)`
  //color: white !important;
  height: 100%;
`;


interface IProps {
  items: NavItem[];
  logo: any;
  [x: string]: any;
}

export const Navbar: FC<IProps> = ({ items, logo }) => {
  const router = useRouter();

  const handleClick = useCallback((path: string) => (e?: any) => {
    router.push(path);
  }, [router]);

  const menu = useMenu(items);

  const [width] = useDeviceSize();

  if (!menu) return null;

  return (
    <NavOuter>
      <Navlogo className="logo" onClick={handleClick('/')}>
        <img src={logo} alt={'logo'} />
      </Navlogo>
      <Space />
      { width > 768 ? menu : (
        <Dropdown overlay={menu} trigger={['click']}>
          <Btn type="text" icon={<MenuOutlined />} />
        </Dropdown>
      )}
    </NavOuter>
  );
};

Navbar.defaultProps = {};

export default Navbar;
