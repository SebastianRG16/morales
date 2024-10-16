import { Link } from "react-router-dom";

export function Register() {
  return (
    <div>
      <div className="text-center">
        <p className="mt-2 text-sm text-gray-500">
          Por favor registrese para acceder al sistema
        </p>
      </div>
      <div className="flex mt-6 items-center justify-center space-x-2">
        <span className="h-px w-32 bg-gray-200"></span>
      </div>
      <form className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" />
        <div className="relative">
          <div className="absolute right-3 mt-4"></div>
          <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
            Nombre
          </label>
          <input
            className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
            type=""
            placeholder="Nombre completo"
          />
        </div>
        <div className="mt-8 content-center">
          <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
            Contraseña
          </label>
          <input
            className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
            type=""
            placeholder="Ingrese su contraseña"
          />
        </div>
        <div className="mt-8 content-center">
          <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
            Confirmar contraseña
          </label>
          <input
            className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
            type=""
            placeholder="Verifique du contraseña"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-xl tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
          >
            Registrar
          </button>
        </div>
        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
          <span>Ya tiene una cuenta?</span>
          <Link
            to="/"
            className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
          >
            Iniciar sesion
          </Link>
        </p>
      </form>
    </div>
  );
}
