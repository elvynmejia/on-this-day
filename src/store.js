import { configureStore } from '@reduxjs/toolkit';

import { reducer as modalReducer } from './reducers';
import { onThisDayApi } from './apis';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    [onThisDayApi.reducerPath]: onThisDayApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(onThisDayApi.middleware)
  }
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)

export default store;
