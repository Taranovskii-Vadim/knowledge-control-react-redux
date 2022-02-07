import React from 'react';
import { Layout } from 'antd';

import { Header } from '../Header';

import css from './styles.css';

const { Content } = Layout;

interface Props {
  email: string;
  onThemeChange: (mode: boolean) => void;
  onLogout: () => void;
}

export const Page: React.FC<Props> = ({ children, email, onLogout, onThemeChange }): JSX.Element => {
  return (
    <Layout className={css.root}>
      <Header onThemeChange={onThemeChange} email={email} onLogout={onLogout} />
      <Content className={css.content} id="layout">
        {children}
      </Content>
    </Layout>
  );
};
