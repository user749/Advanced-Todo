import AsyncHandler from "express-async-handler";
import Admin from "../model/Staff/Admin.js";
import User from "../model/Staff/User.js";
import { generateToken } from "../utils/generateToken.js";
import { hashPassword, isPassMatched } from "../utils/helpers.js";

//@desc register Admin
//@route POST /api/v1/admins/register
//@access private Admin
export const adminRegister = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check if the email exsists
  const adminFound = await Admin.findOne({ email });
  if (adminFound) {
    throw new Error("Admin already exists.");
  } else {
    const admin = await Admin.create({
      name,
      email,
      password: await hashPassword(password),
    });
    res.status(200).json({
      status: "success",
      date: admin,
      message: "Admin registered successfully",
    });
  }
});

//@desc Login Admin
//@route POST /api/v1/admins/login
//@access private admin
export const adminLogin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Find The Admin
  const adminFound = await Admin.findOne({ email });
  if (!adminFound) {
    return res.json({ message: "Wrong email or password. Please try again." });
  }
  //verify password
  const isMatched = await isPassMatched(password, adminFound.password);

  if (!isMatched) {
    return res.json({ message: "Wrong email or password. Please try again." });
  } else {
    return res.status(200).json({
      data: generateToken(adminFound.id),
      message: "Admin Logged In Successfully",
    });
  }
});

//@desc Get All Admins
//@route GET /api/v1/admins/getall
//@access private admin
export const getAllAdmins = AsyncHandler(async (req, res) => {
  res.status(200).json(res.results);
});

//@desc Get Single Admins
//@route GET /api/v1/admins/
//@access private admin
export const getSingleAdmin = AsyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth._id).select(
    "-password -createdAt -updatedAt"
  );

  if (!admin) {
    throw new Error("Admin not found");
  } else {
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin Profile Fetched Successfully",
    });
  }
});

//@desc Get Single Admins
//@route PUT /api/v1/admins/update
//@access private admin
export const updateSingleAdmin = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check if email already token
  const emailExist = await Admin.findOne({ email });
  if (emailExist) {
    throw new Error("This email is already taken");
  }

  //check if the user is updating the password
  if (password) {
    //update
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await hashPassword(password),
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin passowrd updated successfully",
    });
  } else {
    //update
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully",
    });
  }
});

//@desc Suspend the user
//@route PUT /api/v1/admins/userID/suspend
//@access private admin
export const suspendUser = AsyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.userID,
    {
      isSuspended: true,
    },
    {
      new: true,
    }
  );

  if (user) {
    res.status(200).json({
      status: "success",
      data: user,
      message: "User suspended succesfully",
    });
  } else {
    res.status(200).json({
      status: "failed",
      data: user,
      message: "Failed to suspended the user",
    });
  }
});

//@desc Unsuspend the user
//@route PUT /api/v1/admins/userID/unsuspend
//@access private admin
export const unSuspendUser = AsyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.userID,
    {
      isSuspended: false,
    },
    {
      new: true,
    }
  );

  if (user) {
    res.status(200).json({
      status: "success",
      data: user,
      message: "User unsuspended succesfully",
    });
  } else {
    res.status(200).json({
      status: "failed",
      data: user,
      message: "Failed to unsuspended the user",
    });
  }
});
