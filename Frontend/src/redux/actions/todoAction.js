import axios from "axios";
import {
  setLoading,
  setError,
  setTodos,
  addTodo,
  updateTodo,
  removeTodo,
} from "../slices/todoSlice";

export const fetchTodos = () => async (dispatch, getState) => {
  dispatch(setLoading());

  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.data.token}`,
        "Content-Type": "application/json",
      },
    };
    const data = await axios.get("/api/v1/todo/getitems", config);
    dispatch(setTodos(data.data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const createTodo = (title, date, time) => async (dispatch, getState) => {
  dispatch(setLoading());

  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.data.token}`,
      },
    };
    const endDate = date;
    const alarmHour = time;
    const name = title;

    const data = await axios.post(
      "/api/v1/todo/create",
      { name, endDate, alarmHour },
      config
    );
    dispatch(addTodo(data.data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const editTodo = (id, updates) => async (dispatch, getState) => {
  dispatch(setLoading());
  const {
    user: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.data.token}`,
      },
    };
    const name = updates;
    const todoId = id;

    const { data } = await axios.put(
      `/api/v1/todo/update`,
      { name, todoId },
      config
    );
    dispatch(updateTodo(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const deleteTodo = (id) => async (dispatch, getState) => {
  dispatch(setLoading());

  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.data.token}`,
        "Content-Type": "application/json",
      },
    };

    await axios.delete(`/api/v1/todo/${id}/delete`, config);

    dispatch(removeTodo(id));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
