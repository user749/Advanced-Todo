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
    } else {
      throw new Error("List cannot about created. Error!");
    }

    res.status(200).json({
      status: "success",
      data: list,
      message: "List Item Created Successfully",
    });
  }
});

//@desc Get All List Items for User
//@route GET /api/v1/todo/getall
//@access private User
export const getAllTodo = AsyncHandler(async (req, res) => {
  res.status(200).json(res.results);
});
