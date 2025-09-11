import axios from "axios";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "/api/v1/users/update-profile",
        {
          username,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUsername("");
      setEmail("");

      if (response.status === 200) {
        alert("profile updated successfully✅");
      } else {
        alert("profile updating failed❌");
      }
    } catch (error) {
      console.log("profile updating failed: ", error.message);
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h4 className="text-capitalize text-center mt-5">
          update user profile
        </h4>
        <Form.Group className="mb-3">
          <Form.Label>User name</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        <Button variant="outline-success" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
};
export default UpdateProfile;
