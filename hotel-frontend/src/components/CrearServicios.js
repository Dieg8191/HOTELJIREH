import React, { useState } from "react";
import { crearServicio } from "../services/ServiciosService";  

const CrearServicios = () => {
  const [servicio, setServicio] = useState({
    nombre: "",
    descripcion: "",
    imagenUrl: ""
  });

  const handleChange = (e) => {
    setServicio({ ...servicio, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await crearServicio(servicio);
      alert("Servicio creado con éxito");
      setServicio({ nombre: "", descripcion: "", imagenUrl: "" }); // Resetea el formulario
    } catch (error) {
      // Si ocurre un error, mostramos un mensaje de alerta
      alert("Error al crear el servicio. Intenta nuevamente.");
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="mb-4">Crear Servicio</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={servicio.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input
              type="text"
              className="form-control"
              name="descripcion"
              value={servicio.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Imagen (URL)</label>
            <input
              type="text"
              className="form-control"
              name="imagenUrl"
              value={servicio.imagenUrl}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Crear</button>
        </form>
      </div>
    </div>
  );
};

export default CrearServicios;
