import { useRouter } from 'next/router';
import React, { FC, useCallback, useMemo } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
const { SubMenu } = Menu;

const ItemGroup = styled(Menu.ItemGroup)`
  .ant-dropdown-menu-item-group-title {
    //color: white;
  }
  .ant-menu-item {
    background-color: transparent !important;
  }
`;

const MenuItem = styled(Menu.Item)<{ selected: boolean}>`
  &&::after {
    border-bottom: ${p => p.selected ? `2px solid ${p.theme.primary}` : 'none'} !important;
  }
`;

const SubMenuItem = styled(SubMenu)<{ selected: boolean}>`
  &&::after {
    border-bottom: ${p => p.selected ? `2px solid ${p.theme.primary}` : 'none'} !important;
  }
`;

export interface NavItem {
  id: string;
  title: string;
  route: string;
  subTitle?: string;
  selected?: boolean;
  subRoutes?: NavItem[];
}

const Item: FC<any> = ({ id, title, route, subTitle, subRoutes }) => {
  const router = useRouter();

  const handleClick = useCallback((path: string) => (e?: any) => {
    router.push(path);
  }, [router]);

  const isSelected = useMemo(() => {
    const loc = router.pathname
    return loc === route;
  }, [router, route]);

  const partMatch = useMemo(() => {
    const loc = router.pathname
    return loc.includes(route);
  }, [router, route]);

  if (subRoutes?.length) return (
    <SubMenuItem key={id} title={title} selected={partMatch}>
      <ItemGroup title={subTitle}>
        { subRoutes.map((s: NavItem) => <Item key={s.id} {...s} />)}
      </ItemGroup>
    </SubMenuItem>
  );

  return <MenuItem key={id} onClick={handleClick(route)} selected={isSelected}>{title}</MenuItem>
}


// Abandoned using built in antd method.
// When mapping dynamically over menu items, every SINGLE ONE is forced to be active
// Selected index is checked against the path provided
export const useMenu = (items: NavItem[]) => {
  const router = useRouter();

  const _items = useMemo(() => items.map((item: NavItem) => <Item key={item.id} {...item} />), [items]);

  return useMemo(() => {
    return (
      <Menu mode="horizontal" theme={'light'} forceSubMenuRender>
        { _items }
      </Menu>
    )
  }, [_items]);
}
