import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

function configureAppStore(preloadedState, history) {
  const defaultMiddlewares = getDefaultMiddleware({
    thunk: false
  });
  const rootReducer = createRootReducer(history);
  const middlewares = [
    ...defaultMiddlewares,
    routerMiddleware(history),
    sagaMiddleware
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

  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureAppStore;