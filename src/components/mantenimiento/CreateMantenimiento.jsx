import React, { useEffect, useState } from "react";
import MANTENIMIENTOCANCHA from "../../assets/MANTENIMIENTOCANCHA.jpg";
import client from "../../api/login";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export function CreateMantenimiento() {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [allCanchas, setAllCanchas] = useState([]);
  const [informationUser, setInformationUser] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getDatos = async () => {
    try {
      const response = await client.get("canchas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        console.log(response.data);
        setAllCanchas(response.data);
      }
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const getDatosMe = async () => {
    try {
      const response = await client.get("auth/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        console.log(response.data);
        setInformationUser(response.data);
      }
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const response = await toast.promise(
      client.post(
        "mantenimiento/",
        {
          fecha: data.fecha,
          descripcion: data.description,
          id_cancha: parseInt(data.cancha, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      {
        loading: "Creando mantenimiento...",
        success: "Mantenimiento creado correctamente!",
        error: (error) => {
          const errorMessage =
            error.response?.data?.message ||
            "La cancha no se encuentra disponible en ese horario por favor escoja otro!";
          return <b>{errorMessage}</b>;
        },
      }
    );

    console.log(response);

    setIsLoading(false);
  });

  useEffect(() => {
    getDatos();
    getDatosMe();
  }, []);

  return (
    <div className="w-full">
      <div className="">
        <Link to="/dashboard/mantenimiento/view">
          <button
            class="bg-indigo-600 text-center w-40 rounded-2xl h-12 relative text-black text-xl font-semibold group"
            type="button"
          >
            <div class="bg-indigo-200 rounded-xl h-10 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[152px] z-10 duration-500">
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
            <p class="translate-x-2 text-white">Volver</p>
          </button>
        </Link>
      </div>
      <div className="flex w-full flex-col items-center justify-between p-6">
        <div className="mb-10">
          <p className="font-bold text-4xl text-indigo-600">
            Agendando mantenimiento
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className="bg-white w-full max-w-3xl mx-auto px-4 lg:px-6 py-8 shadow-md rounded-md flex flex-col lg:flex-row"
        >
          <div className="w-full lg:w-1/2 lg:pr-8 lg:border-r-2 lg:border-slate-300">
            <div className="mb-4">
              <label className="text-neutral-800 font-bold text-sm mb-2 block">
                Fecha del mantenimiento:
              </label>
              <input
                type="date"
                name="fecha"
                className="peer w-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900"
                {...register("fecha", { required: true })}
              />
              {errors.fecha && (
                <span className="flex text-red-600 text-[10px] font-semibold ml-2 sm:text-[12px] md:text-[13px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px]">
                  Este campo es requerido
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="text-neutral-800 font-bold text-sm mb-2 block">
                Seleccione una cancha:
              </label>
              <select
                type="text"
                name="cancha"
                className="peer w-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900"
                placeholder=""
                {...register("cancha", { required: true })}
              >
                <option value=""></option>
                {allCanchas.map((cancha, index) => (
                  <option key={index} value={cancha.id_cancha}>
                    {cancha.nombre}
                  </option>
                ))}
              </select>
              {errors.cancha && (
                <span className="flex text-red-600 text-[10px] font-semibold ml-2 sm:text-[12px] md:text-[13px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px]">
                  Este campo es requerido
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="text-neutral-800 font-bold text-sm mb-2 block">
                Descripcion:
              </label>
              <textarea
                type="text"
                name="description"
                className="peer w-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="flex text-red-600 text-[10px] font-semibold ml-2 sm:text-[12px] md:text-[13px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px]">
                  Este campo es requerido
                </span>
              )}
            </div>
            <div className="w-full flex gap-4">
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full mt-6"
                type="submit"
              >
                Crear
              </button>
              <button
                onClick={() => reset()}
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-red-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full mt-6"
                type="button"
              >
                cancelar
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-8">
            <div className="w-full max-w-sm h-56">
              <div
                id="creditCard"
                className="relative crediCard cursor-pointer transition-transform duration-500"
              >
                <div className="w-full h-56 m-auto rounded-xl text-white shadow-2xl absolute">
                  <img
                    src={MANTENIMIENTOCANCHA}
                    className="relative object-cover w-full h-full rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
