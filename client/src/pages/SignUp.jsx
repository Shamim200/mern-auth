import { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { SignUpSchema } from "../validation";

const SignUp = () => {
  const fileInputRef = useRef(null); // Add a ref for the file input

  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      avatar: null,
    },

    validationSchema: SignUpSchema,

    onSubmit: async (values, { resetForm }) => {
      resetForm({ values: "" });

      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input value
      }

      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("avatar", values.avatar);

      try {
        const response = await axios.post("/api/v1/users/signup", formData);

        if (response.status === 201) {
          alert("Sign Up successfully✅");
        } else {
          alert("Sign Up failed❌");
        }
      } catch (error) {
        console.log("Signup error: ", error?.message);
      }
    },
  });

  return (
    <Container>
      <Form method="POST" onSubmit={handleSubmit} className="my-5">
        <h4 className="text-center mt-5 text-capitalize">user sign up form</h4>
        <Form.Group className="mb-3">
          <Form.Label className="text-capitalize">full name</Form.Label>
          <Form.Control
            name="fullname"
            id="fullname"
            value={values.fullname}
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            required
          />
          {touched.fullname && errors.fullname && (
            <p className="text-danger my-2">{errors.fullname}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-capitalize">user name</Form.Label>
          <Form.Control
            name="username"
            id="username"
            value={values.username}
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            required
          />
          {touched.fullname && errors.username && (
            <p className="text-danger my-2">{errors.username}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-capitalize">Email</Form.Label>
          <Form.Control
            name="email"
            id="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            required
          />
          {touched.email && errors.email && (
            <p className="text-danger my-2">{errors.email}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="text-capitalize">password</Form.Label>
          <Form.Control
            name="password"
            id="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            required
          />
          {touched.password && errors.password && (
            <p className="text-danger my-2">{errors.password}</p>
          )}
        </Form.Group>

        {/* upload file */}

        <Form.Group className="mb-3">
          <Form.Control
            name="avatar"
            id="avatar"
            value={values.avatar}
            ref={fileInputRef}
            onChange={(event) => {
              setFieldValue("avatar", event.target?.avatar[0]);
            }}
            type="file"
          />
          {touched.avatar && errors.avatar && (
            <p className="text-danger my-2">{errors.avatar}</p>
          )}
        </Form.Group>

        <p className="text-capitalize">
          all ready have an account?{" "}
          <Link className="text-decoration-none text-success" to="/signin">
            Sign In
          </Link>
        </p>
        <Button variant="outline-primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};
export default SignUp;
