import React from 'react';
import { Form, Input, Button } from 'antd';

import { connect } from 'src/utils/store';
import { Dispatch } from 'src/utils/types';
import { loginUser } from 'src/store/services/authentication/actions';

import css from './styles.css';

interface Props {
  loginUser: Dispatch<typeof loginUser>;
}

const LoginFC = ({ loginUser }: Props): JSX.Element => {
  const onSubmitForm = ({ email, password }: { email: string; password: string }): void => {
    loginUser(email, password);
  };

  return (
    <Form className={css.root} name="loginForm" requiredMark={false} onFinish={onSubmitForm}>
      <Form.Item name="email" rules={[{ required: true, message: 'Введите логин' }]}>
        <Input placeholder="Логин" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
        <Input.Password placeholder="Пароль" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export const Login = connect(() => ({}), { loginUser })(LoginFC);
