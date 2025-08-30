import AsyncHandler from "../utils/AsyncHandler.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const userSignup = AsyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullname, username, email, password } = req.body;

  if ([fullname, username, email, password].some((field) => field === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }
  const user = await User.create({
    fullname,
    username,
    email,
    password,
  });
  const users = await User.findById(user._id).select("-password -refreshToken");
  if (!users) {
    throw new ApiError(400, "User not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", users));
});
export const userLogin = AsyncHandler(async (req, res) => {});
export const userLogout = AsyncHandler(async (req, res) => {});
