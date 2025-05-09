import axios from "axios";

// URL base de la API para los servicios
const API_URL = "http://localhost:8080/api/servicios";

// Función para obtener todos los servicios
export const obtenerServicios = () => axios.get(API_URL);

// Nueva función para obtener un servicio por ID
export const obtenerServicio = (id) => axios.get(`${API_URL}/${id}`);

// Función para crear un nuevo servicio
export const crearServicio = (servicio) => axios.post(API_URL, servicio);

// Función para actualizar un servicio existente
export const actualizarServicio = (id, servicio) => axios.put(`${API_URL}/${id}`, servicio);

// Función para eliminar un servicio
export const eliminarServicio = (id) => axios.delete(`${API_URL}/${id}`);

