import { all, spawn, call } from 'redux-saga/effects';

function* combineSagas (sagas) {
  yield all(sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
        }
      }
    }))
  );
}

export default combineSagas;