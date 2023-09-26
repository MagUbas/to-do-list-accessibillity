import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import toDoListReducer from "./features/toDoList/toDoListSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    toDoList: toDoListReducer,
  },
});
