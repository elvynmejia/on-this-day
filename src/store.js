import { configureStore } from '@reduxjs/toolkit';

import { reducer as modalReducer } from './reducers';

export const store = configureStore({
  reducer: {
    modal: modalReducer
  }
});

export default store;
