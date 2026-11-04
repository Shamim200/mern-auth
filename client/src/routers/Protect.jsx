import { UseAuth } from "../context/Auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const Protect = () => {
  const { user } = UseAuth();
  const location = useLocation();

  return !user ? (
    <Navigate to="/signin" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
export default Protect;
