import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import client from "../../api/login";

export function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    if (data.password != data.passwordConfirmation) {
      return toast.error("Las contraseñas no coinciden");
    }

    const response = await toast.promise(
      client.post("auth/register/", {
        username: data.username,
        password: data.password,
        is_staff: true,
        is_superuser: false,
      }),
      {
        loading: "Creando...",
        success: "Creado correctamente!",
        error: (error) => {
          const errorMessage =
            error.response?.data?.message || "Error en la solicitud";
          return <b>{errorMessage}</b>;
        },
      }
    );

    navigate("/");
  });

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
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div className="relative">
          <div className="absolute right-3 mt-4"></div>
          <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
            Nombre
          </label>
          <input
            className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
            type=""
            placeholder="Nombre completo"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="flex text-red-600 text-[10px] font-semibold ml-2 sm:text-[12px] md:text-[13px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px]">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="mt-8 content-center">
          <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
            Contraseña
          </label>
          <input
            className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
            type="password"
            placeholder="Ingrese su contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="flex text-red-600 text-[10px] font-semibold ml-2 sm:text-[12px] md:text-[13px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px]">
              Este campo es requerido
            </span>
          )}
        </div>
        <div className="mt-8 content-center">
          <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
            Confirmar contraseña
          </label>
          <input
            className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
            type="password"
            placeholder="Verifique du contraseña"
            {...register("passwordConfirmation", { required: true })}
          />
          {errors.passwordConfirmation && (
            <span className="flex text-red-600 text-[10px] font-semibold ml-2 sm:text-[12px] md:text-[13px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px]">
              Este campo es requerido
            </span>
          )}
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
