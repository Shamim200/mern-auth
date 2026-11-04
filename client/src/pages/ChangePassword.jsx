import { useTransition } from "react";
import axios from "axios";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { UseAuth } from "../context/Auth";
import { ChangePasswordSchema } from "../validation";
import { useFormik } from "formik";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [ispending, startTransition] = useTransition();

  const { showPassword, handelShowPassword } = UseAuth();

  const { errors, values, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        oldPassword: "",
        newPassword: "",
      },
      validationSchema: ChangePasswordSchema,
      onSubmit: async (values, { resetForm }) => {
        resetForm({ values: "" });

        startTransition(async () => {
          try {
            const response = await axios.post(
              `/api/v1/users/change-password`,
              {
                ...values,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.status === 200) {
              toast.success("Password Changed Successfully");
            } else {
              toast.error("Something went wrong");
            }
          } catch (error) {
            console.log("Change Password Error: ", error?.message);
            toast.error("Something went wrong");
          }
        });
      },
    });
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h4 className="text-capitalize text-center mt-5">
          change user password
        </h4>
        <Form.Group className="mb-3">
          <InputGroup>
            <Form.Control
              name="oldPassword"
              id="oldPassword"
              value={values.oldPassword}
              placeholder="Current Password"
              onChange={handleChange}
              onBlur={handleBlur}
              type={showPassword ? "text" : "password"}
              required
            />
            <Button onClick={() => handelShowPassword()}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </Button>
          </InputGroup>
          {touched.oldPassword && errors.oldPassword && (
            <p className="text-danger my-2">{errors.oldPassword}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <InputGroup>
            <Form.Control
              name="newPassword"
              id="newPassword"
              value={values.newPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="New Password"
              type={showPassword ? "text" : "password"}
              required
            />
            <Button onClick={() => handelShowPassword()}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </Button>
          </InputGroup>
          {touched.newPassword && errors.newPassword && (
            <p className="text-danger my-2">{errors.newPassword}</p>
          )}
        </Form.Group>

        <Button variant="outline-success" type="submit" ispending={ispending}>
          {ispending ? <Loader /> : "Change Password"}
        </Button>
      </Form>
    </Container>
  );
};
export default ChangePassword;
