import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import demoDataReducer from './demoDataReducer';

function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    demoData: demoDataReducer
  });
}

export default createRootReducer;