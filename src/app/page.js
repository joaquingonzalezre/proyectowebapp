Aquí tienes el archivo src/app/page.js completo y actualizado.

He integrado la nueva Sección de Servicios (Film, Foto, Contenido Digital) justo en medio, usando el componente optimizado <Image /> de Next.js para que cargue rápido y se vea profesional.

Solo copia y pega todo esto en tu archivo:

JavaScript

"use client";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link"; // Importante para la navegación interna
import Preloader from "../components/Preloader";
import CustomCursor from "../components/CustomCursor";
import ProjectItem from "../components/ProjectItem";

// --- DATOS DE PROYECTOS (Tu lista existente) ---
const projects = [
  {
    title: "STARBUCKS",
    subtitle: "Holidays drinks<br>2025",
    img: "/starbucks.webp",
    large: true,
  },
  {
    title: "BANCO CENTRAL",
    subtitle: "Lanzamiento nueva moneda<br>2025",
    img: "/bancocentral2.png",
    large: true,
  },
  {
    title: "STARBUCKS",
    subtitle: "Holidays drinks<br>2025",
    img: "/starbucks2.webp",
    large: false,
  },
  {
    title: "SKECHERS",
    subtitle: "Campaña OOM<br>2025",
    img: "/skechers2.webp",
    large: false,
  },
  {
    title: "STARBUCKS",
    subtitle: "Holidays drinks<br>2025",
    img: "/starbucks3.webp",
    large: false,
  },
  {
    title: "TREX",
    subtitle: "Catálogo<br>2025",
    img: "/trex.webp",
    large: false,
  },
  {
    title: "COOPEUCH",
    subtitle: "Memoria<br>2025",
    img: "/coopeuch.webp",
    large: true,
  },
  {
    title: "ADIDAS",
    subtitle: "Summer Vibe<br>2026",
    img: "/skechers.webp",
    large: true,
  },
];

// --- NUEVOS DATOS: SERVICIOS (Film, Foto, Digital) ---
const servicios = [
  { 
    id: "film",
    titulo: "Film", 
    // Recuerda subir una foto llamada 'film.jpg' a tu carpeta public
    img: "/film.jpg", 
    link: "/film" 
  },
  { 
    id: "foto",
    titulo: "Foto", 
    // Recuerda subir una foto llamada 'foto.jpg' a tu carpeta public
    img: "/foto.jpg", 
    link: "/foto" 
  },
  { 
    id: "digital",
    titulo: "Contenido Digital", 
    // Recuerda subir una foto llamada 'digital.jpg' a tu carpeta public
    img: "/digital.jpg", 
    link: "/digital" 
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const videoRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    // Inicializar Smooth Scroll (Lenis)
    const lenis = new Lenis({ duration: 1.2, lerp: 0.05 });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Detectar scroll para mostrar botón "Volver arriba"
    lenis.on("scroll", (e) => {
      setShowScrollTop(e.scroll > 500);
    });

    return () => lenis.destroy();
  }, [loading]);

  const handleLoaded = () => {
    setLoading(false);
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const scrollToTop = () => lenisRef.current?.scrollTo(0);

  return (
    <>
      <Preloader onLoaded={handleLoaded} />
      <CustomCursor isVideoHovered={isVideoHovered} isMuted={isMuted} />

      <div
        className={`site-wrapper ${!loading ? "loaded" : ""}`}
        style={{
          clipPath: !loading
            ? "circle(150% at 50% 50%)"
            : "circle(0% at 50% 50%)",
          transition: "clip-path 1.8s cubic-bezier(0.87, 0, 0.13, 1)",
        }}
      >
        {/* === HERO SECTION (VIDEO) === */}
        <section
          className="hero-container"
          id="video-section"
          onMouseEnter={() => setIsVideoHovered(true)}
          onMouseLeave={() => setIsVideoHovered(false)}
          onClick={toggleMute}
        >
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            controls={false}
            className="video-bg"
          >
            <source src="/U.mp4" type="video/mp4" />
          </video>
          
          {/* Escudo invisible para bloquear botones de Opera/Browsers */}
          <div className="video-escudo"></div>

          <div className="content">
            <Image
              src="/juweare-logo.png"
              alt="Logo"
              width={800}
              height={200}
              className="logo-hero"
              priority
            />
          </div>
          <div className="fade-bottom"></div>
        </section>

        {/* === SECCIÓN NEGRA (TEXTO) === */}
        <section className="seccion-negra">
          <div className="contenedor-centro">
            <h2>Creatividad colectiva y producción a medida</h2>

            <p className="subtitulo-ju">
              En <strong>JU</strong> convertimos ideas en experiencias visuales
              que funcionan.
            </p>

            <div className="iconos-container">
              <span>📄</span> <span>📷</span> <span>🧠</span>
            </div>

            <h3>Diseñamos y producimos contenido con equipos a medida</h3>

            <p className="texto-descripcion">
              Sin moldes, límites ni manuales, construyendo cada proyecto en
              conjunto.
            </p>

            <div className="firma-final">
              <p>‘Cause we are JU, and ju we are.</p>
              <p>Creating together is who we are.</p>
            </div>
          </div>
        </section>

        {/* === NUEVA SECCIÓN DE SERVICIOS (FILM / FOTO / DIGITAL) === */}
        <section className="servicios-container">
          <div className="servicios-grid">
            {servicios.map((servicio) => (
              <Link href={servicio.link} key={servicio.id} className="servicio-item">
                
                {/* Contenedor de Imagen Optimizado */}
                <div className="servicio-img-wrapper">
                  <Image 
                    src={servicio.img} 
                    alt={servicio.titulo}
                    fill // Llena el contenedor padre
                    sizes="(max-width: 768px) 100vw, 33vw" // Optimización de carga según pantalla
                    style={{ objectFit: "cover" }} // Recorte perfecto
                    className="servicio-next-image"
                  />
                </div>

                {/* Texto y Enlace */}
                <div className="servicio-info">
                  <h3>{servicio.titulo}</h3>
                  <span className="saber-mas">SABER MÁS &rarr;</span>
                </div>
                
              </Link>
            ))}
          </div>
        </section>

        {/* === GALERÍA DE PROYECTOS === */}
        <section className="seccion-proyectos">
          <div className="grid-proyectos">
            {projects.map((proj, i) => (
              <ProjectItem
                key={i}
                title={proj.title}
                subtitle={proj.subtitle}
                image={proj.img}
                isLarge={proj.large}
              />
            ))}
          </div>
        </section>

        {/* === FOOTER === */}
        <footer className="footer-final">
          <div className="contenido-footer">
            <p>&copy; 2026 JUWEARE. TODOS LOS DERECHOS RESERVADOS.</p>
          </div>
        </footer>
      </div>

      {/* === BOTÓN VOLVER ARRIBA === */}
      <button
        className={`btn-top ${showScrollTop ? "show" : ""}`}
        onClick={scrollToTop}
        style={{ display: loading ? "none" : "flex" }}
      >
        <span className="arrow-up"></span>
      </button>
    </>
  );
}