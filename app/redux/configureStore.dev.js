import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import type { StoreStateType } from '/types';
import createRootReducer from './configReducers';
import * as authActions from './auth/actions';
import * as walletActions from './wallet/actions';
import * as nodeActions from './node/actions';

const rootReducer = createRootReducer();

const configureStore = (initialState?: StoreStateType) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Redux DevTools Configuration
  const actionCreators = {
    ...authActions,
    ...walletActions,
    ...nodeActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept(
      './configReducers',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('./configReducers').default)
    );
  }

  return store;
};

export default { configureStore };
