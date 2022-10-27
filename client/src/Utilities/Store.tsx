import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/userSlice";
import chatsReducer from "./slice/chatSlice";
import uploadsReducer from "./slice/uploadSlice";
import shareTosReducer from "./slice/shareToSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    chats: chatsReducer,
    uploads: uploadsReducer,
    shareTos: shareTosReducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
