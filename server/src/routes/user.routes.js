import { Router } from "express";

import {
  userSignup,
  userLogin,
  userLogout,
} from "../controllers/user.controllers.js";

import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/signup").post(upload.single("avatar"), userSignup);
router.route("/login").post(userLogin);
router.route("/logout").post(userLogout);

export default router;
