import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { urlFor } from './routes';

import { Login } from './pages/Login';
import { ProtectedPages } from './pages';

import '!style-loader!css-loader!src/styles/index.css';

// TODO include fonts to your project
// TODO drag and drop
// TODO dark theme

export const App = (): JSX.Element => {
  const token = localStorage.getItem('token');

  return (
    <Switch>
      {!token ? <Route path={urlFor('login')} component={Login} /> : null}
      {token ? <ProtectedPages /> : <Redirect to={urlFor('login')} />}
    </Switch>
  );
};
