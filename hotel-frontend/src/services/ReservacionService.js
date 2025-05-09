import axios from "axios";

// URL base de la API para las reservaciones
const API_URL = "http://localhost:8080/api/reservas";

// Función para obtener todas las reservaciones
export const obtenerReservas = () => axios.get(API_URL);

// ✅ Nueva función para obtener una reservación por ID
export const obtenerReserva = (id) => axios.get(`${API_URL}/${id}`);

// Función para crear una nueva reservación
const crearReserva = (reserva) => axios.post(API_URL, reserva);
export default crearReserva;

// Función para actualizar una reservación existente
export const actualizarReserva = (id, reserva) => axios.put(`${API_URL}/${id}`, reserva);

// Función para eliminar una reservación
export const eliminarReserva = (id) => axios.delete(`${API_URL}/${id}`);
