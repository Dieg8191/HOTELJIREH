import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerServicios, eliminarServicio } from "../services/ServiciosService";

const ServiciosList = () => {
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    try {
      const res = await obtenerServicios();
      setServicios(res.data);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
    }
  };

  const borrarServicio = async (id) => {
    try {
      await eliminarServicio(id);
      cargarServicios();
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
    }
  };

  const editarServicio = (id) => {
    navigate(`/admin/editar-servicio/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Servicios</h2>

      {servicios.length === 0 ? (
        <p>No hay servicios registrados.</p>
      ) : (
        <div className="row">
          {servicios.map((serv) => (
            <div className="col-md-4" key={serv.id}>
              <div className="card mb-3 shadow-sm">
                {serv.imagenUrl && (
                  <img
                    src={serv.imagenUrl}
                    className="card-img-top"
                    alt={`Imagen de ${serv.nombre}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title text-capitalize">{serv.nombre}</h5>
                  <p className="card-text">{serv.descripcion}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => editarServicio(serv.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => borrarServicio(serv.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiciosList;
