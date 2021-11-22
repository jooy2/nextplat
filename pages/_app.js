import React from 'react';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import store from '../store';

const RootApp = function ({
  Component,
  ...other
}) {
  return (
    <Provider store={store}>
      <Component {...other} />
    </Provider>
  );
};

export default appWithTranslation(RootApp);
