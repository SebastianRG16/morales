import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/login/Login";
import { Signin } from "./components/login/Signin";
import { Register } from "./components/login/Register";
import { DashboardHome } from "./components/dashboard/DashboardHome";
import { Canchas } from "./components/canchas/Canchas";
import { CreateCancha } from "./components/canchas/CreateCancha";
import { Reservas } from "./components/reservas/Reservas";
import { CreateReserva } from "./components/reservas/CreateReserva";
import { Mantenimientos } from "./components/mantenimiento/Mantenimientos";
import { CreateMantenimiento } from "./components/mantenimiento/CreateMantenimiento";
import { EditCanchas } from "./components/canchas/EditCanchas";
import { EditReserva } from "./components/reservas/EditReserva";
import { EditMantenimiento } from "./components/mantenimiento/EditMantenimiento";
//CLIENTE
import { Dashboard } from "./componentsClients/dashboard/Dashboard";
import { ReservaClient } from "./componentsClients/reservas/ReservaClient";
import { CreateReservaClient } from "./componentsClients/reservas/CreateReservaClient";
//404
import { Page404 } from "./Page404";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}>
        **<Route index element={<Signin />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      >
        **<Route path="/dashboard/canchas/view" element={<Canchas />}></Route>
        <Route
          path="/dashboard/canchas/create"
          element={<CreateCancha />}
        ></Route>
        <Route
          path="/dashboard/canchas/edit/:id"
          element={<EditCanchas />}
        ></Route>
        <Route path="/dashboard/reservas/view" element={<Reservas />}></Route>
        <Route
          path="/dashboard/reservas/create"
          element={<CreateReserva />}
        ></Route>
        <Route
          path="/dashboard/reservas/edit/:id"
          element={<EditReserva />}
        ></Route>
        <Route
          path="/dashboard/mantenimiento/view"
          element={<Mantenimientos />}
        ></Route>
        <Route
          path="/dashboard/mantenimiento/create"
          element={<CreateMantenimiento />}
        ></Route>
        <Route
          path="/dashboard/mantenimiento/edit/:id"
          element={<EditMantenimiento />}
        ></Route>
      </Route>
      <Route
        path="/client"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        **<Route index element={<ReservaClient />}></Route>
        **
        <Route
          path="/client/createreserva"
          element={<CreateReservaClient />}
        ></Route>
      </Route>
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
