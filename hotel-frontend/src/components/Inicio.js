import React from 'react';
import logo from '../assets/logo.avif';
import './Inicio.css';

const Inicio = () => {
    return (
        <div className="inicio-container">

            {/* SECCIÓN QUIÉNES SOMOS */}
            <section className="quienes-somos">
                <h2>¿Quiénes somos?</h2>
                <p>
                    Bienvenido al Hotel Jireh, tu hogar lejos de casa. Contamos con habitaciones cómodas,
                    un ambiente familiar y servicios de calidad como restaurante, bar, piscina y gimnasio.
                </p>
            </section>

            {/* SECCIÓN DE SERVICIOS */}
            <h2 className="titulo-servicios">Nuestros Servicios</h2>

            <div className="container-card">
                <div className="card">
                    <figure>
                        <img
                            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                            alt="Restaurante del hotel"
                        />
                    </figure>
                    <div className="contenido-card">
                        <h3>Restaurante</h3>
                        <p>
                            Disfruta de deliciosos platos gourmet nacionales e internacionales en
                            nuestro restaurante exclusivo.
                        </p>
                        <a href="#">Ver más</a>
                    </div>
                </div>

                <div className="card">
                    <figure>
                        
                    </figure>
                    <div className="contenido-card">
                        <h3>Piscina</h3>
                        <p>
                            Relájate en nuestra piscina al aire libre con zona de descanso y bar incluido.
                        </p>
                        <a href="#">Ver más</a>
                    </div>
                </div>

                <div className="card">
                    <figure>
                        <img
                            src="https://images.unsplash.com/photo-1611892440504-42a792e24d32"
                            alt="Spa"
                        />
                    </figure>
                    <div className="contenido-card">
                        <h3>Spa y Bienestar</h3>
                        <p>
                            Vive una experiencia de relajación con nuestros masajes, sauna y tratamientos faciales.
                        </p>
                        <a href="#">Ver más</a>
                    </div>
                </div>
            </div>

            {/* UBICACIÓN */}
            <section className="ubicacion">
                <h2>¿Dónde estamos ubicados?</h2>
                <p>Cra 50 # 42 - 13, Medellín, Colombia</p>
                <iframe
                    title="Ubicación Hotel"
                    src="https://www.google.com/maps/embed?pb=..."
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>

            </section>

            {/* PIE DE PÁGINA */}
            <footer className="footer">
                <p>&copy; 2025 Hotel Jireh. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Inicio;
