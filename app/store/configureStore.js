// import { createStore, applyMiddleware, compose } from 'redux';
// import reducers from '../reducers/index';
// import { createLogger } from 'redux-logger';
//
// const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })
//
// export default function configureStore () {
//   const enhancer = compose(
//     applyMiddleware(
//       loggerMiddleware
//     )
//   )
//   const store = createStore(reducers, enhancer)
//
//   if (module.hot) {
//     module.hot.accept(() => {
//       const nextRootReducer = require('../reducers/index').default
//       store.replaceReducer(nextRootReducer)
//     })
//   }
//   return store
// }
//

'use strict';

import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
}                         from 'redux';
import thunkMiddleware    from 'redux-thunk';
import { createLogger }       from 'redux-logger';
import reducers from '../reducers/index';

// create logger:
const loggerMiddleware = createLogger({
  level     : 'info',
  collapsed : true
});

let enhancer;
if (process.env.NODE_ENV === 'development') {
  console.log('DEV: ', process.env.NODE_ENV);
  // createStore : enhancer development
  enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware // logger after thunk to avoid undefined actions
    )
  );
} else {
  console.log('NOT DEV: ', process.env.NODE_ENV);
  // createStore : enhancer production or not dev
  enhancer = compose(
    applyMiddleware(
      thunkMiddleware
    )
  );
}

export default function configureStore(initialState) {
  return createStore(reducers, initialState, enhancer);
}
