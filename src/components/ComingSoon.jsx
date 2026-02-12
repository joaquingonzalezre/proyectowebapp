import Link from "next/link";
import Image from "next/image";

export default function ComingSoon({ title }) {
  return (
    <div className="coming-soon-container">
      {/* Fondo sutilmente animado o negro puro */}
      <div className="bg-noise"></div>

      <div className="content-box">
        {/* LOGO (Asegúrate de tener tu logo en public) */}
        <div className="logo-wrapper">
          {/* Si no tienes el logo a mano, puedes borrar este bloque Image */}
          <Image
            src="/juweare-logo.png"
            alt="JUWEARE"
            width={200}
            height={50}
            style={{ objectFit: "contain" }}
          />
        </div>

        <h1 className="section-title">{title}</h1>

        <p className="message">
          ESTAMOS PREPARANDO ALGO INCREÍBLE.
          <br />
          ESTA SECCIÓN ESTARÁ DISPONIBLE MUY PRONTO.
        </p>

        <div className="loading-bar">
          <div className="progress"></div>
        </div>

        <Link href="/" className="btn-back">
          &larr; VOLVER AL INICIO
        </Link>
      </div>

      <style jsx>{`
        .coming-soon-container {
          width: 100vw;
          height: 100vh;
          background-color: #000;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .content-box {
          text-align: center;
          z-index: 10;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }

        .section-title {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -1px;
          margin: 0;
          background: linear-gradient(to right, #fff, #666);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .message {
          color: #888;
          font-size: 0.9rem;
          line-height: 1.6;
          letter-spacing: 1px;
          text-transform: uppercase;
          max-width: 400px;
        }

        .loading-bar {
          width: 200px;
          height: 2px;
          background-color: #222;
          position: relative;
          overflow: hidden;
        }

        .progress {
          width: 50%;
          height: 100%;
          background-color: white;
          position: absolute;
          left: 0;
          animation: load 2s infinite ease-in-out;
        }

        @keyframes load {
          0% {
            left: -50%;
            width: 30%;
          }
          50% {
            left: 20%;
            width: 60%;
          }
          100% {
            left: 100%;
            width: 30%;
          }
        }

        .btn-back {
          margin-top: 20px;
          color: white;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 12px 30px;
          border-radius: 30px;
          font-size: 0.8rem;
          letter-spacing: 2px;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }

        .btn-back:hover {
          background-color: white;
          color: black;
          border-color: white;
        }
      `}</style>
    </div>
  );
}
