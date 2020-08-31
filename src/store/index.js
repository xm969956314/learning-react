import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
// 使用 redux-thunk 这个中间件使得我们可以使用 异步调用的方式
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import sagas from './reduxSaga'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const sagaWare = createSagaMiddleware();
// const enhancer = composeEnhancers(applyMiddleware(thunk));
const enhancer = composeEnhancers(applyMiddleware(sagaWare));
const store = createStore( reducer, enhancer );
sagaWare.run(sagas);
export default store;
