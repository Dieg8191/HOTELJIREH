import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Habitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    // Realiza la petición a la API para obtener las habitaciones
    axios.get('http://localhost:8080/api/habitaciones')
      .then(response => setHabitaciones(response.data))
      .catch(error => console.error('Error al obtener habitaciones:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Nuestras Habitaciones</h2>
      
      <div className="row">
        {/* Si no hay habitaciones, muestra un mensaje */}
        {habitaciones.length === 0 ? (
          <div className="text-center">No hay habitaciones disponibles.</div>
        ) : (
          // Mapea las habitaciones y muestra una tarjeta para cada una
          habitaciones.map((habitacion) => (
            <div className="col-md-4 mb-4" key={habitacion.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={habitacion.imagenUrl || "https://via.placeholder.com/400x250"}
                  className="card-img-top"
                  alt={`Imagen de ${habitacion.nombre}`}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{habitacion.tipo}</h5>
                  <p className="card-text">{habitacion.descripcion}</p>
                  <ul className="list-unstyled">
                    <li><strong>Capacidad:</strong> {habitacion.capacidad} personas</li>
                    <li><strong>Precio por noche:</strong> ${habitacion.precioPorNoche}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Habitaciones;

