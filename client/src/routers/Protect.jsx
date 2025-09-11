import { UseAuth } from "../context/Auth";
import { Navigate } from "react-router-dom";
const Protect = ({ children }) => {
  const { user } = UseAuth();
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return children;
};
export default Protect;
