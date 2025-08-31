import jwt from "jsonwebtoken";
import AsyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import User from "../models/user.models.js";

export const AuthMiddleware = AsyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return new ApiError(401, "Unauthorized: No token provided");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    req.user = user;
    next();
  } catch (error) {
    new ApiError(401, error?.message || "Invalid Token");
  }
});
