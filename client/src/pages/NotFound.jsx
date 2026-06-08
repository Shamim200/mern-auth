import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto mt-5">
      <h5 className="text-center">404 Not Found 😔!</h5>
      <div className="d-flex justify-content-center align-items-center">
        <Link to="/signup">
          <Button
            className="text-capitalize mx-3 my-5"
            variant="outline-success"
          >
            sign up
          </Button>
        </Link>
        <Link to="/signin">
          <Button className="text-capitalize" variant="outline-success">
            sign in
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
