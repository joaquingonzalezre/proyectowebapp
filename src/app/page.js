"use client";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Image from "next/image";
import Preloader from "../components/Preloader";
import CustomCursor from "../components/CustomCursor";
import ProjectItem from "../components/ProjectItem";

const projects = [
  {
    title: "SKECHERS",
    subtitle: "Campaña OOM<br>2025",
    img: "https://images.unsplash.com/photo-1556906781-9a412961d289?q=80&w=1600&auto=format&fit=crop",
    large: true,
  },
  {
    title: "COOPEUCH",
    subtitle: "Memoria Anual<br>2025",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
    large: true,
  },
  {
    title: "DECATHLON",
    subtitle: "Renovación imagen<br>2025",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop",
    large: false,
  },
  {
    title: "ROCOTO",
    subtitle: "Página web<br>2025",
    img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop",
    large: false,
  },
  {
    title: "STARBUCKS",
    subtitle: "Holidays drinks<br>2025",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
    large: false,
  },
  {
    title: "TREX",
    subtitle: "Catálogo<br>2025",
    img: "https://images.unsplash.com/photo-1605218427306-6354db69e563?q=80&w=1000&auto=format&fit=crop",
    large: false,
  },
  {
    title: "NIKE",
    subtitle: "Lanzamiento<br>2026",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    large: true,
  },
  {
    title: "ADIDAS",
    subtitle: "Summer Vibe<br>2026",
    img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop",
    large: true,
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
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
          <video ref={videoRef} loop muted playsInline className="video-bg">
            <source src="/U.mp4" type="video/mp4" />
          </video>
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

        <section className="seccion-negra">
          <div className="contenedor-derecha">
            <h2>CALIDAD TU PERRO</h2>
            <p>SU USTE SABE LO WENO, YA TU SAE.</p>
          </div>
        </section>

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
            <p>&copy; 2026 JUWEARE.</p>
          </div>
        </footer>
      </div>

      <button
        className="btn-top show"
        onClick={scrollToTop}
        style={{ opacity: loading ? 0 : 1 }}
      >
        <span className="arrow-up"></span>
      </button>
    </>
  );
}
