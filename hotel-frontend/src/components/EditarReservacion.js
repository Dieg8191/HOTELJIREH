import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarReservacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);
  const [reservacion, setReservacion] = useState({
    nombreCompleto: "",
    correo: "",
    fechaLlegada: "",
    fechaSalida: "",
    precioTotal: "",
    habitaciones: []
  });

  // Cargar reservación y habitaciones
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resReservacion, resHabitaciones] = await Promise.all([
          axios.get(`http://localhost:8080/api/reservas/${id}`),
          axios.get("http://localhost:8080/api/habitaciones")
        ]);
        setReservacion(resReservacion.data);
        setHabitacionesDisponibles(resHabitaciones.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    cargarDatos();
  }, [id]);

  const calcularPrecioTotal = (habitacion) => {
    const fechaInicio = new Date(reservacion.fechaLlegada);
    const fechaFin = new Date(reservacion.fechaSalida);
    const diferenciaDias = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24);
    if (habitacion && !isNaN(diferenciaDias)) {
      return diferenciaDias * habitacion.precioPorNoche;
    }
    return 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevaReservacion = { ...reservacion, [name]: value };

    if (name === "fechaLlegada" || name === "fechaSalida") {
      const habitacionActual = reservacion.habitaciones[0];
      if (habitacionActual) {
        nuevaReservacion.precioTotal = calcularPrecioTotal(habitacionActual);
      }
    }

    setReservacion(nuevaReservacion);
  };

  const handleHabitacionSeleccionada = (e) => {
    const idHabitacion = parseInt(e.target.value);
    const habitacion = habitacionesDisponibles.find(h => h.id === idHabitacion);
    if (habitacion) {
      const precioNuevo = calcularPrecioTotal(habitacion);
      setReservacion({
        ...reservacion,
        habitaciones: [habitacion],
        precioTotal: precioNuevo
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/reservas/${id}`, reservacion);
      alert("Reservación actualizada con éxito");
      navigate("/admin/reservaciones");
    } catch (error) {
      console.error("Error al actualizar la reservación:", error);
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="mb-4">Editar Reservación</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input type="text" className="form-control" name="nombreCompleto" value={reservacion.nombreCompleto} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input type="email" className="form-control" name="correo" value={reservacion.correo} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de llegada</label>
            <input type="date" className="form-control" name="fechaLlegada" value={reservacion.fechaLlegada} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de salida</label>
            <input type="date" className="form-control" name="fechaSalida" value={reservacion.fechaSalida} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Seleccionar habitación</label>
            <select className="form-select" onChange={handleHabitacionSeleccionada} required>
              <option value="">Seleccionar habitación</option>
              {habitacionesDisponibles.map(h => (
                <option key={h.id} value={h.id} selected={reservacion.habitaciones[0]?.id === h.id}>
                  {h.tipo} - ${h.precioPorNoche} por noche
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Precio total</label>
            <input type="number" className="form-control" name="precioTotal" value={reservacion.precioTotal} readOnly />
          </div>
          <button type="submit" className="btn btn-primary">Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default EditarReservacion;
