import { Router } from "express";

import {
  userSignup,
  userSignin,
  userLogout,
  userDashboard,
  resetPassword,
} from "../controllers/user.controllers.js";

import { upload } from "../middleware/multer.middleware.js";
import { AuthMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/signup").post(upload.single("avatar"), userSignup);
router.route("/signin").post(userSignin);
router.route("/logout").post(AuthMiddleware, userLogout);
router.route("/dashboard").get(AuthMiddleware, userDashboard); //user dashboard
router.route("/reset-password").post(AuthMiddleware, resetPassword); //change user password

export default router;
