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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}>
        **<Route index element={<Signin />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Route>
      <Route path="/dashboard" element={<DashboardHome />}>
        **<Route path="/dashboard/canchas/view" element={<Canchas />}></Route>
        <Route
          path="/dashboard/canchas/create"
          element={<CreateCancha />}
        ></Route>
        <Route path="/dashboard/reservas/view" element={<Reservas />}></Route>
        <Route
          path="/dashboard/reservas/create"
          element={<CreateReserva />}
        ></Route>
        <Route
          path="/dashboard/mantenimiento/view"
          element={<Mantenimientos />}
        ></Route>
        <Route
          path="/dashboard/mantenimiento/create"
          element={<CreateMantenimiento />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
