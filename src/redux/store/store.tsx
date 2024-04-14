import { combineReducers, configureStore } from "@reduxjs/toolkit";

import appStateSlice from "../slices/appStateSlice";
import { appApi } from "../slices/serviceSlice";

const rootReducer = combineReducers({
    appApi: appApi.reducer,
  appState: appStateSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(appApi.middleware),
  });

export const Store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof Store.dispatch;