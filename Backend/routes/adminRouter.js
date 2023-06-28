import express from "express";
import { isAuthenitcated } from "../middleware/isAuth.js";
import { roleRestriction } from "../middleware/roleRestriction.js";
import Admin from "../model/Staff/Admin.js";
import {
  adminLogin,
  adminRegister,
  getAllAdmins,
  getSingleAdmin,
  suspendUser,
  unSuspendUser,
  updateSingleAdmin,
} from "../controller/adminCtrl.js";
import { advancedResults } from "../middleware/advancedResults.js";
export const adminRouter = express.Router();

//register admin, first admin is created without these restrictions
// every admin after that is made using isAuth and roleRestr middlewares
adminRouter.post(
  "/register",
  isAuthenitcated(Admin),
  roleRestriction("Admin"),
  adminRegister
);

//login admin, returns jwt token
adminRouter.post("/login", adminLogin);

//get all admins
adminRouter.get(
  "/getall",
  isAuthenitcated(Admin),
  roleRestriction("Admin"),
  advancedResults(Admin),
  getAllAdmins
);

//get single admin
adminRouter.get(
  "/",
  isAuthenitcated(Admin),
  roleRestriction("Admin"),
  getSingleAdmin
);

//Update admin
adminRouter.put(
  "/update",
  isAuthenitcated(Admin),
  roleRestriction("Admin"),
  updateSingleAdmin
);

//Suspend the user
adminRouter.put(
  "/:userID/suspend",
  isAuthenitcated(Admin),
  roleRestriction("Admin"),
  suspendUser
);

//Unsuspend the user
adminRouter.put(
  "/:userID/unsuspend",
  isAuthenitcated(Admin),
  roleRestriction("Admin"),
  unSuspendUser
);
