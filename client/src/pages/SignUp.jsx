import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <Container>
      <Form>
        <h4 className="text-center mt-5 text-capitalize">user sign up form</h4>
        <Form.Group className="mb-3" controlId="basicname">
          <Form.Label className="text-capitalize">full name</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="basicname">
          <Form.Label className="text-capitalize">user name</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="basicEmail">
          <Form.Label className="text-capitalize">Email</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="basicPassword">
          <Form.Label className="text-capitalize">password</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>

        <p className="text-capitalize">
          all ready have an account?{" "}
          <Link className="text-decoration-none text-success" to="/sign-in">
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
