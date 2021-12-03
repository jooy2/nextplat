import React from 'react';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import store from '../store';
import '../public/css/global.css';

const RootApp = ({
  Component,
  ...other
}) => (
  <Provider store={store}>
    <Component {...other} />
  </Provider>
);

export default appWithTranslation(RootApp);
