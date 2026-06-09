import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/users/update-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      });

      if (response.status === 200) {
        alert("profile updated successfully✅");
      } else {
        alert("profile updating failed❌");
      }
      setUsername("");
      setEmail("");
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
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="User Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
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
