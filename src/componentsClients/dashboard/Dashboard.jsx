import { Link, Outlet, useLocation } from "react-router-dom";
import IMAGENUSUARIO from "../../assets/IMAGENUSUARIO.png";

export function Dashboard() {
  const location = useLocation();

  return (
    <div className="bg-gray-100 relative h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
          <header className="w-full shadow-lg bg-white items-center h-16 rounded-2xl z-40">
            <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
              <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                <div className="relative p-1 flex items-center justify-end w-full ml-5 mr-4 sm:mr-0 sm:right-auto">
                  <a className="block relative">
                    <img
                      alt="profil"
                      src={IMAGENUSUARIO}
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
