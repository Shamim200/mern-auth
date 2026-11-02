import { Bounce, ToastContainer } from "react-toastify";
import Headers from "./components/Headers";
import Routers from "./routers/Routers";

const App = () => {
  return (
    <>
      <Headers />
      <Routers />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
