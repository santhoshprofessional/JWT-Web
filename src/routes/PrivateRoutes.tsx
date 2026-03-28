// multiple routes best way

import { Navigate, Outlet } from "react-router-dom";
function PrivateRoutes() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRoutes;

// single routes best way
// import { Navigate } from "react-router-dom";

// const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
//   const token = localStorage.getItem("token");
//   return token ? <div>{children}</div> : <Navigate to="/login" />;
// };

// export default PrivateRoutes;
