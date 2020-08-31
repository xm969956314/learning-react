import { put, takeEvery, takeLatest } from 'redux-saga/effects'
function* initList(action) {
  try {
    console.log('abc');
    // const user = yield call(Api.fetchUser, action.payload.userId);
    const res = yield new Promise(resolve => {
      resolve(['aaa', 'bbb', '123'])
    })
    yield put({type: "init_list_action", value: res});
  } catch (e) {
    yield put({type: "init_list_action", message: e.message});
  }
}

function* sagaConfig () {
  yield takeEvery('init_list_sagas', initList)
  yield takeLatest('init_list_sagas', initList)
}

export default sagaConfig;