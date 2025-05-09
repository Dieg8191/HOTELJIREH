import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReservacionList() {
  const [reservaciones, setReservaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarReservaciones();
  }, []);

  const cargarReservaciones = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/reservas");
      // Aquí verificamos si cada reservación incluye la habitación
      const reservacionesConHabitacion = res.data.map((reservacion) => {
        if (reservacion.habitacion) {
          return {
            ...reservacion,
            habitacion: reservacion.habitacion.tipo || "No disponible",
          };
        } else {
          return {
            ...reservacion,
            habitacion: "No disponible",
          };
        }
      });
      setReservaciones(reservacionesConHabitacion);
    } catch (error) {
      console.error("Error al obtener las reservaciones:", error);
    }
  };

  const eliminarReservacion = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esta reservación?");
    if (!confirmacion) return;

    try {
      await axios.delete(`http://localhost:8080/api/reservas/${id}`);
      setReservaciones(reservaciones.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error al eliminar la reservación:", error);
    }
  };

  const editarReservacion = (id) => {
    navigate(`/admin/editar-reservacion/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Reservaciones</h2>

      {reservaciones.length === 0 ? (
        <p>No hay reservaciones registradas.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Fecha de Llegada</th>
              <th>Fecha de Salida</th>
              <th>Precio Total</th>
              <th>Habitación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservaciones.map((r) => (
              <tr key={r.id}>
                <td>{r.nombreCompleto}</td>
                <td>{r.correo}</td>
                <td>{r.fechaLlegada}</td>
                <td>{r.fechaSalida}</td>
                <td>${r.precioTotal?.toLocaleString("es-CO")}</td>
                <td>
                  {r.habitaciones && r.habitaciones.length > 0
                    ? r.habitaciones.map((h, index) => (
                      <span key={index}>{h.tipo}{index < r.habitaciones.length - 1 ? ', ' : ''}</span>
                    ))
                    : 'No disponible'}
                </td>

                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => editarReservacion(r.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarReservacion(r.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReservacionList;

