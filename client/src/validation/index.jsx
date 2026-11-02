import * as Yup from "yup";

export const SignUpSchema = Yup.object({
  fullname: Yup.string().min(6).max(21).required("Please enter your full name"),
  username: Yup.string().min(6).max(15).required("Please enter your user name"),
  email: Yup.string().email().required("Please provide a valid email"),
  password: Yup.string()
    .min(8, "use capital letter (a-z, A-Z) and special charecter !,@,#,$,%,&,*")
    .max(30)
    .required("Please enter your password"),
});

export const SignInSchema = Yup.object({
  email: Yup.string().email().required("Please provide a valid email"),
  password: Yup.string()
    .min(8, "at last 8 charecters")
    .max(30)
    .required("Please enter your password"),
});

export const ChangePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("enter your current password"),
  newPassword: Yup.string()
    .min(8, "at last 6 words, numbers or special charecters(@,#,%)")
    .max(30),
});

export const UpdateProfileSchma = Yup.object({
  username: Yup.string()
    .min(6, "at last 6 words, numbers or special charecters(@,#,%)")
    .max(15)
    .required("provide valid and unique username"),
  email: Yup.string().email().required("provide valid and unique email"),
});
