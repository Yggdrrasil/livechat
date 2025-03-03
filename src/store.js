import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './features/chatSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer, // chatstorage
  },
});