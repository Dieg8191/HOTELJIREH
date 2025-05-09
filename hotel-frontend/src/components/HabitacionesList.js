import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerHabitaciones, eliminarHabitacion } from "../services/HabitaciService";

const HabitacionesList = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  const cargarHabitaciones = async () => {
    try {
      const res = await obtenerHabitaciones();
      setHabitaciones(res.data);
    } catch (error) {
      console.error("Error al cargar habitaciones:", error);
    }
  };

  const borrarHabitacion = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar esta habitación?"
    );

    if (confirmar) {
      try {
        await eliminarHabitacion(id);
        cargarHabitaciones(); // Recargar la lista después de eliminar
        alert("La habitación se elimonó con éxito ya que no esta asociada a ninguna reserva.");
      } catch (error) {
        if (error.response && error.response.status === 500) {
          alert("No se puede eliminar: la habitación está asociada a una o más reservas.");
        } else {
          alert("Error al eliminar la habitación. Intenta nuevamente.");
        }
      }
    }
  };

  const editarHabitacion = (id) => {
    navigate(`/admin/editar-habitacion/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Habitaciones</h2>

      {habitaciones.length === 0 ? (
        <p>No hay habitaciones registradas.</p>
      ) : (
        <div className="row">
          {habitaciones.map((hab) => (
            <div className="col-md-4" key={hab.id}>
              <div className="card mb-3 shadow-sm">
                {hab.imagenUrl && (
                  <img
                    src={hab.imagenUrl}
                    className="card-img-top"
                    alt={`Imagen de ${hab.tipo}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title text-capitalize">{hab.tipo}</h5>
                  <p className="card-text">{hab.descripcion}</p>
                  <p><strong>Precio:</strong> ${hab.precioPorNoche} COP</p>
                  <p><strong>Capacidad:</strong> {hab.capacidad} personas</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => editarHabitacion(hab.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => borrarHabitacion(hab.id)}
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

export default HabitacionesList;

