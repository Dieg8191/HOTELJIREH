import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrearReservacion = () => {
  const [reservacion, setReservacion] = useState({
    nombreCompleto: '',
    correo: '',
    direccion: '',
    celular: '',
    fechaLlegada: '',
    fechaSalida: '',
    habitaciones: [],
    confirmada: false
  });

  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/habitaciones')
      .then(res => setHabitacionesDisponibles(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setReservacion({ ...reservacion, [e.target.name]: e.target.value });
  };

  const handleHabitacionSeleccionada = (e) => {
    const id = parseInt(e.target.value);
    if (isNaN(id)) return;

    const habitacion = habitacionesDisponibles.find(h => h.id === id);
    if (habitacion) {
      setReservacion({ ...reservacion, habitaciones: [habitacion] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reservacion.habitaciones.length === 0) {
      alert("Debes seleccionar una habitación");
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/reservas', reservacion);
      alert("Reserva creada exitosamente");
      setReservacion({
        nombreCompleto: '',
        correo: '',
        direccion: '',
        celular: '',
        fechaLlegada: '',
        fechaSalida: '',
        habitaciones: [],
        confirmada: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="mb-4">Crear Reservación</h2>
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
            <label className="form-label">Dirección</label>
            <input type="text" className="form-control" name="direccion" value={reservacion.direccion} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Celular</label>
            <input type="tel" className="form-control" name="celular" value={reservacion.celular} onChange={handleChange} required />
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
                <option key={h.id} value={h.id}>
                  {h.tipo} - ${h.precioPorNoche} por noche
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Crear</button>
        </form>
      </div>
    </div>
  );
};

export default CrearReservacion;

