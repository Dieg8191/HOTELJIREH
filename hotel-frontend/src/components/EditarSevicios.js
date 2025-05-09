import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerServicio, actualizarServicio } from "../services/ServiciosService";

const EditarServicios = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [servicio, setServicio] = useState({
    nombre: "",
    descripcion: "",
    imagenUrl: ""
  });

  useEffect(() => {
    const cargarServicio = async () => {
      try {
        const res = await obtenerServicio(id);
        setServicio(res.data);
      } catch (error) {
        console.error("Error al cargar el servicio:", error);
      }
    };

    cargarServicio();
  }, [id]);

  const handleChange = (e) => {
    setServicio({ ...servicio, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarServicio(id, servicio);
      alert("Servicio actualizado con éxito");
      setServicio({ nombre: "", descripcion: "", imagenUrl: "" });
      navigate("/admin/servicios"); 
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="mb-4">Editar Servicio</h2>
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
          <button type="submit" className="btn btn-primary">Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default EditarServicios;
