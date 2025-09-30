import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";
import Protect from "./Protect";

const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
const UpdateProfile = lazy(() => import("../pages/UpdateProfile"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));

const Routers = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <Protect>
              <Dashboard />
            </Protect>
          }
        />
        <Route
          path="/change-password"
          element={
            <Protect>
              <ChangePassword />
            </Protect>
          }
        />
        <Route
          path="/update-profile"
          element={
            <Protect>
              <UpdateProfile />
            </Protect>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
export default Routers;
