import { useState, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { SignUpSchema } from "../validation/index";
import { Formik } from "formik";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null); // Add a ref for the file input

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    try {
      const response = await axios.post("/api/v1/users/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFullname("");
      setUsername("");
      setEmail("");
      setPassword("");
      setAvatar(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }

      console.log(response);
    } catch (error) {
      console.log("Signup error: ", error?.message);
    }
  };

  return (
    <Container>
      <Form method="POST" onSubmit={handelSubmit} className="my-5">
        <h4 className="text-center mt-5 text-capitalize">user sign up form</h4>
        <Form.Group className="mb-3">
          <Form.Label className="text-capitalize">full name</Form.Label>
          <Form.Control
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-capitalize">user name</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="basicEmail">
          <Form.Label className="text-capitalize">Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="basicPassword">
          <Form.Label className="text-capitalize">password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </Form.Group>

        {/* upload file */}

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            onChange={(e) => setAvatar(e.target.files[0])}
            ref={fileInputRef}
            type="file"
          />
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
