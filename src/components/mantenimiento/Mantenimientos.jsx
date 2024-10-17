import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../../api/login";
import { DeleteMantenimiento } from "./DeleteMantenimiento";
import toast from "react-hot-toast";

export function Mantenimientos() {
  const token = localStorage.getItem("token");
  const [allMantenimiento, setAllMantenimiento] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mantenimientosPerPage] = useState(8);
  const [activeDelete, setActiveDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  const getDatos = async () => {
    try {
      const response = await client.get("mantenimiento/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        setAllMantenimiento(response.data);
      }
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const deleteMantenimiento = async (id) => {
    console.log(id);
    try {
      const response = await client.delete(`mantenimiento/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        setAllMantenimiento((prev) =>
          prev.filter((mantenimiento) => mantenimiento.id !== id)
        );
        getDatos();
        toast.success("Mantenimiento eliminado correctamente");
      }
    } catch (error) {
      toast.error("Error eliminando el mantenimiento");
      console.error("Error al eliminar el mantenimiento:", error);
    }
    setActiveDelete(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  useEffect(() => {
    getDatos();
  }, []);

  const filteredMantenimientos = allMantenimiento.filter((mantenimiento) =>
    mantenimiento.id_cancha.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastMantenimiento = currentPage * mantenimientosPerPage;
  const indexOfFirstMantenimiento =
    indexOfLastMantenimiento - mantenimientosPerPage;
  const currentMantenimientos = filteredMantenimientos.slice(
    indexOfFirstMantenimiento,
    indexOfLastMantenimiento
  );

  const totalMantenimientos = filteredMantenimientos.length;
  const totalPages = Math.ceil(totalMantenimientos / mantenimientosPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const lastPage = () => {
    setCurrentPage(Math.ceil(totalMantenimientos / mantenimientosPerPage));
  };

  const handleDeleteClick = () => {
    setActiveDelete(true);
  };

  return (
    <section className="container px-4 mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800">
              Mantenimientos
            </h2>
            <span className="px-3 py-1 text-xs text-indigo-600 bg-indigo-100 rounded-full">
              {allMantenimiento.length}
            </span>
          </div>
        </div>

        <div className="flex items-center mt-4 gap-x-3">
          <Link
            to="/dashboard/mantenimiento/create"
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-indigo-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-indigo-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Agendar Mantenimiento</span>
          </Link>
        </div>
      </div>

      <div className="mt-6 md:flex md:items-center md:justify-end">
        <div className="relative flex items-center mt-4 md:mt-0">
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 mx-3 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar por cancha"
            className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Cancha</span>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Descripción
                    </th>
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMantenimientos.map((mantenimiento) => (
                    <tr key={mantenimiento.id_mantenimiento}>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800">
                            {mantenimiento.id_cancha.nombre}
                          </h2>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h4 className="text-gray-700">
                            {mantenimiento.fecha}
                          </h4>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div>{mantenimiento.descripcion}</div>
                      </td>
                      <td className="relative px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-3">
                          <Link
                            to={`/dashboard/mantenimiento/edit/${mantenimiento.id_mantenimiento}`}
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                          >
                            Editar
                          </Link>

                          <button
                            className="text-red-600 hover:text-red-500 transition-colors duration-200"
                            onClick={() => {
                              setIdDelete(mantenimiento.id_mantenimiento),
                                handleDeleteClick();
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500">
                  Página {currentPage} de {totalPages}
                </p>
                <div className="flex items-center">
                  <button
                    onClick={firstPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Primero
                  </button>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 mx-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Anterior
                  </button>
                  <span className="text-sm font-medium">{currentPage}</span>
                  <button
                    onClick={nextPage}
                    disabled={
                      currentPage >=
                      Math.ceil(totalMantenimientos / mantenimientosPerPage)
                    }
                    className={`px-3 py-1 mx-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 ${
                      currentPage >=
                      Math.ceil(totalMantenimientos / mantenimientosPerPage)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Siguiente
                  </button>
                  <button
                    onClick={lastPage}
                    disabled={
                      currentPage >=
                      Math.ceil(totalMantenimientos / mantenimientosPerPage)
                    }
                    className={`px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 ${
                      currentPage >=
                      Math.ceil(totalMantenimientos / mantenimientosPerPage)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Último
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeDelete && (
        <DeleteMantenimiento
          id={idDelete}
          onConfirm={deleteMantenimiento}
          onCancel={() => setActiveDelete(false)}
        />
      )}
    </section>
  );
}
