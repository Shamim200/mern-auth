import { useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UseAuth } from "../context/Auth";
import { toast } from "react-toastify";
import { useTransition } from "react";
import Loader from "../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SignInSchema } from "../validation";
import { useFormik } from "formik";

const SignIn = () => {
  const [ispending, startTransition] = useTransition();
  const [redirect, setRedirect] = useState(false);

  const { setUser, showPassword, handelShowPassword } = UseAuth(); // destructuring

  const { errors, values, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },

      validationSchema: SignInSchema,

      onSubmit: async (values, { resetForm }) => {
        resetForm({ values: "" });

        startTransition(async () => {
          try {
            const response = await axios.post(
              `/api/v1/users/signin`,
              {
                ...values,
              },
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.status === 200) {
              // const token = response.data.data?.accessToken;
              // localStorage.setItem("accessToken", token);
              setUser(response.data.data);
              toast.success("User Sign In Successfully✅");
              setRedirect(true);
            }
          } catch (error) {
            if (error?.status === 400) {
              toast.error("Bad Request!");
            } else if (error?.status === 401) {
              toast.error("unauthrized request");
            } else if (error?.status === 404) {
              toast.error("Invalid user credential");
            } else if (error?.status === 500) {
              toast.error("Internal server error");
            }
          }
        });
      },
    });

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h4 className="text-capitalize text-center mt-5">user sign in form</h4>
        <Form.Group className="mb-3">
          <Form.Control
            name="email"
            id="email"
            autoComplete="off"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
          />
          {touched.email && errors.email && (
            <p className="text-danger my-2">{errors.email}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <InputGroup>
            <Form.Control
              name="password"
              id="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              required
            />
            <Button onClick={() => handelShowPassword()} style={{ zIndex: 0 }}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </Button>
          </InputGroup>
          {touched.password && errors.password && (
            <p className="text-danger my-2">{errors.password}</p>
          )}
        </Form.Group>
        <Link
          className="text-decoration-none text-primary"
          to="/forgot-password"
        >
          Forgot Password
        </Link>
        <p className="text-capitalize mt-3">
          create an account?{" "}
          <Link className="text-decoration-none text-success" to="/signup">
            Sign Up
          </Link>
        </p>
        <Button variant="outline-success" type="submit" ispending={ispending}>
          {ispending ? <Loader /> : "Sign In"}
        </Button>
      </Form>
    </Container>
  );
};
export default SignIn;
