import { Link, Outlet, useLocation } from "react-router-dom";

export function Dashboard() {
  const location = useLocation();

  return (
    <div className="bg-gray-100 relative h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        {/* <div className="h-screen hidden lg:block my-4 ml-4 shadow-lg relative w-80">
          <div className="bg-white h-full rounded-2xl">
            <div className="flex items-center justify-center pt-6">
              <p className="font-bold text-3xl text-indigo-600">FUTBOLITO</p>
            </div>
            <nav className="mt-6">
              <div>
                <Link
                  className={` transition-all duration-500 ${
                    location.pathname === "/dashboard/canchas/view"
                      ? "to-indigo-100 border-r-4 border-indigo-500 border-r-4 border-indigo-500 text-indigo-500"
                      : "text-gray-500"
                  } w-full font-thin uppercase flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r from-white`}
                  to="/dashboard/canchas/view"
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 2048 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">Canchas</span>
                </Link>
                <Link
                  className={`transition-all duration-500 ${
                    location.pathname === "/dashboard/reservas/view"
                      ? "to-indigo-100 border-r-4 border-indigo-500 border-r-4 border-indigo-500 text-indigo-500"
                      : "text-gray-500"
                  } w-full font-thin uppercase hover:text-indigo-500 flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r from-white`}
                  to="/dashboard/reservas/view"
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 2048 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">Reservas</span>
                </Link>
                <Link
                  className={`transition-all duration-500 ${
                    location.pathname === "/dashboard/mantenimiento/view"
                      ? "to-indigo-100 border-r-4 border-indigo-500 border-r-4 border-indigo-500 text-indigo-500"
                      : "text-gray-500"
                  } w-full font-thin uppercase hover:text-indigo-500 flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r from-white`}
                  to="/dashboard/mantenimiento/view"
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 2048 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">
                    Mantenimiento
                  </span>
                </Link>
                <Link
                  className="w-full font-thin uppercase text-gray-500 hover:text-indigo-500 hover: flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r from-white"
                  to="/"
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 2048 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">Salir</span>
                </Link>
              </div>
            </nav>
          </div>
        </div> */}
        <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
          <header className="w-full shadow-lg bg-white items-center h-16 rounded-2xl z-40">
            <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
              <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                <div className="relative p-1 flex items-center justify-end w-full ml-5 mr-4 sm:mr-0 sm:right-auto">
                  <a href="#" className="block relative">
                    <img
                      alt="profil"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      className="mx-auto object-cover rounded-full h-10 w-10 "
                    />
                  </a>
                </div>
              </div>
            </div>
          </header>
          <div className="overflow-auto h-screen pb-24 pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0">
            <div className="flex flex-col flex-wrap sm:flex-row ">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
