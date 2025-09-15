import * as Yup from "yup";

export const SignInSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const SignUpSchema = Yup.object({
  fullname: Yup.string().min(3).max(20).required("Please enter your name"),
  username: Yup.string().min(2).max(20).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password"),
});
