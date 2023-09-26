import { configureStore } from "@reduxjs/toolkit";
import toDoListReducer from "./features/toDoList/toDoListSlice";
export const store = configureStore({
  reducer: {
    toDoList: toDoListReducer,
  },
});
