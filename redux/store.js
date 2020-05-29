import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import rootReducers from './reducers';

import { isServer } from '../isServer';

let middleware = [];

if (!isServer) {
  middleware = [...middleware, createLogger()];
}

const store = createStore(rootReducers, applyMiddleware(...middleware));

export default store;
