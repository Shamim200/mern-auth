import { check, validationResult } from "express-validator";

// user signup validation✅
export const userSignUpValidation = [
  check("fullname")
    .trim()
    .isLength({ min: 6, max: 30 })
    .withMessage("Fullname must be between 6 and 30 characters"),
  check("username")
    .trim()
    .isLength({ min: 6, max: 30 })
    .withMessage("Username must be between 6 and 30 characters"),
  check("email").trim().isEmail().withMessage("Please provide a valid email"),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
// user signin validation✅
export const userSignInValidation = [
  check("email").trim().isEmail().withMessage("Please provide a valid email"),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
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
