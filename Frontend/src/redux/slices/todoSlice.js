import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  todos: JSON.parse(localStorage.getItem("todos")) ?? [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    setTodos: (state, { payload }) => {
      state.todos = payload.data;
      state.error = null;
      state.loading = false;
    },
    addTodo: (state, { payload }) => {
      state.todos = [...state.todos, payload.data[0]];
      state.error = null;
      state.loading = false;
    },
    updateTodo: (state, { payload }) => {
      state.todos = state.todos.map((todo) =>
        todo._id === payload.data[0]._id ? payload.data[0] : todo
      );
      state.error = null;
      state.loading = false;
    },
    removeTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.todoId !== payload);
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setTodos,
  addTodo,
  updateTodo,
  removeTodo,
} = todoSlice.actions;

export default todoSlice.reducer;

export const todoSelector = (state) => state.todo;
