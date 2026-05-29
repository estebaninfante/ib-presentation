import React, { useState, useEffect } from 'react';
import {
  Smartphone, Lock, Radio, Sun, Compass, ArrowRight, Shield, AlertTriangle, 
  MapPin, DollarSign, Award, ChevronRight, ZoomIn, ZoomOut, ChevronLeft
} from 'lucide-react';

/* CountUp Component for stats animation */
const CountUp = ({ end, duration = 1200, prefix = "", suffix = "", decimal = false, triggerPulse = false }) => {
  const [value, setValue] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let start = 0;
    const numEnd = parseFloat(end.toString().replace(/[^0-9.-]/g, ''));
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const current = easeProgress * numEnd;

      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setValue(numEnd);
        if (triggerPulse) {
          setPulse(true);
          setTimeout(() => setPulse(false), 300);
        }
      }
    };

    requestAnimationFrame(update);
  }, [end, duration, triggerPulse]);

  const formatted = decimal
    ? value.toFixed(1)
    : Math.floor(value).toLocaleString();

  return (
    <span
      style={{
        display: 'inline-block',
        transition: 'transform 300ms ease',
        transform: pulse ? 'scale(1.05)' : 'scale(1)'
      }}
    >
      {prefix}{formatted}{suffix}
    </span>
  );
};

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [time, setTime] = useState(600); // 10 minutes (600 seconds)
  const [isFadingOut, setIsFadingOut] = useState(false);

  const totalSlides = 12;

  // Slide navigation
  const next = () => {
    if (activeSlide < totalSlides - 1 && !isFadingOut) {
      setIsFadingOut(true);
      setTimeout(() => {
        setActiveSlide(prev => prev + 1);
        setIsFadingOut(false);
      }, 350);
    }
  };

  const prev = () => {
    if (activeSlide > 0 && !isFadingOut) {
      setIsFadingOut(true);
      setTimeout(() => {
        setActiveSlide(prev => prev - 1);
        setIsFadingOut(false);
      }, 350);
    }
  };

  // Click on screen halves to navigate (respecting scaled canvas coordinates)
  const handleContainerClick = (e) => {
    if (e.target.closest('.interactive') || e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    if (clickX > width / 2) {
      next();
    } else {
      prev();
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        next();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide, isFadingOut]);

  // Countdown timer logic
  useEffect(() => {
    if (activeSlide === 0) return;
    const timer = setInterval(() => {
      setTime(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const [scale, setScale] = useState(1);

  // Auto-scaling logic to fit 16:9 viewport inside the screen
  useEffect(() => {
    const handleResize = () => {
      const targetRatio = 16 / 9;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;

      let newScale = 1;
      if (windowRatio > targetRatio) {
        // Window is wider than 16:9
        newScale = windowHeight / 1080;
      } else {
        // Window is narrower than 16:9
        newScale = windowWidth / 1920;
      }
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Particle list generator for background visuals
  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      const left = Math.random() * 100;
      const drift = -40 + Math.random() * 80;
      const duration = 15 + Math.random() * 15;
      const delay = Math.random() * -20;
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            left: `${left}%`,
            '--drift': `${drift}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            backgroundColor: 'rgba(57, 255, 20, 0.15)'
          }}
        />
      );
    }
    return <div className="particles-container">{particles}</div>;
  };

  return (
    <div
      className="presentation-wrapper"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* 16:9 Viewport Canvas */}
      <div
        className="presentation-container"
        onClick={handleContainerClick}
        style={{
          width: '1920px',
          height: '1080px',
          position: 'absolute',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          userSelect: 'none'
        }}
      >
        {/* Global Background Particles */}
        {renderParticles()}

        {/* 10-Minute Countdown Timer */}
        <div className={`countdown-timer ${time === 0 ? 'pulse-red' : ''}`}>
          {formatTime(time)}
        </div>

      {/* --- SLIDE 1: PORTADA --- */}
      <div className={`section section-0 ${activeSlide === 0 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100%', zIndex: 10 }}>
          <h1 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '8.5rem',
            lineHeight: '0.9',
            color: '#FFFFFF',
            letterSpacing: '0.02em',
            margin: 0
          }}>
            SMARTBIKE STATION
          </h1>
          
          <div style={{
            width: '220px',
            height: '2px',
            backgroundColor: 'var(--primary)',
            margin: '2rem 0'
          }} />

          <h2 style={{
            fontFamily: 'var(--font-space)',
            fontSize: '2rem',
            color: 'var(--primary)',
            fontWeight: 500,
            marginBottom: '4.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            "Seguridad inteligente para tu bicicleta"
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            fontFamily: 'var(--font-sans)',
            color: '#8A8A8A',
            fontSize: '1rem',
            lineHeight: '1.4'
          }}>
            <p style={{ color: '#E5E5E5', fontWeight: 600 }}>Industrias Mundiales Innovadoras 2026-1</p>
            <p style={{ fontSize: '0.95rem' }}>Johan Alvarez · Tomas Valbuena · Juan Esteban Infante · Daniel Rodríguez · Manuela Canales</p>
            <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.5rem' }}>Universidad de La Sabana — Mayo 2026</p>
          </div>
        </div>
      </div>

      {/* --- SLIDE 2: EL PROBLEMA --- */}
      <div className={`section section-1 ${activeSlide === 1 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '1100px', zIndex: 10 }}>
          <span style={{
            fontFamily: 'var(--font-space)',
            fontSize: '0.9rem',
            color: 'var(--primary)',
            fontWeight: 700,
            letterSpacing: '0.3em',
            marginBottom: '3rem',
            textTransform: 'uppercase'
          }}>
            EL PROBLEMA
          </span>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '2.5rem',
            width: '100%',
            marginTop: '1rem'
          }}>
            {[
              { val: "50000", prefix: "+", suffix: "", label: "Hurtos a ciclistas en Bogotá (2019-2024)" },
              { val: "6 / 10", prefix: "", suffix: "", label: "Bicicletas son robadas mientras están parqueadas" },
              { val: "1.5", prefix: "", suffix: "h", label: "Frecuencia actual de robo (1 cada 1.5 horas)" }
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(57, 255, 20, 0.1)',
                  borderRadius: '16px',
                  padding: '2.5rem 1.5rem',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                  minWidth: '220px'
                }}
                className="interactive"
              >
                <div style={{
                  fontFamily: 'var(--font-space)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  marginBottom: '1.2rem',
                  lineHeight: '1.1',
                  whiteSpace: 'nowrap'
                }}>
                  {stat.val === "6 / 10" ? (
                    <span>6 de cada 10</span>
                  ) : (
                    <CountUp key={activeSlide === 1 ? 'act-1' : 'inact-1'} end={stat.val} prefix={stat.prefix} suffix={stat.suffix} decimal={stat.decimal} triggerPulse={true} />
                  )}
                </div>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: '#FFFFFF',
                  lineHeight: '1.5',
                  maxWidth: '240px'
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- SLIDE 3: CONTEXTO Y USUARIO OBJETIVO --- */}
      <div className={`section section-2 ${activeSlide === 2 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ display: 'flex', width: '100%', maxWidth: '1100px', gap: '4rem', alignItems: 'center', zIndex: 10 }}>
          {/* Left Column - Growth Data */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-space)',
              fontSize: '0.9rem',
              color: 'var(--primary)',
              fontWeight: 700,
              letterSpacing: '0.2em',
              marginBottom: '1rem',
              textTransform: 'uppercase'
            }}>
              CONTEXTO
            </span>
            <h2 style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '4.5rem',
              lineHeight: '1.05',
              color: '#FFFFFF',
              marginBottom: '2rem'
            }}>
              Crecimiento Exponencial del Ciclismo Urbano
            </h2>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderLeft: '4px solid var(--primary)',
              padding: '2rem',
              borderRadius: '0 16px 16px 0'
            }}>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.2rem',
                color: '#CCCCCC',
                lineHeight: '1.6',
                margin: 0
              }}>
                El uso de la bicicleta en Bogotá pasó del 0,5 % de los viajes en 1996 al 7,3 % en 2023 — <strong style={{ color: '#FFFFFF' }}>886.655 viajes diarios</strong>.
              </p>
            </div>
          </div>

          {/* Right Column - Target User */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '3rem' }}>
            <span style={{
              fontFamily: 'var(--font-space)',
              fontSize: '0.9rem',
              color: 'var(--primary)',
              fontWeight: 700,
              letterSpacing: '0.2em',
              marginBottom: '2rem',
              textTransform: 'uppercase'
            }}>
              USUARIO OBJETIVO
            </span>
            
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {[
                "Estudiantes universitarios y trabajadores urbanos",
                "Usuarios frecuentes de bicicleta",
                "Familiarizados con apps móviles",
                "Buscan seguridad, rapidez y tranquilidad"
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: '#E0E0E0' }}>
                  <span style={{ display: 'inline-flex', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- SLIDE 4: ¿QUÉ SIENTEN LOS USUARIOS? --- */}
      <div className={`section section-3 ${activeSlide === 3 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', maxWidth: '900px', zIndex: 10 }}>
          <span style={{
            fontFamily: 'var(--font-space)',
            fontSize: '0.9rem',
            color: 'var(--primary)',
            fontWeight: 700,
            letterSpacing: '0.25em',
            marginBottom: '2.5rem',
            textTransform: 'uppercase'
          }}>
            EMPATIZAR
          </span>

          <blockquote style={{
            fontFamily: 'var(--font-space)',
            fontSize: '2.4rem',
            fontWeight: 400,
            lineHeight: '1.4',
            color: '#FFFFFF',
            margin: '0 0 2.5rem 0',
            maxWidth: '850px'
          }}>
            *"El miedo a ser atacado o atracado es el factor negativo más mencionado por los ciclistas."*
          </blockquote>

          <div style={{
            width: '80px',
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            marginBottom: '2.5rem'
          }} />

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '1.05rem',
            color: '#8A8A8A'
          }}>
            <p>Señalado por el <strong style={{ color: 'var(--primary)' }}>56 %</strong> de los encuestados — Verma et al., 2015</p>
            <p>Los sistemas tradicionales (candados, cadenas) son fáciles de vulnerar</p>
            <p>No existe monitoreo constante ni rastreo efectivo</p>
          </div>
        </div>
      </div>

      {/* --- SLIDE 5: DEFINICIÓN DEL PROBLEMA --- */}
      <div className={`section section-4 ${activeSlide === 4 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', maxWidth: '950px', zIndex: 10 }}>
          <span style={{
            fontFamily: 'var(--font-space)',
            fontSize: '0.9rem',
            color: 'var(--primary)',
            fontWeight: 700,
            letterSpacing: '0.25em',
            marginBottom: '3rem',
            textTransform: 'uppercase'
          }}>
            DEFINICIÓN DEL PROBLEMA
          </span>

          <h2 style={{
            fontFamily: 'var(--font-space)',
            fontSize: '2.8rem',
            lineHeight: '1.4',
            color: '#FFFFFF',
            fontWeight: 400,
            margin: '0 0 4.5rem 0',
            maxWidth: '850px'
          }}>
            "Los ciclistas urbanos no cuentan con un sistema de parqueadero <span style={{ color: 'var(--primary)', borderBottom: '2px solid var(--primary)', paddingBottom: '4px' }}>verdaderamente seguro e inteligente</span> que les permita dejar su bicicleta con confianza."
          </h2>

          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            color: '#8A8A8A',
            lineHeight: '1.6'
          }}>
            <p>Bogotá tiene ~520.000 bicicletas registradas.</p>
            <p>La infraestructura de seguridad no ha evolucionado al mismo ritmo.</p>
          </div>
        </div>
      </div>

      {/* --- SLIDE 6: LA SOLUCIÓN: SMARTBIKE STATION --- */}
      <div className={`section section-5 ${activeSlide === 5 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '1100px', zIndex: 10 }}>
          <span style={{
            fontFamily: 'var(--font-space)',
            fontSize: '0.9rem',
            color: 'var(--primary)',
            fontWeight: 700,
            letterSpacing: '0.25em',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            LA SOLUCIÓN
          </span>

          <h2 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '6rem',
            color: '#FFFFFF',
            lineHeight: '1.1',
            marginBottom: '4rem',
            textAlign: 'center'
          }}>
            SMARTBIKE <span style={{ color: 'var(--primary)' }}>STATION</span>
          </h2>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {[
              { icon: <Smartphone size={40} color="var(--primary)" />, title: "App móvil + QR" },
              { icon: <Lock size={40} color="var(--primary)" />, title: "Bloqueo digital" },
              { icon: <Radio size={40} color="var(--primary)" />, title: "Monitoreo real-time" },
              { icon: <Sun size={40} color="var(--primary)" />, title: "Energía solar" }
            ].map((sol, idx) => (
              <div key={idx} style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '2rem 1rem',
                textAlign: 'center'
              }}>
                <div style={{ marginBottom: '1.2rem' }}>{sol.icon}</div>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '1.1rem', fontWeight: 500, color: '#E0E0E0' }}>{sol.title}</span>
              </div>
            ))}
          </div>

          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.1rem',
            color: '#A0A0A0',
            textAlign: 'center',
            lineHeight: '1.6'
          }}>
            <p>Estaciones inteligentes de parqueadero integradas al entorno urbano.</p>
            <p>Acceso rápido, automatizado y conectado directamente al celular del usuario.</p>
          </div>
        </div>
      </div>

      {/* --- SLIDE 7: ¿CÓMO FUNCIONA? --- */}
      <div className={`section section-6 ${activeSlide === 6 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '1150px', zIndex: 10 }}>
          <span style={{
            fontFamily: 'var(--font-space)',
            fontSize: '0.9rem',
            color: 'var(--primary)',
            fontWeight: 700,
            letterSpacing: '0.25em',
            marginBottom: '3.5rem',
            textTransform: 'uppercase'
          }}>
            ¿CÓMO FUNCIONA?
          </span>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: '1rem',
            position: 'relative'
          }}>
            {[
              "Escanear QR desde la app",
              "Desbloquear espacio disponible",
              "Estacionar la bicicleta",
              "Bloqueo digital automático",
              "Monitoreo y alertas en tiempo real"
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '1.5rem 1rem'
                }}>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    border: '2px solid var(--primary)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-space)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    marginBottom: '1.2rem',
                    boxShadow: '0 0 15px rgba(57, 255, 20, 0.2)'
                  }}>
                    {idx + 1}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: '#E0E0E0',
                    lineHeight: '1.4',
                    margin: 0
                  }}>
                    {step}
                  </p>
                </div>
                {idx < 4 && (
                  <ChevronRight size={24} color="var(--primary)" style={{ opacity: 0.7, marginTop: '-20px' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* --- SLIDE 8: MOCKUP DE LA APP --- */}
      <div className={`section section-7 ${activeSlide === 7 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ display: 'flex', width: '100%', maxWidth: '1100px', height: '100%', alignItems: 'center', gap: '3rem', zIndex: 10 }}>
          {/* Left Text Detail */}
          <div style={{ flex: '0 0 30%', display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-space)',
              fontSize: '0.85rem',
              color: 'var(--primary)',
              fontWeight: 700,
              letterSpacing: '0.2em',
              marginBottom: '1rem',
              textTransform: 'uppercase'
            }}>
              PROTOTIPO — INTERFAZ MÓVIL
            </span>
            
            <h3 style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '3.5rem',
              lineHeight: '1.1',
              color: '#FFFFFF',
              marginBottom: '2rem'
            }}>
              Control Total en tu Mano
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: '#CCCCCC',
              lineHeight: '1.5'
            }}>
              <p>• Inicio de sesión rápido</p>
              <p>• Mapa interactivo de estaciones</p>
              <p>• Reserva de espacios en segundos</p>
              <p>• Monitoreo de estado y alertas activas</p>
            </div>
          </div>

          {/* Right Image Space */}
          <div style={{
            flex: '1',
            height: '75vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
            border: '1px dashed rgba(255,255,255,0.1)',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img 
              src="/mockup-app.png" 
              alt="Mockup Interfaz Móvil" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '2rem'
              }}
            />
            <div style={{
              display: 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: '#8A8A8A',
              fontFamily: 'var(--font-sans)',
              padding: '2rem'
            }}>
              <Smartphone size={60} color="rgba(255,255,255,0.2)" style={{ marginBottom: '1rem' }} />
              <p style={{ fontSize: '1rem', color: '#E0E0E0' }}>[ Coloque su archivo mockup-app.png en la carpeta public/ ]</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Inicio de sesión · Mapa de estaciones · Reserva · Monitoreo · Alertas</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SLIDE 9: IMAGEN ESTACIÓN FÍSICA --- */}
      <div className={`section section-8 ${activeSlide === 8 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ display: 'flex', width: '100%', maxWidth: '1150px', height: '100%', alignItems: 'center', gap: '3rem', zIndex: 10 }}>
          {/* Left Large Image Space */}
          <div style={{
            flex: '1',
            height: '75vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
            border: '1px dashed rgba(255,255,255,0.1)',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img 
              src="/estacion-fisica.png" 
              alt="Mockup Estación Inteligente" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              display: 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: '#8A8A8A',
              fontFamily: 'var(--font-sans)',
              padding: '2rem'
            }}>
              <Compass size={60} color="rgba(255,255,255,0.2)" style={{ marginBottom: '1rem' }} />
              <p style={{ fontSize: '1rem', color: '#E0E0E0' }}>[ Coloque su archivo estacion-fisica.png en la carpeta public/ ]</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Imagen conceptual de la estación física urbana de SmartBike</p>
            </div>
          </div>

          {/* Right Text Overlay info */}
          <div style={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-space)',
              fontSize: '0.85rem',
              color: 'var(--primary)',
              fontWeight: 700,
              letterSpacing: '0.2em',
              marginBottom: '1rem',
              textTransform: 'uppercase'
            }}>
              PROTOTIPO — ESTACIÓN INTELIGENTE
            </span>
            
            <h3 style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '3.5rem',
              lineHeight: '1.1',
              color: '#FFFFFF',
              marginBottom: '2rem'
            }}>
              Infraestructura del Futuro
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              fontFamily: 'var(--font-sans)'
            }}>
              {[
                { title: "Energía solar 100 % sostenible", desc: "Autónomo y eco-amigable." },
                { title: "Bloqueo digital automático", desc: "Alta resistencia y anclaje físico." },
                { title: "Monitoreo 24/7", desc: "Conexión en la nube constante." },
                { title: "Sensores de movimiento y alarma", desc: "Disuasión activa e inmediata." },
                { title: "GPS y rastreo en tiempo real", desc: "Seguimiento seguro del módulo." }
              ].map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ color: '#E0E0E0', fontSize: '1.05rem', marginBottom: '0.2rem' }}>• {feat.title}</strong>
                  <span style={{ color: '#8A8A8A', fontSize: '0.9rem', paddingLeft: '1rem' }}>{feat.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- SLIDE 10: MODELO DE NEGOCIO --- */}
      <div className={`section section-9 ${activeSlide === 9 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '1100px', zIndex: 10 }}>
          <span style={{
            fontFamily: 'var(--font-space)',
            fontSize: '0.9rem',
            color: 'var(--primary)',
            fontWeight: 700,
            letterSpacing: '0.25em',
            marginBottom: '3rem',
            textTransform: 'uppercase'
          }}>
            MODELO DE NEGOCIO
          </span>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '3rem',
            width: '100%',
            marginBottom: '3.5rem'
          }}>
            {/* Block 1 - Users */}
            <div style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              border: '2px solid rgba(57, 255, 20, 0.3)',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              boxShadow: '0 8px 32px rgba(57, 255, 20, 0.05)'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-space)',
                fontSize: '1.6rem',
                color: 'var(--primary)',
                fontWeight: 650,
                marginBottom: '2rem',
                textTransform: 'uppercase'
              }}>
                Para Usuarios
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '1.15rem',
                color: '#E0E0E0'
              }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <ChevronRight size={18} color="var(--primary)" />
                  <span>Suscripción mensual para ciclistas frecuentes</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <ChevronRight size={18} color="var(--primary)" />
                  <span>Pago por uso para usuarios ocasionales</span>
                </li>
              </ul>
            </div>

            {/* Block 2 - Allies */}
            <div style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              border: '2px solid rgba(57, 255, 20, 0.3)',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              boxShadow: '0 8px 32px rgba(57, 255, 20, 0.05)'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-space)',
                fontSize: '1.6rem',
                color: 'var(--primary)',
                fontWeight: 650,
                marginBottom: '2rem',
                textTransform: 'uppercase'
              }}>
                Para Aliados
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '1.15rem',
                color: '#E0E0E0'
              }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <ChevronRight size={18} color="var(--primary)" />
                  <span>Universidades y Colegios</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <ChevronRight size={18} color="var(--primary)" />
                  <span>Empresas y Corporativos</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <ChevronRight size={18} color="var(--primary)" />
                  <span>Centros comerciales y Espacios públicos</span>
                </li>
              </ul>
            </div>
          </div>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.3rem',
            color: 'var(--primary)',
            fontWeight: 500,
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
            *"Una solución escalable adaptada a distintos entornos urbanos."*
          </p>
        </div>
      </div>

      {/* --- SLIDE 11: IMPACTO Y ALINEACIÓN CON LA CIUDAD --- */}
      <div className={`section section-10 ${activeSlide === 10 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '1000px', zIndex: 10 }}>
          <span style={{
            fontFamily: 'var(--font-space)',
            fontSize: '0.9rem',
            color: 'var(--primary)',
            fontWeight: 700,
            letterSpacing: '0.25em',
            marginBottom: '3rem',
            textTransform: 'uppercase'
          }}>
            IMPACTO Y ALINEACIÓN
          </span>

          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            gap: '3rem',
            marginBottom: '4.5rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-space)',
                fontSize: '6.5rem',
                fontWeight: 700,
                color: 'var(--primary)',
                lineHeight: '1',
                marginBottom: '1rem'
              }}>
                <CountUp key={activeSlide === 10 ? 'act-10' : 'inact-10'} end="-37.8" prefix="" suffix="%" decimal={true} triggerPulse={true} />
              </div>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.15rem',
                color: '#E0E0E0',
                maxWidth: '280px',
                margin: '0 auto',
                lineHeight: '1.5'
              }}>
                en hurto de bicicletas en los primeros meses de 2026 en Bogotá
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-space)',
                fontSize: '6.5rem',
                fontWeight: 700,
                color: 'var(--primary)',
                lineHeight: '1',
                marginBottom: '1rem'
              }}>
                <CountUp key={activeSlide === 10 ? 'act-10-b' : 'inact-10-b'} end="77" prefix="" suffix="%" decimal={false} triggerPulse={true} />
              </div>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.15rem',
                color: '#E0E0E0',
                maxWidth: '320px',
                margin: '0 auto',
                lineHeight: '1.5'
              }}>
                meta de viajes en modos sostenibles para 2035 — Plan de Movilidad Sostenible
              </p>
            </div>
          </div>

          <div style={{
            width: '60px',
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            marginBottom: '2.5rem'
          }} />

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.25rem',
            color: '#CCCCCC',
            textAlign: 'center',
            maxWidth: '750px',
            lineHeight: '1.6'
          }}>
            SmartBike Station contribuye activamente a esa meta, reduciendo el robo y promoviendo el transporte sostenible.
          </p>
        </div>
      </div>

      {/* --- SLIDE 12: CIERRE --- */}
      <div className={`section section-11 ${activeSlide === 11 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100%', zIndex: 10 }}>
          <h1 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '8.5rem',
            lineHeight: '0.9',
            color: 'var(--primary)',
            letterSpacing: '0.02em',
            margin: 0,
            textShadow: '0 0 40px rgba(57, 255, 20, 0.2)'
          }}>
            SMARTBIKE STATION
          </h1>
          
          <div style={{
            width: '180px',
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            margin: '2rem 0'
          }} />

          <p style={{
            fontFamily: 'var(--font-space)',
            fontSize: '1.6rem',
            color: '#FFFFFF',
            fontWeight: 400,
            fontStyle: 'italic',
            marginBottom: '4.5rem',
            letterSpacing: '0.02em'
          }}>
            *"Más seguridad. Más tecnología. Más movilidad sostenible."*
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            fontFamily: 'var(--font-sans)',
            color: '#8A8A8A',
            fontSize: '0.95rem'
          }}>
            <p style={{ color: '#CCCCCC', fontWeight: 500, fontSize: '1rem', marginBottom: '0.5rem' }}>Integrantes de Equipo</p>
            <p>Johan Alvarez · Tomas Valbuena · Juan Esteban Infante · Daniel Rodríguez · Manuela Canales</p>
          </div>
        </div>
      </div>
    </div>

      {/* Floating Control Toolbar */}
      <div
        className="interactive floating-toolbar"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(13, 13, 13, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(57, 255, 20, 0.2)',
          borderRadius: '40px',
          padding: '8px 16px',
          zIndex: 9999,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}
      >
        {/* Navigation Buttons */}
        <button
          onClick={prev}
          disabled={activeSlide === 0}
          style={{
            background: 'none',
            border: 'none',
            color: activeSlide === 0 ? '#444' : '#FFF',
            cursor: activeSlide === 0 ? 'not-allowed' : 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            transition: 'color 0.2s'
          }}
          title="Diapositiva Anterior"
        >
          <ChevronLeft size={20} />
        </button>

        <span style={{
          fontFamily: 'var(--font-space)',
          fontSize: '0.9rem',
          color: '#FFF',
          minWidth: '50px',
          textAlign: 'center',
          userSelect: 'none'
        }}>
          {activeSlide + 1} / {totalSlides}
        </span>

        <button
          onClick={next}
          disabled={activeSlide === totalSlides - 1}
          style={{
            background: 'none',
            border: 'none',
            color: activeSlide === totalSlides - 1 ? '#444' : '#FFF',
            cursor: activeSlide === totalSlides - 1 ? 'not-allowed' : 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            transition: 'color 0.2s'
          }}
          title="Diapositiva Siguiente"
        >
          <ChevronRight size={20} />
        </button>

        {/* Separator */}
        <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* Zoom Buttons */}
        <button
          onClick={() => setScale(prev => Math.max(0.2, prev - 0.1))}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFF',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Alejar (Zoom Out)"
        >
          <ZoomOut size={18} />
        </button>

        <button
          onClick={() => {
            // Auto fit calculation
            const targetRatio = 16 / 9;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const windowRatio = windowWidth / windowHeight;
            if (windowRatio > targetRatio) {
              setScale(windowHeight / 1080);
            } else {
              setScale(windowWidth / 1920);
            }
          }}
          style={{
            background: 'rgba(57, 255, 20, 0.1)',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            borderRadius: '12px',
            color: 'var(--primary)',
            fontFamily: 'var(--font-space)',
            fontSize: '0.75rem',
            padding: '4px 8px',
            cursor: 'pointer',
            fontWeight: 700
          }}
          title="Ajustar Pantalla (Auto)"
        >
          {Math.round(scale * 100)}%
        </button>

        <button
          onClick={() => setScale(prev => Math.min(2.5, prev + 0.1))}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFF',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Acercar (Zoom In)"
        >
          <ZoomIn size={18} />
        </button>
      </div>
    </div>
  );
}
