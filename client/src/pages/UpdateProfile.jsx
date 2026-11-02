import { useTransition } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { UpdateProfileSchma } from "../validation";
import { useFormik } from "formik";

const UpdateProfile = () => {
  const [ispending, startTransition] = useTransition();

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
      },

      validationSchema: UpdateProfileSchma,
      onSubmit: async (values, { resetForm }) => {
        resetForm({ values: "" });
        startTransition(async () => {
          try {
            const response = await axios.patch(
              "/api/v1/users/update-profile",
              {
                ...values,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.status === 200) {
              toast.success("Profile Updated Successfully✅");
            } else {
              toast.error("Profile Updating Failed❌");
            }
          } catch (error) {
            console.log("Profile Updating Failed: ", error?.message);
            toast.error("Profile Updating Failed❌");
          }
        });
      },
    });

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h4 className="text-capitalize text-center mt-5">
          update user profile
        </h4>
        <Form.Group className="mb-3">
          <Form.Control
            name="username"
            id="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="User Name"
            required
          />
          {touched.username && errors.username && (
            <p className="text-danger my-2">{errors.username}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            placeholder="Email"
            required
          />
          {touched.email && errors.email && (
            <p className="text-danger my-2">{errors.email}</p>
          )}
        </Form.Group>

        <Button variant="outline-success" type="submit" ispending={ispending}>
          {ispending ? <Loader /> : "Update Profile"}
        </Button>
      </Form>
    </Container>
  );
};
export default UpdateProfile;
