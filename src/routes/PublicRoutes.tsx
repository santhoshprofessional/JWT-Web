import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" /> : <div>{children}</div>;
};

export default PublicRoutes;
