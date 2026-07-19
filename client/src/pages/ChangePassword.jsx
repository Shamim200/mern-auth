import { useState, useTransition } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ChangePassword = () => {
  const [ispending, startTransition] = useTransition();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
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
          toast.success("Password changed successfully");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log("Change password error: ", error?.message);
        toast.error("Something went wrong");
      }
    });
  };
  return (
    <Container>
      <Form onSubmit={handelSubmit}>
        <h4 className="text-capitalize text-center mt-5">
          change user password
        </h4>
        <Form.Group className="mb-3">
          <Form.Control
            value={oldPassword}
            placeholder="Current Password"
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            type="password"
            required
          />
        </Form.Group>

        <Button variant="outline-success" type="submit" ispending={ispending}>
          {ispending ? <Loader /> : "submit"}
        </Button>
      </Form>
    </Container>
  );
};
export default ChangePassword;
