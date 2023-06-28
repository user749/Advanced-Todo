import express from "express";
import {
  globalErrHandler,
  notFoundErr,
} from "../middleware/globalErrHandlers.js";
import { adminRouter } from "../routes/adminRouter.js";
import { userRouter } from "../routes/userRouter.js";
import { todoRouter } from "../routes/listRouter.js";

export const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todo", todoRouter);

//Error middleware
app.use(notFoundErr);
app.use(globalErrHandler);
