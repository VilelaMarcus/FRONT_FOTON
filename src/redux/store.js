import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/api-slice';
import { useMemo } from 'react';

import { rootReducer, RootState, rootState } from './root-reducer';

/**
 * Constants
 */

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Setup store
 */

function initStore(preloadedState = rootState) {
  const _store = configureStore({
    devTools: !isProduction,
    preloadedState,
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

  return _store;
}

let store;

const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  // This check needs to run in the functions scope.
  if (typeof window === 'undefined') return _store;

  if (!store) store = _store;

  return _store;
};

function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export { useStore };
