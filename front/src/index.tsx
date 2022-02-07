import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';

import store from './store';

import { App } from './App';
import { ServerErrorModal } from './components/ServerErrorModal';

const themes = {
  light: 'public/light-theme.css',
  dark: 'public/dark-theme.css',
};

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeSwitcherProvider defaultTheme="light" themeMap={themes}>
        <App />
        <ServerErrorModal />
      </ThemeSwitcherProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
