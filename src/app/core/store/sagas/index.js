import combineSagas from 'app/core/utils/combine-sagas.util';
import demoDataSagas from './demoDataSaga';

const SAGAS = [
  demoDataSagas
];

function* rootSaga() {
  yield combineSagas(SAGAS);
}

export default rootSaga;