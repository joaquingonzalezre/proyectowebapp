"use client";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import Preloader from "../components/Preloader";
import CustomCursor from "../components/CustomCursor";
import ProjectItem from "../components/ProjectItem";

// --- CONFIGURACIÓN ---
const VELOCIDAD_CINTA = 0.5; // Cambia a 1.0 para más rápido, 0.2 para más lento

// --- DATOS ---
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
  { id: "film", titulo: "FILM", img: "/film.webp", link: "/film" },
  { id: "foto", titulo: "FOTO", img: "/fotoservicio.webp", link: "/foto" },
  {
    id: "digital",
    titulo: "CONTENIDO DIGITAL",
    img: "/digitalservicio.webp",
    link: "/digital",
  },
];

// Asegúrate de que estos archivos PNG existan en tu carpeta /public
const brands = [
  { id: 1, name: "Bupa", img: "/bupa.png" },
  { id: 2, name: "Chery", img: "/chery.png" },
  { id: 3, name: "Teck", img: "/teck.png" },
  { id: 4, name: "BMW", img: "/bmw.png" },
  { id: 5, name: "CCU", img: "/ccu.png" },
  { id: 6, name: "CNN Chile", img: "/cnn.png" },
  { id: 7, name: "Decathlon", img: "/decathlon.png" },
  { id: 8, name: "Starbucks", img: "/starbucks.png" },
];

export default function Home() {
  // Estados Generales
  const [loading, setLoading] = useState(true);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Estados para el Slider (Arrastrar)
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Referencias
  const videoRef = useRef(null);
  const lenisRef = useRef(null);
  const sliderRef = useRef(null);

  // 1. EFECTO LENIS + VIDEO OPTIMIZATION
  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis({ duration: 1.2, lerp: 0.05 });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", (e) => setShowScrollTop(e.scroll > 500));

    const videoElement = videoRef.current;
    if (videoElement) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) videoElement.pause();
          else if (!document.hidden) videoElement.play().catch(() => {});
        },
        { threshold: 0.1 },
      );

      observer.observe(videoElement);

      const handleVisibilityChange = () => {
        if (document.hidden) videoElement.pause();
        else {
          const rect = videoElement.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom >= 0)
            videoElement.play().catch(() => {});
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        lenis.destroy();
        observer.disconnect();
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
      };
    }
    return () => lenis.destroy();
  }, [loading]);

  // 2. LÓGICA DE LA CINTA TRANSPORTADORA (Auto-Scroll)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId;
    const animate = () => {
      if (!isDown) {
        slider.scrollLeft += VELOCIDAD_CINTA;
        // Reinicio imperceptible para efecto infinito
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isDown]);

  // 3. EVENTOS DE ARRASTRAR (DRAG)
  const startDragging = (e) => {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };
  const stopDragging = () => setIsDown(false);
  const moveDragging = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidad al arrastrar
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Helpers
  const handleLoaded = () => setLoading(false);
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
        {/* === HERO SECTION === */}
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

        {/* === SECCIÓN NEGRA === */}
        <section className="seccion-negra">
          <div className="contenedor-centro">
            <h2 className="titulo-ju">
              Creatividad colectiva y producción a medida
            </h2>
            <p className="subtitulo-ju">
              En <strong>JU</strong> convertimos ideas en experiencias visuales
              que funcionan.
            </p>
            <div className="iconos-row">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
              </svg>
            </div>
            <h2 className="titulo-ju">
              Diseñamos y producimos contenido con equipos a medida
            </h2>
            <p className="subtitulo-ju">
              Sin moldes, límites ni manuales, construyendo cada proyecto en
              conjunto.
            </p>
            <div className="firma-final">
              <p>‘Cause we are JU, and ju we are.</p>
              <p>Creating together is who we are.</p>
            </div>
          </div>
        </section>

        {/* === SERVICIOS === */}
        <section className="servicios-container">
          <div className="servicios-grid">
            {servicios.map((servicio) => (
              <Link
                href={servicio.link}
                key={servicio.id}
                className="servicio-item"
              >
                <div className="servicio-img-wrapper">
                  <Image
                    src={servicio.img}
                    alt={servicio.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="servicio-next-image"
                  />
                </div>
                <div className="servicio-info">
                  <h3>{servicio.titulo}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* === PROYECTOS === */}
        <section className="seccion-proyectos">
          <div className="header-proyectos">
            <h2>PROYECTOS DESTACADOS</h2>
          </div>
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

        {/* === NUEVA SECCIÓN: MARCAS (INTERACTIVA) === */}
        <section className="marcas-container">
          <div className="marcas-header">
            <h2>JU WE TRUST: Marcas que han trabajado con nosotros</h2>
          </div>

          <div
            className={`marcas-slider ${isDown ? "active" : ""}`}
            ref={sliderRef}
            onMouseDown={startDragging}
            onMouseLeave={stopDragging}
            onMouseUp={stopDragging}
            onMouseMove={moveDragging}
          >
            <div className="marcas-track">
              {/* Repetimos 3 veces para asegurar el bucle infinito visual */}
              {[...brands, ...brands, ...brands].map((brand, index) => (
                <div key={`${brand.id}-${index}`} className="marca-item">
                  <div className="marca-img-wrapper">
                    <Image
                      src={brand.img}
                      alt={brand.name}
                      fill
                      sizes="200px"
                      style={{ objectFit: "contain" }}
                      className="marca-logo"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === FOOTER === */}
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
