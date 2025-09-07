import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <Container>
      <Form>
        <h4 className="text-capitalize text-center mt-5">user sign in form</h4>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
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
