import { UseAuth } from "../context/Auth";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
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
