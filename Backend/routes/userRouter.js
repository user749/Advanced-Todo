import express from "express";
import { isAuthenitcated } from "../middleware/isAuth.js";
import { roleRestriction } from "../middleware/roleRestriction.js";
import User from "../model/Staff/User.js";
import { advancedResults } from "../middleware/advancedResults.js";
import {
  getSingleUser,
  updateSingleUser,
  userLogin,
  userRegister,
} from "../controller/userCtrl.js";

export const userRouter = express.Router();

userRouter.post("/register", userRegister);

userRouter.post("/login", userLogin);

userRouter.get(
  "/",
  isAuthenitcated(User),
  roleRestriction("User"),
  getSingleUser
);

userRouter.put(
  "/update",
  isAuthenitcated(User),
  roleRestriction("User"),
  updateSingleUser
);
