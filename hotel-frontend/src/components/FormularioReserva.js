import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormularioReserva() {
  const [reservaData, setReservaData] = useState({
    nombreCompleto: '',
    correo: '',
    direccion: '',
    celular: '',
    fechaLlegada: '',
    fechaSalida: '',
    precioTotal: '',
    habitaciones: []
  });

  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/habitaciones')
      .then(res => setHabitacionesDisponibles(res.data))
      .catch(err => console.error('Error al obtener habitaciones:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...reservaData, [name]: value };
    setReservaData(updatedData);

    // Si cambian fechas o ya hay habitación seleccionada, recalculamos precio
    if ((name === 'fechaLlegada' || name === 'fechaSalida') && reservaData.habitaciones.length > 0) {
      calcularPrecioTotal(updatedData.fechaLlegada, updatedData.fechaSalida, reservaData.habitaciones[0].precioPorNoche);
    }
  };

  const handleHabitacionSeleccionada = (e) => {
    const id = parseInt(e.target.value);
    if (!isNaN(id)) {
      const habitacionSeleccionada = habitacionesDisponibles.find(h => h.id === id);
      if (habitacionSeleccionada) {
        setReservaData(prev => {
            const updated = { ...prev, habitaciones: [habitacionSeleccionada.id] };
            calcularPrecioTotal(prev.fechaLlegada, prev.fechaSalida, habitacionSeleccionada.precioPorNoche);
            return updated;
        });
        
      }
    }
  };

  const calcularPrecioTotal = (llegada, salida, precioPorNoche) => {
    if (!llegada || !salida || !precioPorNoche) return;

    const fecha1 = new Date(llegada);
    const fecha2 = new Date(salida);
    const diferenciaDias = Math.ceil((fecha2 - fecha1) / (1000 * 60 * 60 * 24));

    if (diferenciaDias > 0) {
      const total = diferenciaDias * precioPorNoche;
      setReservaData(prev => ({ ...prev, precioTotal: total.toFixed(2) }));
    } else {
      setReservaData(prev => ({ ...prev, precioTotal: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reservaData.habitaciones.length === 0) {
      alert("Debes seleccionar una habitación");
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/reservaciones', reservaData);
      alert('¡Reserva confirmada con éxito!');
      setReservaData({
        nombreCompleto: '',
        correo: '',
        direccion: '',
        celular: '',
        fechaLlegada: '',
        fechaSalida: '',
        precioTotal: '',
        habitaciones: []
      });
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
      alert('Error al guardar la reserva.');
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="mb-4">Reservar habitación</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input type="text" className="form-control" name="nombreCompleto" value={reservaData.nombreCompleto} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" name="correo" value={reservaData.correo} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input type="text" className="form-control" name="direccion" value={reservaData.direccion} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Celular</label>
            <input type="tel" className="form-control" name="celular" value={reservaData.celular} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de llegada</label>
            <input type="date" className="form-control" name="fechaLlegada" value={reservaData.fechaLlegada} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de salida</label>
            <input type="date" className="form-control" name="fechaSalida" value={reservaData.fechaSalida} onChange={handleChange} required />
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
          <div className="mb-3">
            <label className="form-label">Precio total</label>
            <input type="text" className="form-control" name="precioTotal" value={reservaData.precioTotal} readOnly />
          </div>
          <button type="submit" className="btn btn-primary">Confirmar Reserva</button>
        </form>
      </div>
    </div>
  );
}

export default FormularioReserva;

