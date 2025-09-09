import { Spinner } from "react-bootstrap";
const Loading = () => {
  return (
    <div className="text-center my-5">
      <Spinner animation="border" variant="dark" role="status" />
    </div>
  );
};
export default Loading;
