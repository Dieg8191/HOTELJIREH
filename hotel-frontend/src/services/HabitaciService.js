import axios from "axios";

// URL base de la API para las habitaciones
const API_URL = "http://localhost:8080/api/habitaciones";

// Función para obtener todas las habitaciones
export const obtenerHabitaciones = () => axios.get(API_URL);

// Nueva función para obtener una habitación por ID
export const obtenerHabitacion = (id) => axios.get(`${API_URL}/${id}`);

// Función para crear una nueva habitación
const crearHabitacion = (habitacion) => axios.post(API_URL, habitacion);
export default crearHabitacion;

// Función para actualizar una habitación existente
export const actualizarHabitacion = (id, habitacion) => axios.put(`${API_URL}/${id}`, habitacion);

// Función para eliminar una habitación
export const eliminarHabitacion = (id) => axios.delete(`${API_URL}/${id}`);

