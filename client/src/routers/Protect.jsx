import { UseAuth } from "../context/Auth";
import { Navigate } from "react-router-dom";
const Protect = ({ children }) => {
  const { user } = UseAuth();

  user ? children : <Navigate to="/login" />;
};
export default Protect;
