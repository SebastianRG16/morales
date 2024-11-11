import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../../api/login";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  section: {
    marginBottom: 10,
    padding: 10,
    border: "1px solid #ddd",
    borderRadius: 5,
  },
  reservaName: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  reservaDetail: {
    fontSize: 12,
    color: "#555",
  },
});

// Componente de documento PDF
const PDFDocument = ({ reservas }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reservas del Día</Text>
      {reservas.map((reserva, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.reservaName}>{reserva.id_cancha.nombre}</Text>
          <Text style={styles.reservaDetail}>
            Usuario: {reserva.id_usuario.username}
          </Text>
          <Text style={styles.reservaDetail}>
            Horario: {reserva.hora_inicio} - {reserva.hora_fin}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);

export function Reservas() {
  const token = localStorage.getItem("token");
  const [allReservas, setAllReservas] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);

  const getDatos = async () => {
    try {
      const response = await client.get("reservas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
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
      daysArray.push(null); // Espacios vacíos para días antes del primer día del mes
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
    <section className="relative flex w-full">
      <div className="w-full py-6 relative z-10 backdrop-blur-3xl">
        <div className="w-full max-w-7xl mx-auto px-2 lg:px-8">
          <div className="grid grid-cols-12 gap-8 max-w-4xl mx-auto xl:max-w-full">
            <div className="col-span-12 xl:col-span-5">
              <h2 className="font-manrope text-3xl leading-tight text-gray-900 mb-1.5">
                Reservas del día
              </h2>
              <p className="text-lg font-normal text-gray-600 mb-8">
                Estas son todas las reservas que tienes para hoy
              </p>
              <div className="flex items-center rounded-md gap-px mb-8">
                {/* Enlace para descargar el PDF */}
                <PDFDownloadLink
                  document={<PDFDocument reservas={allReservas} />}
                  fileName="reservas.pdf"
                  className="py-2.5 px-5 rounded-lg bg-indigo-600 text-white text-sm font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-white"
                >
                  {({ loading }) =>
                    loading ? "Generando PDF..." : "Imprimir reservas"
                  }
                </PDFDownloadLink>
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
                        <Link
                          to={`/dashboard/reservas/edit/${reserva.id_reserva}`}
                          className="inline-flex text-purple-700 justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-purple-600"
                        >
                          Editar
                        </Link>
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
                    {new Date().toLocaleDateString("es-ES", {
                      month: "long",
                      year: "numeric",
                      timeZone: "America/Bogota",
                    })}
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
                    "Miércoles",
                    "Jueves",
                    "Viernes",
                    "Sábado",
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
