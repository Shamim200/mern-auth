import { UseAuth } from "../context/Auth";
import { Navigate } from "react-router-dom";
const Protect = ({ children }) => {
  const { user } = UseAuth();

  return !user ? <Navigate to="/signin" /> : children;
};
export default Protect;
