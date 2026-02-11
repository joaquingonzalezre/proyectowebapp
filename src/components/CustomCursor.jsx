"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor({ isVideoHovered, isMuted }) {
  const cursorRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });

  // 1. NUEVO: Estado para saber si el usuario ya movió el mouse
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      // 2. Al mover el mouse, activamos la bandera (React es inteligente y solo renderiza si cambia)
      setHasMoved(true);
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      cursor.current.x += (mouse.current.x - cursor.current.x) * 0.15;
      cursor.current.y += (mouse.current.y - cursor.current.y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // 3. LÓGICA FINAL: Solo mostrar si está sobre el video Y el mouse ya se movió
  const shouldShow = isVideoHovered && hasMoved;

  return (
    <div
      id="custom-cursor"
      ref={cursorRef}
      style={{ opacity: shouldShow ? 1 : 0 }} // Usamos la nueva variable combinada
    >
      <div id="icon-mute" style={{ display: isMuted ? "block" : "none" }}>
        🔇
      </div>
      <div id="icon-on" style={{ display: !isMuted ? "block" : "none" }}>
        🔊
      </div>
    </div>
  );
}
