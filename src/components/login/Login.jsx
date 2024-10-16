import { Outlet } from "react-router-dom";
import FONDOLOGINCANCHA from "../../assets/FONDOLOGINCANCHA.png";

export function Login() {
  return (
    <div className="relative min-h-screen flex">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div className="sm:w-1/2 xl:w-3/5 h-screen hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
          <div className="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
          <div className="w-full h-screen flex flex-col items-center justify-start max-w-3xl z-10">
            <div className="sm:text-4xl text-center xl:text-5xl font-bold leading-tight mb-6 mt-40">
              FUTBOLITO
            </div>
            <div className="flex-grow flex justify-center items-center -mt-40">
              <img className="w-auto h-auto rounded border-8" src={FONDOLOGINCANCHA} alt="" />
            </div>
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-screen w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Bienvenido!
              </h2>
            </div>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}
