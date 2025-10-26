import { configureStore } from '@reduxjs/toolkit';
import lessonReducer from './slices/lessons';

export const makeStore = () => {
  return configureStore({
    reducer: {
      lesson: lessonReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];