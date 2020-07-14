import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducers';

function configureAppStore(preloadedState, history) {
  const defaultMiddlewares = getDefaultMiddleware({
    thunk: false
  });
  const rootReducer = createRootReducer(history);
  const middlewares = [
    ...defaultMiddlewares,
    routerMiddleware(history)
  ];
  const isUsingDevTools = process.env.NODE_ENV !== 'production';
  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: isUsingDevTools,
    preloadedState,
    enhancers: defaultEnhancers => [...defaultEnhancers]
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}

export default configureAppStore;