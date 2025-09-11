import { UseAuth } from "../context/Auth";
const Dashboard = () => {
  const { user } = UseAuth();

  return (
    <div className="text-center mt-5">
      <h4 className="text-capitalize">welcome to {user.username}</h4>
    </div>
  );
};
export default Dashboard;
