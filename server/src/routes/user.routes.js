import { Router } from "express";

import {
  userSignup,
  userSignin,
  userLogout,
} from "../controllers/user.controllers.js";

import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/signup").post(upload.single("avatar"), userSignup);
router.route("/signin").post(userSignin);
router.route("/logout").post(userLogout);

export default router;
