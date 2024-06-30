import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Todolist from "../../interface/interface";
import axios from "axios";

interface TodoState {
  todo: Todolist[];
}

const initialState: TodoState = {
  todo: []
};

export const getTodo = createAsyncThunk(
  "todo/getTodo",
  async () => {
    const response = await axios.get("http://localhost:8080/todoList");
    return response.data;
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todo: Todolist) => {
    const response = await axios.post("http://localhost:8080/todoList", todo);
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/todoList/${id}`);
    return id;
  }
);

export const checkTodo = createAsyncThunk(
  "todo/checkTodo",
  async (id: number) => {
    const todo = await axios.get(`http://localhost:8080/todoList/${id}`);
    const newTodo = { ...todo.data, completed: !todo.data.completed };
    const res = await axios.put(`http://localhost:8080/todoList/${id}`, newTodo);
    return res.data;
  }
);

export const editTodo = createAsyncThunk(
  "todo/editTodo",
  async (todo: Todolist) => {
    const response = await axios.put(`http://localhost:8080/todoList/${todo.id}`, todo);
    return response.data;
  }
);

const reducerTodoList = createSlice({
  name: "todoList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodo.fulfilled, (state, action) => {
        state.todo = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todo.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todo = state.todo.filter((todo) => todo.id !== action.payload);
      })
      .addCase(checkTodo.fulfilled, (state, action) => {
        state.todo = state.todo.map((todo) => todo.id === action.payload.id ? action.payload : todo);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.todo = state.todo.map((todo) => todo.id === action.payload.id ? action.payload : todo);
      });
  },
});

export default reducerTodoList.reducer;
