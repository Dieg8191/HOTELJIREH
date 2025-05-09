import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Servicios = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/servicios')
      .then(response => setServicios(response.data))
      .catch(error => console.error('Error al obtener servicios:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Nuestros Servicios</h2>
      <div className="row">
        {servicios.length === 0 ? (
          <div className="text-center">No hay servicios disponibles.</div>
        ) : (
          servicios.map((servicio) => (
            <div className="col-md-4 mb-4" key={servicio.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={servicio.imagenUrl || "https://via.placeholder.com/400x250"}
                  className="card-img-top"
                  alt={`Imagen de ${servicio.nombre}`}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{servicio.nombre}</h5>
                  <p className="card-text">{servicio.descripcion}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Servicios;
