"use client";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Image from "next/image";
import Preloader from "../components/Preloader";
import CustomCursor from "../components/CustomCursor";
import ProjectItem from "../components/ProjectItem";

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

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // 1. NUEVO: Estado para controlar la visibilidad del botón
  const [showScrollTop, setShowScrollTop] = useState(false);

  const videoRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({ duration: 1.2, lerp: 0.05 });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. NUEVO: Detectar cuando el usuario baja más de 500px
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
            disableRemotePlayback // <--- NUEVO: Bloquea transmisión externa/pop-out
            controls={false}
            className="video-bg"
          >
            <source src="/U.mp4" type="video/mp4" />
          </video>
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

        {/* === SECCIÓN NEGRA ACTUALIZADA (CENTRADA) === */}
        <section className="seccion-negra">
          <div className="contenedor-centro">
            <h2>Creatividad colectiva y producción a medida</h2>

            <p className="subtitulo-ju">
              En <strong>JU</strong> convertimos ideas en experiencias visuales
              que funcionan.
            </p>

            {/* Iconos (Simulados con texto/emojis por ahora) */}
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
        {/* === FIN SECCIÓN NEGRA === */}

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

        <footer className="footer-final">
          <div className="contenido-footer">
            <p>&copy; 2026 JUWEARE. TODOS LOS DERECHOS RESERVADOS.</p>
          </div>
        </footer>
      </div>

      {/* 3. LÓGICA CORREGIDA: Usamos el estado showScrollTop */}
      <button
        className={`btn-top ${showScrollTop ? "show" : ""}`}
        onClick={scrollToTop}
        // Ocultamos totalmente si está cargando para evitar parpadeos
        style={{ display: loading ? "none" : "flex" }}
      >
        <span className="arrow-up"></span>
      </button>
    </>
  );
}
