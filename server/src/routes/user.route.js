import { Router } from "express";

import {
  userSignup,
  userSignin,
  userLogout,
  userDashboard,
  changePassword,
  updateUserProfile,
  refreshAccessToken,
  forgotPassword,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import {
  userSignInValidation,
  userSignUpValidation,
  validationErrors,
  changePasswordValidation,
  UserProfileUpdateValidation,
} from "../middlewares/validations/auth.validation.js";

const router = Router();

router
  .route("/signup")
  .post(
    upload.single("avatar"),
    userSignUpValidation,
    validationErrors,
    userSignup
  );
router
  .route("/signin")
  .post(userSignInValidation, validationErrors, userSignin);
router.route("/logout").post(AuthMiddleware, userLogout);
router.route("/dashboard").get(AuthMiddleware, userDashboard); //user dashboard
router
  .route("/change-password")
  .post(
    AuthMiddleware,
    changePasswordValidation,
    validationErrors,
    changePassword
  ); //change user password
router
  .route("/update-profile")
  .patch(
    AuthMiddleware,
    UserProfileUpdateValidation,
    validationErrors,
    updateUserProfile
  ); //update user profile
router.route("/refresh-accessToken").patch(AuthMiddleware, refreshAccessToken); //generate new access token
router.route("/forgot-password").post(forgotPassword);

export default router;
