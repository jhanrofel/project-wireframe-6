import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/userSlice";
import chatsReducer from "./slice/chatSlice";
import uploadsReducer from "./slice/uploadSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    chats: chatsReducer,
    uploads: uploadsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
