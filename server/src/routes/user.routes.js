import { Router } from "express";

import {
  userSignup,
  userSignin,
  userLogout,
  userDashboard,
  changePassword,
  updateUserProfile,
} from "../controllers/user.controllers.js";

import { upload } from "../middleware/multer.middleware.js";
import { AuthMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/signup").post(upload.single("avatar"), userSignup);
router.route("/signin").post(userSignin);
router.route("/logout").post(AuthMiddleware, userLogout);
router.route("/dashboard").get(AuthMiddleware, userDashboard); //user dashboard
router.route("/change-password").post(AuthMiddleware, changePassword); //change user password
router.route("/update-profile").patch(AuthMiddleware, updateUserProfile); //update user profile

export default router;
