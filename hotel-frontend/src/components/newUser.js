import React, { useState } from "react";
import axios from "axios";

const NewUser = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    correo: "",
    celular: "",
    username: "",
    password: ""
  });


  const register = async () => {
    const API_URL = "http://localhost:8080/auth/register";

    try {
      const response = await axios.post(API_URL, usuario);
      alert(response.data); // Muestra el mensaje que envía el backend
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      if (error.response) {
        // El servidor respondió con un error
        alert(error.response.data);
      } else {
        // Problema de conexión u otro
        alert("Error de conexión");
      }
    }
  }

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });

      const data = await response.text();
      alert(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    }
  };



  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "600px" }}>
        <h2 className="mb-4">Crear Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              className="form-control"
              name="direccion"
              value={usuario.direccion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={usuario.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              name="correo"
              value={usuario.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Celular</label>
            <input
              type="text"
              className="form-control"
              name="celular"
              value={usuario.celular}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={usuario.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={usuario.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewUser;
