import {tasksReducer} from './task.slice';
import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './auth.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export {store};
