import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../../api/login";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function Reservas() {
  const token = localStorage.getItem("token");
  const [allReservas, setAllReservas] = useState([]);
  const options = {
    month: "long",
    year: "numeric",
    timeZone: "America/Bogota",
  };
  const currentMonthYear = new Date().toLocaleDateString("es-ES", options);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const getDatos = async () => {
    try {
      const response = await client.get("reservas/", {
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
    getDatos();
  }, []);

  useEffect(() => {
    const timeZone = "America/Bogota";
    const now = new Date(new Date().toLocaleString("en-US", { timeZone }));
    setCurrentDate(now);

    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      daysArray.push(i);
    }

    setDaysInMonth(daysArray);
  }, []);

  const handleGeneratePDF = () => {
    setIsGeneratingPDF(true);
    // Aquí puedes manejar la lógica de generación de PDF
    setTimeout(() => setIsGeneratingPDF(false), 1000); // Restablece después de generar
  };

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

  const generatePDF = async () => {
    await handleGeneratePDF();

    const doc = new jsPDF();
    const pdfContent = document.getElementById("reservas-content");

    // Usa html2canvas para capturar la parte de las reservas
    const canvas = await html2canvas(pdfContent);
    const imgData = canvas.toDataURL("image/png");

    // Ajusta la imagen al tamaño de la página del PDF
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    doc.save("reservas.pdf");
  };

  return (
    <section className="relative flex w-full">
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
              <div className="flex items-center rounded-md gap-px mb-8">
                <button
                  onClick={generatePDF}
                  className="py-2.5 px-5 rounded-lg bg-indigo-600 text-white text-sm font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-white"
                >
                  Imprimir reservas
                </button>
              </div>
              <div className="flex gap-5 flex-col" id="reservas-content">
                {allReservas.map((reserva, index) => (
                  <div key={index} className="p-6 rounded-xl bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                        <p className="text-base font-medium text-gray-900">
                          {reserva.id_cancha.nombre}
                        </p>
                      </div>
                      <div className="dropdown relative inline-flex">
                        {!isGeneratingPDF && (
                          <Link
                            to={`/dashboard/reservas/edit/${reserva.id_reserva}`}
                            className="inline-flex text-purple-700 justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-purple-600"
                          >
                            Editar
                          </Link>
                        )}
                      </div>
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
                    to="/dashboard/reservas/create"
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
