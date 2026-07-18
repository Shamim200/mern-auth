import { useState, useTransition } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const [ispending, startTransition] = useTransition();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const response = await fetch("/api/v1/users/update-profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email }),
        });

        if (response.status === 200) {
          toast.success("Profile updated successfully✅");
        } else {
          toast.error("Profile updating failed❌");
        }
        setUsername("");
        setEmail("");
      } catch (error) {
        console.log("profile updating failed: ", error.message);
        toast.error("Profile updating failed❌");
      }
    });
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
            required
          />
        </Form.Group>

        <Button variant="outline-success" type="submit" ispending={ispending}>
          {ispending ? <Loader /> : "Update Profile"}
        </Button>
      </Form>
    </Container>
  );
};
export default UpdateProfile;
