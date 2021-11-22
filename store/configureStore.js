import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import thunk from 'redux-thunk';
import modules from './modules';

const store = () => createStore(modules, composeWithDevTools(applyMiddleware(thunk)));

export default store;
