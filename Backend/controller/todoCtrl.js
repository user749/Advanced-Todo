import AsyncHandler from "express-async-handler";
import User from "../model/Staff/User.js";
import Todo from "../model/Technical/List.js";

//@desc Create todo list item
//@route POST /api/v1/todo/create
//@access private User
export const todoCreateItem = AsyncHandler(async (req, res) => {
  const { name, endDate, alarmHour, todoId } = req.body;

  //check if the todo list with the same id exists
  const todoID = await Todo.findOne({ todoId });
  if (todoID) {
    throw new Error("To-Do list with the corresponding id already exists.");
  } else {
    const list = await Todo.create({
      name,
      endDate,
      alarmHour,
      createdBy: req.userAuth._id,
    });

    if (list) {
      const user = await User.findById(req.userAuth._id);
      user.listItems.push(list._id);
      await user.save();

      const listItem = await Todo.findById(list._id)
        .select(["name", "endDate", "alarmHour", "isCompleted", "todoId"])
        .populate(["name", "endDate", "alarmHour", "isCompleted", "todoId"]);

      res.status(200).json({
        status: "success",
        data: [listItem],
      });
    } else {
      throw new Error("List cannot about created. Error!");
    }
  }
});

//@desc Get All List Items for User
//@route GET /api/v1/todo/getitems
//@access private User
export const getSingleTodo = AsyncHandler(async (req, res) => {
  const todoList = await Todo.find({ createdBy: req.userAuth._id })
    .select(["name", "endDate", "alarmHour", "isCompleted", "todoId"])
    .populate(["name", "endDate", "alarmHour", "isCompleted", "todoId"]);

  res.status(200).json({
    status: "success",
    data: todoList,
  });
});

//@desc Update List Items for User
//@route GET /api/v1/todo/update
//@access private User
export const updateTodo = AsyncHandler(async (req, res) => {
  const { name, endDate, alarmHour, todoId, isCompleted } = req.body;

  //check if the todo item exists
  const todo = await Todo.findOne({ todoId: todoId });
  if (!todo) {
    throw new Error("Requested To-do Doesn't Exist");
  }

  const updateListItem = await Todo.findOneAndUpdate(
    { todoId: todoId },
    {
      name,
      endDate,
      alarmHour,
      isCompleted,
    },
    {
      new: true,
    }
  );

  const listItem = await Todo.findById(updateListItem._id)
    .select(["name", "endDate", "alarmHour", "isCompleted", "todoId"])
    .populate(["name", "endDate", "alarmHour", "isCompleted", "todoId"]);

  res.status(200).json({
    status: "success",
    message: "Todo List Updated Successfully",
    data: [listItem],
  });
});

//@desc Delete List Item for User
//@route Delete /api/v1/todo/:todoId/delete
//@access private User
export const deleteTodo = AsyncHandler(async (req, res) => {
  const listID = req.params.todoID;

  //check if the todo item exists
  const todo = await Todo.findOneAndDelete({ todoId: listID });
  if (!todo) {
    res.status(404);
    throw new Error("Requested To-do Doesn't Exist");
  } else {
    res.status(200).json({
      status: "success",
      message: "Todo List Delete Successfully",
      data: todo,
    });
  }
});
