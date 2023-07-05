import express from "express";
import { isAuthenitcated } from "../middleware/isAuth.js";
import { roleRestriction } from "../middleware/roleRestriction.js";
import User from "../model/Staff/User.js";
import {
  deleteTodo,
  getSingleTodo,
  todoCreateItem,
  updateTodo,
} from "../controller/todoCtrl.js";
import { advancedResults } from "../middleware/advancedResults.js";

export const todoRouter = express.Router();

todoRouter.post(
  "/create",
  isAuthenitcated(User),
  roleRestriction("User"),
  todoCreateItem
);

//get all list items for a single item
todoRouter.get(
  "/getitems",
  isAuthenitcated(User),
  roleRestriction("User"),
  getSingleTodo
);

todoRouter.put(
  "/update",
  isAuthenitcated(User),
  roleRestriction("User"),
  updateTodo
);

todoRouter.delete(
  "/:todoID/delete",
  isAuthenitcated(User),
  roleRestriction("User"),
  deleteTodo
);
