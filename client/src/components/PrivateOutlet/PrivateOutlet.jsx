import { useLocation, Navigate, Outlet } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";

const PrivateOutlet = () => {
  const { user } = useUserContext();
  const location = useLocation();

  return user._id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateOutlet;
