import { useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UseAuth } from "../context/Auth";
import { toast } from "react-toastify";
import { useTransition } from "react";
import Loader from "../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const [ispending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = UseAuth(); // destructuring

  const handelSubmit = async (e) => {
    e.preventDefault();

    startTransition(async () => {
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
          toast.success("user signin successfully");
          setRedirect(true);
        } else if (response.status === 401) {
          toast.error("Unauthorized: Invalid credentials❌");
        } else {
          toast.error("user signin failed");
        }
      } catch (error) {
        console.log("signin error: ", error?.message);
      }
    });
  };

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container>
      <Form onSubmit={handelSubmit}>
        <h4 className="text-capitalize text-center mt-5">user sign in form</h4>
        <Form.Group className="mb-3">
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <InputGroup>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "password" : "text"}
              placeholder="Password"
              required
            />
            <Button
              onClick={() => setShowPassword(!showPassword)}
              style={{ zIndex: 0 }} // Bootstrap-এর ফোকাস বর্ডার ওভারল্যাপ ঠিক রাখতে
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
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
