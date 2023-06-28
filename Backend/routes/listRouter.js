import express from "express";
import { isAuthenitcated } from "../middleware/isAuth.js";
import { roleRestriction } from "../middleware/roleRestriction.js";
import User from "../model/Staff/User.js";
import { getAllTodo, todoCreateItem } from "../controller/todoCtrl.js";
import { advancedResults } from "../middleware/advancedResults.js";
import Todo from "../model/Technical/List.js";

export const todoRouter = express.Router();

todoRouter.post(
  "/create",
  isAuthenitcated(User),
  roleRestriction("User"),
  todoCreateItem
);

todoRouter.get(
  "/getall",
  isAuthenitcated(User),
  roleRestriction("User"),
  advancedResults(Todo),
  getAllTodo
);
