import { check, validationResult } from "express-validator";

// user signup validation✅
export const userSignUpValidation = [
  check("fullname")
    .trim()
    .isLength({ min: 6, max: 21 })
    .withMessage("Fullname must be between 6 and 21 characters"),
  check("username")
    .trim()
    .isLength({ min: 6, max: 15 })
    .withMessage("Username must be between 6 and 15 characters"),
  check("email").trim().isEmail().withMessage("Please provide a valid email"),
  check("password")
    .trim()
    .isLength({ min: 8, max: 30 })
    .withMessage("Password must be between 8 and 30 characters"),
];

// user signin validation✅
export const userSignInValidation = [
  check("email").trim().isEmail().withMessage("Please provide a valid email"),
  check("password")
    .trim()
    .isLength({ min: 8, max: 30 })
    .withMessage("Password must be between 8 and 30 characters"),
];

// change user password validation✅
export const changePasswordValidation = [
  check("oldPassword").trim(),
  check("newPassword")
    .trim()
    .isLength({ min: 8, max: 30 })
    .withMessage("Password must be between 8 and 30 characters"),
];

// update user profile validation✅
export const UserProfileUpdateValidation = [
  check("username")
    .trim()
    .isLength({ min: 6, max: 15 })
    .withMessage("username must be between 6 and 15 characters"),
  check("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid and unique email addresh"),
];

// validation errors❌
export const validationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};
