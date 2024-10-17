import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);

  console.log(auth.isAuthenticated)
  if (!auth.isAuthenticated) {
    console.log("no autenticado");
    // Si el usuario no está autenticado, lo rediriges al login
    return <Navigate to="/" />;
  }

  // Si está autenticado, renderizas el contenido de la ruta
  return children;
}
