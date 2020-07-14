import { call, all, put, takeLatest } from 'redux-saga/effects';
import { DEMO_DATA_ACTIONS } from '../actions/demoDataAction';
import DemoDataService from 'app/core/services/demoDataService';

const demoDataService = new DemoDataService();

function* fetchDemoDataSaga () {
  try {
    const response = yield call(demoDataService.fetchDemoData);

    yield put(DEMO_DATA_ACTIONS.fetchDemoDataSuccess(response));
  } catch (errorDescription) {
    yield put(DEMO_DATA_ACTIONS.fetchDemoDataFailure(errorDescription));
  }
}

function* demoDataSagas () {
  yield all([
    takeLatest(DEMO_DATA_ACTIONS.fetchDemoData.match, fetchDemoDataSaga)
  ]);
}

export default demoDataSagas;