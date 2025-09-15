import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    console.log(email);
  };
  return (
    <Container className="my-5">
      <Form onSubmit={handelSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Button variant="outline-success" className="my-3" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
export default ForgotPassword;
