import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import HabitacionesList from './components/HabitacionesList';
import CrearHabitacion from './components/CrearHabitacion';
import EditarHabitacion from './components/EditarHabitacion';

import ReservacionList from './components/ReservacionList';
import CrearReservacion from './components/CrearReservacion';
import EditarReservacion from './components/EditarReservacion';

import ServiciosList from './components/ServiciosList'; 
import CrearServicios from './components/CrearServicios';
import EditarServicios from './components/EditarSevicios'; 

import Inicio from './components/Inicio';

function Admin() {
  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Hotel Jireh</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/habitaciones">Lista Habitaciones</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/crear-habitacion">Crear Habitación</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/reservaciones">Lista Reservaciones</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/crear-reservacion">Crear Reservación</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/servicios">Lista Servicios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/crear-servicio">Crear Servicios</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />

        {/* Habitaciones */}
        <Route path="habitaciones" element={<HabitacionesList />} />
        <Route path="crear-habitacion" element={<CrearHabitacion />} />
        <Route path="editar-habitacion/:id" element={<EditarHabitacion />} />

        {/* Reservaciones */}
        <Route path="reservaciones" element={<ReservacionList />} />
        <Route path="crear-reservacion" element={<CrearReservacion />} />
        <Route path="editar-reservacion/:id" element={<EditarReservacion />} />

        {/* Servicios */}
        <Route path="servicios" element={<ServiciosList />} />
        <Route path="crear-servicio" element={<CrearServicios />} />
        <Route path="editar-servicio/:id" element={<EditarServicios />} />
      </Routes>
    </div>
  );
}

export default Admin;


