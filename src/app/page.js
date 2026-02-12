"use client";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import Preloader from "../components/Preloader";
import CustomCursor from "../components/CustomCursor";
import ProjectItem from "../components/ProjectItem";

// --- TUS DATOS DE PROYECTOS Y SERVICIOS SE MANTIENEN IGUAL ---
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
    img: "/bancocentral.webp",
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

const servicios = [
  { id: "film", titulo: "Film", img: "/film.webp", link: "/film" },
  { id: "foto", titulo: "Foto", img: "/fotoservicio.webp", link: "/foto" },
  {
    id: "digital",
    titulo: "Contenido Digital",
    img: "/digitalservicio.webp",
    link: "/digital",
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const videoRef = useRef(null);
  const lenisRef = useRef(null);

  // 1. EFECTO DE LENIS (SCROLL)
  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis({ duration: 1.2, lerp: 0.05 });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", (e) => {
      setShowScrollTop(e.scroll > 500);
    });

    return () => lenis.destroy();
  }, [loading]);

  // 2. NUEVO: OPTIMIZACIÓN DE DATOS DE VIDEO (ESTO ES LO QUE NECESITAS)
  useEffect(() => {
    if (loading) return; // Esperamos a que termine de cargar

    const videoElement = videoRef.current;
    if (!videoElement) return;

    // A) Detectar si el video salió de la pantalla (Scroll)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Si no se ve, PAUSA para ahorrar datos
          videoElement.pause();
        } else {
          // Si se ve y la pestaña está activa, PLAY
          if (!document.hidden) videoElement.play().catch(() => {});
        }
      },
      { threshold: 0.1 }, // Se activa cuando queda 10% visible
    );

    observer.observe(videoElement);

    // B) Detectar si cambió de pestaña (Minimizó o cambió a otra web)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoElement.pause(); // Ahorro máximo de datos
      } else {
        // Solo reproducir si además está visible en pantalla (verificación doble)
        const rect = videoElement.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isInViewport) videoElement.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Limpieza al desmontar
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [loading]); // Se ejecuta cuando termina el loading

  // Resto de funciones...
  const handleLoaded = () => {
    setLoading(false);
    // El useEffect de arriba se encargará de darle play si es visible
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
          {/* IMPORTANTE: Agregamos ref={videoRef} aquí */}
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
            {/* OJO: Cambia esto por tu archivo optimizado MP4 (5MB) */}
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

        {/* ... EL RESTO DE TU CÓDIGO (SECCIONES) SIGUE IGUAL ... */}

        <section className="seccion-negra">
          <div className="contenedor-centro">
            {/* ...contenido seccion negra... */}
            <h2 className="titulo-ju">
              Creatividad colectiva y producción a medida
            </h2>
            {/* ...etc... */}
          </div>
        </section>

        {/* ... (Mantén aquí el resto de tu return tal cual lo tenías) ... */}
        <section className="servicios-container">
          {/* ...contenido servicios... */}
        </section>

        <section className="seccion-proyectos">
          {/* ...contenido proyectos... */}
        </section>

        <footer className="footer-final">
          <div className="contenido-footer">
            <p>&copy; 2026 JUWEARE. TODOS LOS DERECHOS RESERVADOS.</p>
          </div>
        </footer>
      </div>

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
