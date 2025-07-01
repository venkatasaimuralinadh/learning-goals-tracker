import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/AppContext";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { token } = useUser(); 
console.log("token"+token);

  if (!token) {
    return <Navigate to="/"  replace/>;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
