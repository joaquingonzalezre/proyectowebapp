"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor({ isVideoHovered, isMuted }) {
  const cursorRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
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

  return (
    <div
      id="custom-cursor"
      ref={cursorRef}
      style={{ opacity: isVideoHovered ? 1 : 0 }}
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
