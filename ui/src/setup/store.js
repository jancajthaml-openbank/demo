import { createStore, applyMiddleware, compose } from 'redux'

import createSagaMiddleware, { END } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'

import { fromJS } from 'immutable'

import createReducer from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

export default async function(state = {}) {
  const enhancers = [sagaMiddleware]

  const composeEnhancers = !PRODUCTION && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
      : compose

  const store = createStore(
    createReducer(),
    fromJS(state),
    composeEnhancers(...[applyMiddleware(...enhancers)]),
  )

  if (!PRODUCTION && module.hot) {
    module.hot.accept(['./reducers'], () => {
      store.replaceReducer(createReducer(store.injectedReducers))
    })
  }

  const rootSaga = function*() {
    yield all(sagas.map(fork))
  }

  sagaMiddleware.run(rootSaga)
  store.close = () => store.dispatch(END)

  return store
}
