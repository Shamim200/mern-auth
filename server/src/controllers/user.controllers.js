import AsyncHandler from "../utils/AsyncHandler.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// genarate access & refresh token

const genarateAccessAndRefreshToken = async (userId) => {
  try {
    // find user by id
    // create access token
    // create refresh token
    // save refresh token in db
    // return both tokens

    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong in token generation");
  }
};

// signup functionality

export const userSignup = AsyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
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

  const avatar = req.file.path;
  const avatarUrl = `http://localhost:8000/${avatar}`;

  // create user
  const user = await User.create({
    fullname,
    username,
    email,
    password,
    avatar: avatarUrl,
  });

  const users = await User.findById(user._id).select("-password -refreshToken");
  if (!users) {
    throw new ApiError(400, "User not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", users));
});

// signin functionality

export const userSignin = AsyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPassword = await user.matchPassword(password);
  if (!isPassword) {
    throw new ApiError(401, "Invalid credentials");
  }
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const { accessToken, refreshToken } = await genarateAccessAndRefreshToken(
    user._id
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "Login successful"
      )
    );
});

// logout functionality

export const userLogout = AsyncHandler(async (req, res) => {
  // get user from req.user
  // find user in db and remove refresh token
  // clear cookies
  // send response

  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1, // remove refresh token from db
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logout successful"));
});

// user dashboard
export const userDashboard = AsyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, req.user, "User dashboard accessed successfully")
    );
});

// change user password
export const changePassword = AsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isCorrectPassword = await user.matchPassword(oldPassword);
  if (!isCorrectPassword) {
    throw new ApiError(401, "Old password is incorrect");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successful"));
});

// update user profile
export const updateUserProfile = AsyncHandler(async (req, res) => {
  const { username, email } = req.body;
  if ([username, email].some((field) => field === "")) {
    throw new ApiError(400, "All fields are required");
  }
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { username, email },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Profile updated successfully"));
});
