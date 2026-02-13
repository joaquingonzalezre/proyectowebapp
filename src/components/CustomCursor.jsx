"use client";
import { useEffect, useRef } from "react";
import Image from "next/image"; // Importamos el componente de imagen

export default function CustomCursor({ isVideoHovered, isMuted }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Lógica básica para que el cursor siga al mouse
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      id="custom-cursor"
      ref={cursorRef}
      // Si estamos sobre el video, añadimos la clase 'video-mode'
      className={isVideoHovered ? "video-mode" : ""}
    >
      {/* LÓGICA DE ICONOS: Solo se muestran si estamos sobre el video */}
      {isVideoHovered && (
        <div className="cursor-icon-wrapper">
          {isMuted ? (
            <Image
              src="/unmute.webp" // Tu imagen de silencio
              alt="Mute"
              width={50} // Tamaño del icono
              height={50}
              priority
            />
          ) : (
            <Image
              src="/mute.webp" // Tu imagen de sonido
              alt="Unmute"
              width={50}
              height={50}
              priority
            />
          )}
        </div>
      )}
    </div>
  );
}
