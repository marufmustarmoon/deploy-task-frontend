import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import taskReducer from './reducers/taskReducer';

// Check if there's user info stored in localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const preloadedState = {
  user: { user: userInfoFromStorage, isAuthenticated: !!userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: process.env.NODE_ENV !== 'production',  
      serializableCheck: process.env.NODE_ENV !== 'production', 
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
