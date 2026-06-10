import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
        {/* public route */}
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />

        {/* private route */}
        <Route element={<Protect />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
export default Routers;
