import React, { useState } from "react";
import crearHabitacion from "../services/HabitaciService";

const CrearHabitacion = () => {
  const [habitacion, setHabitacion] = useState({
    tipo: "",
    descripcion: "",
    precioPorNoche: "",
    capacidad: "",
    imagenUrl: ""
  });

  const handleChange = (e) => {
    setHabitacion({ ...habitacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await crearHabitacion(habitacion);
    } catch (e) {
      console.error("No se pudo crear la habitación: ", e.response?.data || e.menssage);
      if (e.response && e.response.data && e.response.data.message?.includes("Data too long for column 'imagen_url'")) {
        alert("La URL de la habitación es demasiado larga");
      } else {
        alert("No se pudo crear la habitación: Revisa los datos")
      }
      return
    }

    alert("Habitación creada con éxito");
    setHabitacion({ tipo: "", descripcion: "", precioPorNoche: "", capacidad: "", imagenUrl: "" });
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="mb-4">Crear Habitación</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tipo</label>
            <input type="text" className="form-control" name="tipo" value={habitacion.tipo} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input type="text" className="form-control" name="descripcion" value={habitacion.descripcion} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Precio por noche</label>
            <input type="number" className="form-control" name="precioPorNoche" value={habitacion.precioPorNoche} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Capacidad</label>
            <input type="number" className="form-control" name="capacidad" value={habitacion.capacidad} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Imagen (URL)</label>
            <input type="text" className="form-control" name="imagenUrl" value={habitacion.imagenUrl} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Crear</button>
        </form>
      </div>
    </div>
  );
};

export default CrearHabitacion;
