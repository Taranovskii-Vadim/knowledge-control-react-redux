import React from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import { Layout, Menu, Switch } from 'antd';

import UserOutlined from '@ant-design/icons/UserOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';

import { Text } from '../ui/Typography';

import css from './styles.css';

const { SubMenu, Item } = Menu;

interface Props {
  email: string;
  onThemeChange: (mode: boolean) => void;
  onLogout: () => void;
}

export const Header = ({ email, onLogout, onThemeChange }: Props): JSX.Element => {
  return (
    <Layout.Header className={cn(css.root)}>
      <div className={cn(css.wrapper)}>
        <Text>Сменить тему</Text>
        <Switch onChange={onThemeChange} />
        <Menu
          className={css.menu}
          theme="light"
          mode="horizontal"
          onClick={({ key }) => {
            if (key === 'logout') {
              onLogout();
            }
          }}
        >
          <SubMenu key="user-menu" icon={<UserOutlined />} title={email}>
            <Item key="logout" icon={<LogoutOutlined />}>
              Выход
            </Item>
          </SubMenu>
        </Menu>
      </div>
    </Layout.Header>
  );
};
