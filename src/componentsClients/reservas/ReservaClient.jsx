import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../../api/login";
import { useAuth } from "../../AuthContext";

export function ReservaClient() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("idUser");
  const [allReservas, setAllReservas] = useState([]);
  const { logout } = useAuth();
  const options = {
    month: "long",
    year: "numeric",
    timeZone: "America/Bogota",
  };
  const currentMonthYear = new Date().toLocaleDateString("es-ES", options);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);

  //   const getDatos = async () => {
  //     try {
  //       const response = await client.get("reservas/", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (response.status == 200) {
  //         setAllReservas(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error al obtener registros:", error);
  //     }
  //   };

  const getDatosUser = async () => {
    try {
      const response = await client.get(`reservas/user/${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        console.log(response.data);
        setAllReservas(response.data);
      }
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  useEffect(() => {
    // getDatos();
    getDatosUser();
  }, []);

  useEffect(() => {
    // Establecer zona horaria de Bogotá, D.C.
    const timeZone = "America/Bogota";
    const now = new Date(new Date().toLocaleString("en-US", { timeZone }));
    setCurrentDate(now);

    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Primer día del mes (0: Domingo, 6: Sábado)
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate(); // Número de días en el mes actual

    // Crear un arreglo para los días del calendario
    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null); // Agregar días vacíos antes del primer día del mes
    }
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      daysArray.push(i);
    }

    setDaysInMonth(daysArray);
  }, []);

  const renderCalendar = () => {
    const currentDay = currentDate.getDate();
    return daysInMonth.map((day, index) => (
      <div
        key={index}
        className={`flex xl:aspect-square max-xl:min-h-[60px] p-3.5 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50 cursor-pointer 
          ${
            day
              ? day === currentDay
                ? "bg-indigo-500 text-white font-bold"
                : "bg-white"
              : "bg-gray-50"
          }`}
      >
        {day && <span className="text-xs font-semibold">{day}</span>}
      </div>
    ));
  };

  return (
    <section className="relative flex-col w-full">
      <div className="">
        <Link onClick={logout} to="/">
          <button
            className="bg-indigo-600 text-center w-40 rounded-2xl h-12 relative text-black text-xl font-semibold group"
            type="button"
          >
            <div className="bg-indigo-200 rounded-xl h-10 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[152px] z-10 duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                height="25px"
                width="25px"
              >
                <path
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                  fill="#000000"
                ></path>
                <path
                  d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                  fill="#000000"
                ></path>
              </svg>
            </div>
            <p className="translate-x-2 text-white">Salir</p>
          </button>
        </Link>
      </div>
      <div className="w-full py-6 relative z-10 backdrop-blur-3xl">
        <div className="w-full max-w-7xl mx-auto px-2 lg:px-8">
          <div className="grid grid-cols-12 gap-8 max-w-4xl mx-auto xl:max-w-full">
            <div className="col-span-12 xl:col-span-5">
              <h2 className="font-manrope text-3xl leading-tight text-gray-900 mb-1.5">
                Reservas del dia
              </h2>
              <p className="text-lg font-normal text-gray-600 mb-8">
                Estas son todas las reservas que tienes para hoy
              </p>
              <div className="flex gap-5 flex-col">
                {allReservas.map((reserva, index) => (
                  <div key={index} className="p-6 rounded-xl bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                        <p className="text-base font-medium text-gray-900">
                          {reserva.id_cancha.nombre}
                        </p>
                      </div>
                      {/* <div className="dropdown relative inline-flex">
                      <button
                        type="button"
                        data-target="dropdown-default"
                        className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-purple-600  "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="4"
                          viewBox="0 0 12 4"
                          fill="none"
                        >
                          <path
                            d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707"
                            stroke="currentcolor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="dropdown-default"
                        className="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full -left-10 w-max mt-2 hidden"
                      >
                        <ul className="py-2">
                          <li>
                            <a
                              className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium"
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium"
                            >
                              Remove
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                    </div>
                    <h6 className="text-xl leading-8 font-semibold text-black mb-1">
                      {reserva.id_usuario.username}
                    </h6>
                    <p className="text-base font-normal text-gray-600">
                      <span className="font-bold">Horario:</span>{" "}
                      {reserva.hora_inicio} - {reserva.hora_fin}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-12 xl:col-span-7 px-2.5 py-5 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
                <div className="flex items-center gap-4">
                  <h5 className="text-xl leading-8 font-semibold text-gray-900 first-letter:capitalize">
                    {currentMonthYear}
                  </h5>
                </div>
                <div className="flex items-center rounded-md gap-px">
                  <Link
                    to="/client/createreserva"
                    className="py-2.5 px-5 rounded-lg bg-indigo-600 text-white text-sm font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-white"
                  >
                    Crear reserva
                  </Link>
                </div>
              </div>
              <div className="border border-indigo-200 rounded-xl">
                <div className="grid grid-cols-7 rounded-t-3xl border-b border-indigo-200">
                  {[
                    "Domingo",
                    "Lunes",
                    "Martes",
                    "Miercoles",
                    "Jueves",
                    "Viernes",
                    "Sabado",
                  ].map((day, index) => (
                    <div
                      key={index}
                      className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 rounded-b-xl">
                  {renderCalendar()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
