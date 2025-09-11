import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import axios from "axios";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/users/change-password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setOldPassword("");
      setNewPassword("");

      if (response.status === 200) {
        alert("password changed successfully");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log("chagne password error: ", error?.message);
    }
  };
  return (
    <Container>
      <Form onSubmit={handelSubmit}>
        <h4 className="text-capitalize text-center mt-5">user sign in form</h4>
        <Form.Group className="mb-3">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            value={oldPassword}
            placeholder="Enter old password"
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            value={newPassword}
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            required
          />
        </Form.Group>

        <Button variant="outline-success" type="submit">
          Update Password
        </Button>
      </Form>
    </Container>
  );
};
export default ChangePassword;
