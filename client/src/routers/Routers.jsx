import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";

const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
const NotFound = lazy(() => import("../pages/NotFound"));

const Routers = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
export default Routers;
