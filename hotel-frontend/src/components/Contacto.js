import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contacto = () => {
  const cafeClaro = { color: '#A0522D' }; // Puedes cambiar este color si deseas otro tono

  return (
    <div className="container my-5">
      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-center mb-4" style={cafeClaro}>Contáctanos</h2>

        <form className="mb-4">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" placeholder="Tu nombre" />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" placeholder="Tu correo" />
          </div>
          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <textarea className="form-control" rows="4" placeholder="Escribe tu mensaje aquí"></textarea>
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: '#A0522D', color: 'white' }}
            >
              Enviar mensaje
            </button>
          </div>
        </form>

        {/* Mapa */}
        <div className="text-center">
          <h5 className="mb-3" style={cafeClaro}>Nuestra ubicación</h5>
          <div className="rounded overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?...tu enlace aquí..."
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Ubicación"
            ></iframe>
          </div>
        </div>

        <footer className="mt-5 py-4" style={{ backgroundColor: '#f8f4f1' }}>
          <div className="container text-center">
            <h5 className="mb-3" style={{ color: '#A0522D' }}>Síguenos en nuestras redes</h5>
            <div>
              <a
                href="https://www.instagram.com"
                className="text-decoration-none fs-4 mx-3"
                style={{ color: '#d63384' }}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com"
                className="text-decoration-none fs-4 mx-3"
                style={{ color: '#3b5998' }}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://wa.me/123456789"
                className="text-decoration-none fs-4 mx-3"
                style={{ color: '#25D366' }}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
            <p className="mt-3" style={{ fontSize: '14px', color: '#6c757d' }}>
              &copy; {new Date().getFullYear()} TuEmpresa. Todos los derechos reservados.
            </p>
          </div>
        </footer>


      </div>
    </div>
  );
};

export default Contacto;
