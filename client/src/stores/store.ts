import { configureStore } from "@reduxjs/toolkit";
import todolistTodolist from "./reducers/todolistTodolist";

export const store:any = configureStore({
    reducer: {
        todo: todolistTodolist
    }
})
