import AsyncHandler from "express-async-handler";
import User from "../model/Staff/User.js";
import { generateToken } from "../utils/generateToken.js";
import { hashPassword, isPassMatched } from "../utils/helpers.js";
import Admin from "../model/Staff/Admin.js";

//@desc Register User
//@route POST /api/v1/users/register
//@access private User
export const userRegister = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check if the email exsists
  const userFound = await User.findOne({ email });
  if (userFound) {
    throw new Error("User already exists.");
  } else {
    const user = await User.create({
      name,
      email,
      password: await hashPassword(password),
    });
    //push the user in the Admin DB
    const admin = await Admin.findById("64988c0f54563c8870319276");
    if (admin) {
      admin.user.push(user._id);
      await admin.save();
    } else {
      throw new Error("Admin not found!");
    }

    res.status(200).json({
      status: "success",
      date: user,
      message: "User registered successfully",
    });
  }
});

//@desc Login User
//@route router POST /api/v1/users/login
//@access private user
export const userLogin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;


  //Find The User
  const userFound = await User.findOne({ email });
  if (!userFound || userFound.isSuspended) {
    return res.status(400).json({
      message:
        "Wrong email or password. Please try again or contact admin support.",
    });
  }

  //verify password
  const isMatched = await isPassMatched(password, userFound.password);

  if (!isMatched) {
    return res
      .status(400)
      .json({ message: "Wrong email or password. Please try again." });
  } else {
    return res.status(201).json({
      data: generateToken(userFound.id),
      message: "User Logged In Successfully",
    });
  }
});

//@desc Get Single User
//@route GET /api/v1/users/
//@access private user
export const getSingleUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuth._id).select(
    "-password -createdAt -updatedAt"
  );

  if (!user) {
    throw new Error("User not found");
  } else {
    res.status(200).json({
      status: "success",
      data: user,
      message: "User Profile Fetched Successfully",
    });
  }
});

//@desc Update Single User
//@route PUT /api/v1/users/update
//@access private user
export const updateSingleUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check if email already token
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error("This email is already taken");
  }

  //check if the user is updating the password
  if (password) {
    //update
    const user = await User.findByIdAndUpdate(
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
      data: user,
      message: "User passowrd updated successfully",
    });
  } else {
    //update
    const user = await User.findByIdAndUpdate(
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
      data: user,
      message: "User updated successfully",
    });
  }
});
