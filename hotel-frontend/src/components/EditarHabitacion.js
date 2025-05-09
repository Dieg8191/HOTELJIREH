import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerHabitacion, actualizarHabitacion } from "../services/HabitaciService";

const EditarHabitacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [habitacion, setHabitacion] = useState({
    tipo: "",
    descripcion: "",
    precioPorNoche: "",
    capacidad: "",
    imagenUrl: ""
  });

  useEffect(() => {
    const cargarHabitacion = async () => {
      try {
        const res = await obtenerHabitacion(id);
        setHabitacion(res.data);
      } catch (error) {
        console.error("Error al cargar la habitación:", error);
      }
    };

    cargarHabitacion();
  }, [id]);

  const handleChange = (e) => {
    setHabitacion({ ...habitacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarHabitacion(id, habitacion);
      alert("Habitación actualizada con éxito");
      setHabitacion({ tipo: "", descripcion: "", precioPorNoche: "", capacidad: "", imagenUrl: "" });
      navigate("/admin/habitaciones"); // Redirige a la lista de habitaciones después de la actualización
    } catch (error) {
      console.error("Error al actualizar la habitación:", error);
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="mb-4">Editar Habitación</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tipo</label>
            <input
              type="text"
              className="form-control"
              name="tipo"
              value={habitacion.tipo}
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
              value={habitacion.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Precio por noche</label>
            <input
              type="number"
              className="form-control"
              name="precioPorNoche"
              value={habitacion.precioPorNoche}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Capacidad</label>
            <input
              type="number"
              className="form-control"
              name="capacidad"
              value={habitacion.capacidad}
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
              value={habitacion.imagenUrl}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default EditarHabitacion;
