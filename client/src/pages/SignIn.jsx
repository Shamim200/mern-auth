import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UseAuth } from "../context/Auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = UseAuth(); //destructuring

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/v1/users/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEmail("");
      setPassword("");

      if (response.status === 200) {
        const token = response.data.data?.accessToken;
        localStorage.setItem("accessToken", token);
        setUser(response.data.data);
        alert("user signin successfully");
        setRedirect(true);
      } else {
        alert("user signin failed");
      }
    } catch (error) {
      console.log("signin error: ", error?.message);
    }
  };

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container>
      <Form onSubmit={handelSubmit}>
        <h4 className="text-capitalize text-center mt-5">user sign in form</h4>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </Form.Group>
        <Link
          className="text-decoration-none text-primary"
          to="/forgot-password"
        >
          Forgot Password
        </Link>
        <p className="text-capitalize mt-3">
          create an account?{" "}
          <Link className="text-decoration-none text-success" to="/sign-up">
            Sign Up
          </Link>
        </p>
        <Button variant="outline-success" type="submit">
          Sign In
        </Button>
      </Form>
    </Container>
  );
};
export default SignIn;
