import React, { useState } from "react";
import axios from "axios";

const NewUser = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    direccion: "",
    correo: "",
    celular: "",
    username: "",
    password: ""
  });


  const register = async (e) => {
    e.preventDefault();
    const API_URL = "http://localhost:8080/api/auth/register";

    try {
      const response = await axios.post(API_URL, usuario);
      
      // axios NO tiene .ok → se revisa con status
    if (response.status === 201 || response.status === 200) {
      console.log("Usuario registrado con éxito!");
    }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      if (error.response) {
        // El servidor respondió con un error
        alert(error.response.data.message);
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

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "600px" }}>
        <h2 className="mb-4">Crear Usuario</h2>
        <form onSubmit={register}>
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
          <input type="submit" value="Crear" className="btn btn-primary"/>
        </form>
      </div>
    </div>
  );
}

export default NewUser;
