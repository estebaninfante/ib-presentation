import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Smartphone,
  CreditCard,
  Zap,
  Activity,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  User,
  Wifi,
  MapPin,
  Lock
} from 'lucide-react';

/* CountUp Component */
const CountUp = ({ end, duration = 1200, prefix = "", suffix = "", decimal = false, triggerPulse = false }) => {
  const [value, setValue] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let start = 0;
    // Extract numeric float
    const numEnd = parseFloat(end.toString().replace(/[^0-9.]/g, ''));
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
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
  const [flashActive, setFlashActive] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const totalSlides = 8;

  // Slide navigation
  const next = () => {
    if (activeSlide < totalSlides - 1 && !isFadingOut) {
      setIsFadingOut(true);
      if (activeSlide === 3) {
        setFlashActive(true);
        setTimeout(() => setFlashActive(false), 150);
      }
      setTimeout(() => {
        setActiveSlide(prev => prev + 1);
        setIsFadingOut(false);
      }, 400);
    }
  };

  const prev = () => {
    if (activeSlide > 0 && !isFadingOut) {
      setIsFadingOut(true);
      setTimeout(() => {
        setActiveSlide(prev => prev - 1);
        setIsFadingOut(false);
      }, 400);
    }
  };

  // Click on screen halves to navigate
  const handleContainerClick = (e) => {
    if (e.target.closest('.interactive')) {
      return;
    }
    const width = window.innerWidth;
    const clickX = e.clientX;
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
  }, [activeSlide]);

  // Countdown timer logic
  useEffect(() => {
    if (activeSlide === 0) return;
    const timer = setInterval(() => {
      setTime(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeSlide > 0]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Particle list generator for background visuals
  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 25; i++) {
      const left = Math.random() * 100;
      const drift = -50 + Math.random() * 100;
      const duration = 12 + Math.random() * 15;
      const delay = Math.random() * -20;
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            left: `${left}%`,
            '--drift': `${drift}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return <div className="particles-container">{particles}</div>;
  };

  return (
    <div 
      className="presentation-container" 
      onClick={handleContainerClick}
    >
      {/* Global Background Particles */}
      {renderParticles()}

      {/* 10-Minute Countdown Timer */}
      <div className={`countdown-timer ${time === 0 ? 'pulse-red' : ''}`}>
        {formatTime(time)}
      </div>

      {/* Transition Flash Overlay */}
      <div className={`white-flash-overlay ${flashActive ? 'flash-active' : ''}`} />

      {/* --- SECTION 1: HERO / PORTADA --- */}
      <div
        className={`section section-0 ${activeSlide === 0 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}
      >
        <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', height: '100%', zIndex: 2 }}>
          {/* Centered Typography */}
          <div style={{ 
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: '16vh',
            position: 'relative',
            zIndex: 4
          }}>
            <h1 style={{ 
              fontFamily: 'var(--font-bebas)', 
              fontSize: '12rem', 
              lineHeight: '0.85',
              color: '#FFFFFF',
              display: 'flex',
              overflow: 'hidden',
              justifyContent: 'center'
            }}>
              {"I-SAFE".split("").map((letter, i) => (
                <span 
                  key={i} 
                  className="slide-up-fade"
                  style={{ 
                    display: 'inline-block',
                    animationDelay: `${i * 80}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>
            
            <div 
              className="slide-up-fade" 
              style={{ 
                width: '40px', 
                height: '2px', 
                backgroundColor: 'var(--primary)', 
                margin: '1.5rem 0',
                animationDelay: '800ms',
                animationFillMode: 'forwards'
              }} 
            />
            
            <p 
              className="slide-up-fade"
              style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '1.1rem', 
                color: 'var(--muted)',
                animationDelay: '1000ms',
                animationFillMode: 'forwards',
                fontWeight: 400
              }}
            >
              Smart Emergency Card
            </p>
            
            <p 
              className="slide-up-fade"
              style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '0.75rem', 
                color: 'var(--muted)', 
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                marginTop: '0.5rem',
                animationDelay: '1100ms',
                animationFillMode: 'forwards'
              }}
            >
              AMAXONICOS · 2025
            </p>
          </div>

          {/* 3D Card above title for depth effect */}
          <div style={{ 
            position: 'absolute',
            top: '3%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '68%',
            height: '58%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
            pointerEvents: 'none'
          }}>
            <div 
              className="slide-up-fade"
              style={{
                width: '100%',
                height: '100%',
                opacity: 0,
                animationDelay: '300ms',
                animationDuration: '1.4s',
                animationFillMode: 'forwards',
                filter: 'drop-shadow(0 22px 30px rgba(0, 0, 0, 0.35))'
              }}
            >
              <model-viewer
                src="/isafe-tarjeta.glb"
                auto-rotate
                auto-rotate-delay="0"
                rotation-per-second="8deg"
                orientation="-90deg 0deg 0deg"
                camera-orbit="30deg 58deg auto"
                environment-image="neutral"
                style={{ width: '100%', height: '100%' }}
                interaction-prompt="none"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator bouncing Chevron */}
        <div className={`scroll-indicator ${activeSlide > 0 ? 'fade-out' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      {/* --- SECTION 2: THE 6 VARIABLES --- */}
      <div
        className={`section section-1 ${activeSlide === 1 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}
      >
        <VariablesSlide isActive={activeSlide === 1} />
      </div>

      {/* --- SECTION 3: THE NEED --- */}
      <div className={`section section-2 ${activeSlide === 2 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ color: '#FFFFFF' }}>
          {/* ECG Background Layer */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.12, display: 'flex', alignItems: 'center' }}>
            <svg width="100%" height="200" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <path 
                className="ecg-line"
                d="M0,100 L200,100 L220,70 L240,130 L260,30 L280,170 L300,90 L320,110 L340,100 L550,100 L570,70 L590,130 L610,30 L630,170 L650,90 L670,110 L690,100 L1000,100" 
                fill="none" 
                stroke="#C0392B" 
                strokeWidth="4" 
              />
            </svg>
          </div>

          <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 2 }}>
            <span className="slide-up-fade" style={{ 
              fontFamily: 'var(--font-space)', 
              fontSize: '0.8rem', 
              color: 'var(--primary-light)', 
              fontWeight: 700, 
              letterSpacing: '0.25em',
              marginBottom: '1rem'
            }}>
              THE NEED
            </span>

            <h2 className="slide-up-fade" style={{ 
              fontFamily: 'var(--font-bebas)', 
              fontSize: '3.5rem', 
              lineHeight: '1.15', 
              animationDelay: '150ms',
              maxWidth: '680px'
            }}>
              "A growing number of Colombians face medical emergencies completely alone."
            </h2>

            <div className="slide-up-fade" style={{ width: '60px', height: '2px', backgroundColor: 'var(--primary)', margin: '2rem 0', animationDelay: '300ms' }} />

            {/* Three statistics */}
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '1.5rem', marginTop: '1.5rem' }}>
              {[
                { 
                  val: "30.5", 
                  prefix: "", 
                  suffix: "%", 
                  decimal: true, 
                  label: "Colombians in vulnerability" 
                },
                { 
                  val: "6", 
                  prefix: "", 
                  suffix: "/29", 
                  decimal: false, 
                  label: "EPS entities remain solvent" 
                },
                { 
                  val: "1", 
                  prefix: "", 
                  suffix: "", 
                  decimal: false, 
                  label: "Child. No ID. No contacts. No information." 
                }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="slide-up-fade"
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderLeft: idx > 0 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                    padding: '0 1rem',
                    animationDelay: `${400 + idx * 200}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-space)', fontSize: '4.2rem', fontWeight: 700, lineHeight: '1.1' }}>
                    <CountUp key={activeSlide === 2 ? 'act' : 'inact'} end={stat.val} prefix={stat.prefix} suffix={stat.suffix} decimal={stat.decimal} triggerPulse={true} />
                  </div>
                  
                  <span style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '0.85rem', 
                    color: 'var(--muted)', 
                    marginTop: '0.6rem',
                    maxWidth: '180px',
                    lineHeight: '1.3'
                  }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 4: OPPORTUNITIES & THREATS --- */}
      <div className={`section section-3 ${activeSlide === 3 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`} style={{ color: '#FFFFFF' }}>
        <OpportunitiesThreatsSlide isActive={activeSlide === 3} />
      </div>

      {/* --- SECTION 5: THE DEMO --- */}
      <div className={`section section-4 ${activeSlide === 4 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <DemoSlide isActive={activeSlide === 4} />
      </div>

      {/* --- SECTION 6: HOW IT WORKS --- */}
      <div className={`section section-5 ${activeSlide === 5 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <HowItWorksSlide isActive={activeSlide === 5} />
      </div>

      {/* --- SECTION 7: BUSINESS MODEL --- */}
      <div className={`section section-6 ${activeSlide === 6 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <BusinessModelSlide isActive={activeSlide === 6} />
      </div>

      {/* --- SECTION 8: THE ASK --- */}
      <div className={`section section-7 ${activeSlide === 7 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 2, gap: '1rem' }}>
          {/* Centered 3D Card with full spin */}
          <div style={{ width: '100%', height: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div 
              style={{
                width: '450px',
                height: '340px',
                animation: activeSlide === 7 ? 'smooth-appear-scale 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards' : 'none'
              }}
            >
              <model-viewer
                src="/isafe-tarjeta.glb"
                auto-rotate
                auto-rotate-delay="0"
                rotation-per-second="8deg"
                orientation="-90deg 0deg 0deg"
                camera-orbit="-20deg 58deg auto"
                environment-image="neutral"
                style={{ width: '100%', height: '100%' }}
                interaction-prompt="none"
              />
            </div>
          </div>

          {/* Typography Centered */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '850px' }}>
            <h2 style={{ 
              fontFamily: 'var(--font-bebas)', 
              fontSize: '5rem', 
              lineHeight: '1.05', 
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              marginBottom: '1rem'
            }}>
              <div className="slide-up-fade" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>IN AN EMERGENCY,</div>
              <div className="slide-up-fade" style={{ color: 'var(--primary-light)', animationDelay: '400ms', animationFillMode: 'forwards' }}>INFORMATION</div>
              <div className="slide-up-fade" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>SAVES LIVES.</div>
            </h2>

            <div className="slide-up-fade" style={{ width: '60px', height: '2px', backgroundColor: 'var(--primary)', margin: '1rem 0', animationDelay: '800ms' }} />

            <p className="slide-up-fade" style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '1.15rem', 
              color: 'rgba(255,255,255,0.7)',
              lineHeight: '1.5',
              maxWidth: '620px',
              animationDelay: '1000ms',
              animationFillMode: 'forwards'
            }}>
              "We are looking for a partner who believes, like we do, that information saves lives."
            </p>

            <span className="slide-up-fade" style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              marginTop: '2.5rem',
              animationDelay: '1200ms',
              animationFillMode: 'forwards'
            }}>
              AMAXONICOS · I-SAFE · 2025
            </span>
          </div>
        </div>
        
        <style>{`
          @keyframes smooth-appear-scale {
            0% {
              transform: scale(0.6);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

/* --- SUB-COMPONENT: VARIABLES SLIDE WITH AUTO 10-SEC SEQUENCE HIGHLIGHT --- */
function VariablesSlide({ isActive }) {
  const [highlightedCard, setHighlightedCard] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => {
      setHighlightedCard(prev => (prev + 1) % 6);
    }, 10000); // 10 seconds per variable
    return () => clearInterval(timer);
  }, [isActive]);

  const cards = [
    { label: "TARGET", watermark: "01", val: "The Only Child", ctx: "Households: 3.9 → 2.9 members in 1 year" },
    { label: "SDG 1", watermark: "02", val: "No Poverty", ctx: "30.5% of Colombians in vulnerability" },
    { label: "INDUSTRY", watermark: "03", val: "Healthcare", ctx: "Only 6 of 29 EPS entities remain solvent" },
    { label: "MATERIAL", watermark: "04", val: "Cardboard", ctx: "Absorbs 3.1x its weight, repels water" },
    { label: "UX", watermark: "05", val: "Only in Emergencies", ctx: "Zero prior training required, maximum stress design" },
    { label: "EMOTION", watermark: "06", val: "Inspiration", ctx: "In the worst moment, you are not alone" }
  ];

  return (
    <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <span className="slide-right-fade" style={{ 
          fontFamily: 'var(--font-space)', 
          fontSize: '0.8rem', 
          color: 'var(--primary-light)', 
          fontWeight: 700, 
          letterSpacing: '0.1em',
          display: 'block',
          marginBottom: '0.5rem'
        }}>
          THE 6 VARIABLES
        </span>
        
        <h2 className="slide-right-fade" style={{ 
          fontFamily: 'var(--font-bebas)', 
          fontSize: '4.5rem', 
          color: '#FFFFFF', 
          lineHeight: '1.0',
          animationDelay: '200ms'
        }}>
          "Every condition made our product inevitable"
        </h2>
      </div>

      <div className="grid-2x3">
        {cards.map((card, idx) => {
          const isHighlighted = idx === highlightedCard;
          return (
            <div 
              key={idx}
              className="interactive slide-up-fade"
              onClick={(e) => {
                e.stopPropagation();
                setHighlightedCard(idx);
              }}
              style={{
                background: isHighlighted 
                  ? 'linear-gradient(135deg, rgba(192, 57, 43, 0.25) 0%, rgba(26, 26, 26, 0.95) 100%)' 
                  : 'rgba(255, 255, 255, 0.06)',
                borderLeft: `4px solid ${isHighlighted ? 'var(--primary-light)' : 'var(--primary)'}`,
                borderTop: isHighlighted ? '1px solid rgba(231, 76, 60, 0.3)' : '1px solid transparent',
                borderRight: isHighlighted ? '1px solid rgba(231, 76, 60, 0.3)' : '1px solid transparent',
                borderBottom: isHighlighted ? '1px solid rgba(231, 76, 60, 0.3)' : '1px solid transparent',
                borderRadius: '12px',
                padding: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isHighlighted 
                  ? '0 15px 35px rgba(192, 57, 43, 0.45), inset 0 0 12px rgba(231, 76, 60, 0.25)' 
                  : '0 4px 20px rgba(0,0,0,0.15)',
                transform: isHighlighted ? 'scale(1.08) translateY(-8px)' : 'scale(0.93) translateY(0)',
                opacity: isHighlighted ? 1 : 0.45,
                filter: isHighlighted ? 'none' : 'grayscale(0.15)',
                transition: 'all 500ms cubic-bezier(0.25, 1, 0.5, 1)',
                animationDelay: `${300 + idx * 80}ms`,
                animationFillMode: 'forwards',
                cursor: 'pointer'
              }}
            >
              <span style={{
                position: 'absolute',
                top: '0.2rem',
                right: '1rem',
                fontFamily: 'var(--font-bebas)',
                fontSize: '6rem',
                color: isHighlighted ? 'rgba(231, 76, 60, 0.22)' : 'rgba(255, 255, 255, 0.02)',
                lineHeight: '1',
                pointerEvents: 'none',
                transition: 'color 500ms ease',
                animation: 'watermark-breathe 4s infinite ease-in-out'
              }}>
                {card.watermark}
              </span>

              <span style={{ 
                fontFamily: 'var(--font-space)', 
                fontSize: '0.75rem', 
                color: isHighlighted ? 'var(--primary-light)' : 'rgba(255,255,255,0.4)', 
                fontWeight: 700,
                transition: 'color 500ms ease'
              }}>
                {card.label}
              </span>
              
              <h3 style={{ 
                fontFamily: 'var(--font-bebas)', 
                fontSize: '1.6rem', 
                color: '#FFFFFF', 
                margin: '0.4rem 0 0.2rem 0',
                textShadow: isHighlighted ? '0 0 10px rgba(255,255,255,0.2)' : 'none'
              }}>
                {card.val}
              </h3>
              
              <p style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '0.9rem', 
                color: isHighlighted ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)',
                transition: 'color 500ms ease'
              }}>
                {card.ctx}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --- SUB-COMPONENT: DEMO SLIDE WITH ADVANCED NFC PHYSICAL SCAN --- */
function DemoSlide({ isActive }) {
  const [activeStep, setActiveStep] = useState(0);
  const isScanPose = activeStep === 1;

  useEffect(() => {
    if (!isActive) {
      setActiveStep(0);
      return;
    }
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1000px', height: '100%', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        
        {/* Left Side: 3D Model Card */}
        <div style={{ 
          width: '45%', 
          height: '75%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          transform: isScanPose
            ? 'translateX(140px)'
            : 'translateX(0)',
          transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
        }}>
          <model-viewer
            src="/isafe-tarjeta.glb"
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="8deg"
            orientation="-90deg 0deg 0deg"
            camera-orbit="0deg 58deg auto"
            environment-image="neutral"
            style={{ width: '100%', height: '100%' }}
            interaction-prompt="none"
          />
        </div>

        {/* Right Side: iPhone Phone Mockup */}
        <div style={{ 
          width: '45%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          transform: isScanPose
            ? 'translateX(-140px) rotateZ(-12deg)'
            : 'translateX(0) rotateZ(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
        }}>
          {/* Sleeker iPhone SVG Mock Frame */}
          <div style={{ 
            position: 'relative', 
            width: '280px', 
            height: '490px', 
            borderRadius: '36px', 
            border: '10px solid #1A1A1A', 
            backgroundColor: '#F8F9FA',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 4
          }}>
            {/* Speaker/Camera notch */}
            <div style={{ 
              width: '100px', 
              height: '22px', 
              backgroundColor: '#1A1A1A', 
              borderRadius: '0 0 14px 14px', 
              position: 'absolute', 
              top: 0, 
              left: '50%', 
              transform: 'translateX(-50%)',
              zIndex: 100
            }} />

            {/* Notification bar area */}
            <div style={{ height: '35px', width: '100%' }} />

            {/* Screen Content */}
            <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #ECEFF1', paddingBottom: '0.5rem' }}>
                <Activity size={18} color="var(--primary)" />
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.05em' }}>EMERGENCY INFO</span>
              </div>

              {activeStep >= 2 ? (
                <>
                  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase' }}>Patient</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)' }}>Natalia Castelblanco</span>
                  </div>

                  <div className="fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF0EE', padding: '0.5rem', borderRadius: '6px', borderLeft: '3px solid var(--primary)', animationDelay: '200ms' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--dark)' }}>Blood Type</span>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)' }}>O+</span>
                  </div>

                  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', animationDelay: '400ms' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderBottom: '1px dashed #E0E0E0', paddingBottom: '0.2rem' }}>
                      <span style={{ color: '#555555' }}>Allergies:</span>
                      <span style={{ fontWeight: 600, color: '#C0392B' }}>No known allergies</span>
                    </div>
                  </div>

                  {activeStep >= 3 && (
                    <>
                      <div className="fade-in" style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.4rem', 
                        backgroundColor: '#E8F5E9', 
                        color: '#2E7D32',
                        padding: '0.4rem',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: 700
                      }}>
                        <CheckCircle size={12} />
                        <span>Emergency contact notified</span>
                      </div>

                      <div className="fade-in" style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.4rem', 
                        backgroundColor: '#FFEBEE', 
                        color: '#C62828',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        animation: 'mini-pulse 1.2s infinite'
                      }}>
                        <MapPin size={14} />
                        <span>GPS location sent automatically</span>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', color: 'var(--muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                  <span>Waiting for scan...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes mini-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}

/* --- SUB-COMPONENT: HOW IT WORKS (Slide index 5) --- */
function HowItWorksSlide({ isActive }) {
  const [lineActive, setLineActive] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setLineActive(false);
      setActiveIcon(-1);
      return;
    }
    setLineActive(true);

    const runLoop = () => {
      // 0s to 3.75s (0% to 15%): Icon 1 active
      setActiveIcon(0);

      const t1 = setTimeout(() => {
        setActiveIcon(-1); // traveling to Icon 2 (3.75s to 10s)
      }, 3750);

      const t2 = setTimeout(() => {
        setActiveIcon(1); // Icon 2 active (10s to 13.75s)
      }, 10000);

      const t3 = setTimeout(() => {
        setActiveIcon(-1); // traveling to Icon 3 (13.75s to 20s)
      }, 13750);

      const t4 = setTimeout(() => {
        setActiveIcon(2); // Icon 3 active (20s to 23.75s)
      }, 20000);

      const t5 = setTimeout(() => {
        setActiveIcon(-1); // resetting
      }, 23750);

      return [t1, t2, t3, t4, t5];
    };

    let timers = runLoop();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = runLoop();
    }, 25000); // 25 seconds loop

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [isActive]);

  const steps = [
    { icon: <Smartphone size={32} />, title: "Set Up Once", desc: "Medical info, emergency contacts, allergies, all the important information." },
    { icon: <CreditCard size={32} />, title: "Carry It Always", desc: "Wallet, phone, easy to carry." },
    { icon: <Zap size={32} />, title: "Scan In Seconds", desc: "No app. No login. Instant emergency info + GPS alert." }
  ];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '3.5rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <span className="slide-up-fade" style={{ 
            fontFamily: 'var(--font-space)', 
            fontSize: '0.8rem', 
            color: 'var(--primary-light)', 
            fontWeight: 700, 
            letterSpacing: '0.25em',
            display: 'block',
            marginBottom: '0.5rem'
          }}>
            SIMPLE METHOD
          </span>
          
          <h2 className="slide-up-fade" style={{ 
            fontFamily: 'var(--font-bebas)', 
            fontSize: '4.5rem', 
            color: '#FFFFFF', 
            lineHeight: '1.0',
            animationDelay: '150ms'
          }}>
            How It Works
          </h2>
        </div>

        <div style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'space-between', padding: '0 2rem' }}>
          {/* Horizontal Track Line */}
          <div style={{
            position: 'absolute',
            top: '32px',
            left: '8%',
            right: '8%',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            zIndex: 1
          }} />

          {/* Glowing Red Dot */}
          {lineActive && (
            <div style={{ position: 'absolute', top: '27px', left: '8%', width: '84%', height: '12px', zIndex: 3, pointerEvents: 'none' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 0 14px 4px var(--primary-light), 0 0 4px #FFFFFF',
                animation: 'dot-travel-paused 25s infinite linear'
              }} />
            </div>
          )}

          {steps.map((step, index) => {
            const isGlow = activeIcon === index;
            return (
              <div 
                key={index}
                className="slide-up-fade"
                style={{
                  width: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  zIndex: 4,
                  animationDelay: `${300 + index * 200}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: isGlow ? 'rgba(231, 76, 60, 0.22)' : 'rgba(255, 255, 255, 0.08)',
                  color: isGlow ? '#FFFFFF' : 'var(--primary-light)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: isGlow ? '2.5px solid var(--primary-light)' : '2px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '1.2rem',
                  transform: isGlow ? 'scale(1.18)' : 'scale(1)',
                  boxShadow: isGlow ? '0 0 25px rgba(231, 76, 60, 0.6), inset 0 0 10px rgba(231, 76, 60, 0.3)' : 'none',
                  transition: 'all 500ms cubic-bezier(0.25, 1, 0.5, 1)'
                }}>
                  {step.icon}
                </div>

                <h3 style={{ 
                  fontFamily: 'var(--font-bebas)', 
                  fontSize: '1.6rem', 
                  color: '#FFFFFF', 
                  marginBottom: '0.4rem',
                  textShadow: isGlow ? '0 0 10px rgba(255,255,255,0.2)' : 'none',
                  transition: 'text-shadow 500ms ease'
                }}>
                  {step.title}
                </h3>
                
                <p style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '0.9rem', 
                  color: isGlow ? '#FFFFFF' : 'rgba(255,255,255,0.7)', 
                  lineHeight: '1.4',
                  transition: 'color 500ms ease'
                }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes dot-travel-paused {
          0%, 15% {
            left: 0%;
            transform: translateX(0);
          }
          40%, 55% {
            left: 50%;
            transform: translateX(-50%);
          }
          80%, 95% {
            left: 100%;
            transform: translateX(-100%);
          }
          100% {
            left: 0%;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

/* --- SUB-COMPONENT: BUSINESS MODEL (Slide index 6) --- */
function BusinessModelSlide({ isActive }) {
  const [activeGraphs, setActiveGraphs] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setActiveGraphs(false);
      return;
    }
    const timer = setTimeout(() => {
      setActiveGraphs(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '4rem', width: '100%' }}>
          <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <h2 className="slide-right-fade" style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              BUSINESS MODEL
            </h2>

            <div className="slide-up-fade" style={{ 
              backgroundColor: '#252525', 
              borderLeft: '4px solid var(--primary)', 
              borderRadius: '12px', 
              padding: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              animationDelay: '100ms',
              animationFillMode: 'forwards'
            }}>
              <span style={{
                position: 'absolute',
                top: '1.2rem',
                right: '1.2rem',
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                fontSize: '0.7rem',
                fontWeight: 700,
                fontFamily: 'var(--font-space)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px'
              }}>
                B2B: $15.000/u
              </span>

              <span style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-space)' }}>
                $20.000 COP
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--muted)' }}>
                per card · final consumer
              </span>
            </div>

            <div className="slide-up-fade" style={{ 
              backgroundColor: 'var(--primary)', 
              borderRadius: '12px', 
              padding: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              animationDelay: '250ms',
              animationFillMode: 'forwards'
            }}>
              <div>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-space)' }}>
                  $15.000 COP <span style={{ fontSize: '1rem', fontWeight: 400 }}>/ mes</span>
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                  premium subscription
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginTop: '0.2rem' }}>
                {[
                  "Real-time GPS alert",
                  "Vital signs monitoring",
                  "Fall & seizure detection",
                  "Unlimited updates"
                ].map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#FFFFFF' }}>
                    <CheckCircle size={14} color="#FFFFFF" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.8rem', color: 'var(--primary-light)', fontWeight: 700 }}>
              BREAK-EVEN ANALYSIS
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { label: "Fixed Costs", value: "$22.550.000 COP", width: "100%", color: "#4A4A4A" },
                { label: "Break-even without subs", value: "644 cards", width: "85%", color: "#FFFFFF" },
                { label: "Break-even with subs", value: "558 cards", width: "70%", color: "var(--primary)" }
              ].map((bar, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>{bar.label}</span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-space)' }}>{bar.value}</span>
                  </div>
                  
                  <div style={{ width: '100%', height: '14px', backgroundColor: '#222222', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: activeGraphs ? bar.width : '0%', 
                      height: '100%', 
                      backgroundColor: bar.color, 
                      borderRadius: '4px',
                      transition: 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <p style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '0.85rem', 
              color: 'var(--primary-light)', 
              fontStyle: 'italic', 
              marginTop: '0.5rem',
              fontWeight: 500
            }}>
              "One clinic partnership covers ⅓ of break-even in month 1"
            </p>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          width: '100%', 
          justifyContent: 'space-between', 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '1.5rem',
          marginTop: '0.5rem'
        }}>
          {[
            { val: "100", prefix: "$", suffix: "M COP", label: "Initial investment" },
            { val: "4", prefix: "", suffix: "+ months", label: "Runway" },
            { val: "30", prefix: "$", suffix: "M COP", label: "App development (one-time)" }
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="slide-up-fade"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderLeft: idx > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                animationDelay: `${400 + idx * 150}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '2.5rem', fontWeight: 700 }}>
                <CountUp key={isActive ? 'bm-act' : 'bm-inact'} end={stat.val} prefix={stat.prefix} suffix={stat.suffix} triggerPulse={true} />
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- SUB-COMPONENT: OPPORTUNITIES & THREATS (MINIMALIST SEQUENCED DASHBOARD) --- */
function OpportunitiesThreatsSlide({ isActive }) {
  const [subStep, setSubStep] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setSubStep(0);
      return;
    }
    const t1 = setTimeout(() => setSubStep(1), 1000);
    const t2 = setTimeout(() => setSubStep(2), 2000);
    const t3 = setTimeout(() => setSubStep(3), 3200);
    const t4 = setTimeout(() => setSubStep(4), 4400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isActive]);

  const titleStyle = {
    transition: 'all 800ms cubic-bezier(0.25, 1, 0.5, 1)',
    fontFamily: 'var(--font-bebas)',
    color: '#FFFFFF',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    margin: '0 auto',
    ...(subStep === 0
      ? {
          transform: 'translateY(180px) scale(1.6)',
          fontSize: '4.5rem',
        }
      : {
          transform: 'translateY(0) scale(1)',
          fontSize: '3rem',
        }),
  };

  const opp1Style = {
    transition: 'all 800ms cubic-bezier(0.25, 1, 0.5, 1)',
    backgroundColor: 'rgba(39, 174, 96, 0.08)',
    borderRadius: '16px',
    padding: '1.4rem',
    border: '1px solid rgba(39,174,96,0.25)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    opacity: subStep >= 2 ? 1 : 0,
    transform: subStep >= 2 ? 'translateX(0) scale(1)' : 'translateX(80px) scale(0.95)',
    pointerEvents: subStep >= 2 ? 'auto' : 'none'
  };

  const opp2Style = {
    transition: 'all 800ms cubic-bezier(0.25, 1, 0.5, 1)',
    backgroundColor: 'rgba(39, 174, 96, 0.08)',
    borderRadius: '16px',
    padding: '1.4rem',
    border: '1px solid rgba(39,174,96,0.25)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    opacity: subStep >= 3 ? 1 : 0,
    transform: subStep >= 3 ? 'translateX(0) scale(1)' : 'translateX(80px) scale(0.95)',
    pointerEvents: subStep >= 3 ? 'auto' : 'none'
  };

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '1100px', 
      height: '620px',
      position: 'relative',
      overflow: 'hidden',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem'
    }}>
      {/* Title */}
      <h2 style={titleStyle}>OPPORTUNITIES & THREATS</h2>

      {/* Grid of Opportunities */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        width: '100%',
        height: '200px',
        position: 'relative',
        opacity: subStep >= 2 ? 1 : 0,
        transition: 'opacity 600ms ease-out'
      }}>
        {/* Opportunity 1 */}
        <div style={opp1Style}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.72rem', color: 'var(--green)', fontWeight: 700, letterSpacing: '0.05em' }}>
              OPPORTUNITY 01
            </span>
            <span style={{ backgroundColor: 'rgba(39, 174, 96, 0.2)', color: '#D6FFE7', fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '5px', fontFamily: 'var(--font-space)' }}>
              HIGH URGENCY
            </span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.4rem' }}>
            Urban Loneliness & Isolation
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
            Families seek immediate ways to identify and care for loved ones during medical emergencies.
          </p>
        </div>

        {/* Opportunity 2 */}
        <div style={opp2Style}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.72rem', color: 'var(--green)', fontWeight: 700, letterSpacing: '0.05em' }}>
              OPPORTUNITY 02
            </span>
            <span style={{ backgroundColor: 'rgba(39, 174, 96, 0.2)', color: '#D6FFE7', fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '5px', fontFamily: 'var(--font-space)' }}>
              READY TO SCALE
            </span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.4rem' }}>
            Mass NFC Adoption
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
            Native scanning with zero app installations reduces user friction to absolute zero.
          </p>
        </div>
      </div>

      {/* Threats Section */}
      <div style={{
        opacity: subStep >= 4 ? 1 : 0,
        transform: subStep >= 4 ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 800ms cubic-bezier(0.25, 1, 0.5, 1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        pointerEvents: subStep >= 4 ? 'auto' : 'none',
        marginTop: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
          <AlertTriangle size={18} color="var(--primary-light)" />
          <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-light)', letterSpacing: '0.1em' }}>
            THREATS & MITIGATIONS
          </span>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', width: '100%' }}>
          {/* Threat 1 */}
          <div style={{
            flex: 1,
            backgroundColor: 'rgba(192, 57, 43, 0.08)',
            borderRadius: '12px',
            border: '1px solid rgba(192, 57, 43, 0.25)',
            padding: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem',
            position: 'relative'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(192, 57, 43, 0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-light)',
              animation: 'threat-glow-pulse 2s infinite alternate',
              flexShrink: 0
            }}>
              <Lock size={22} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <h5 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
                Data Privacy
              </h5>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.3' }}>
                AES-256 local database encryption and absolute user ownership of sensitive data.
              </p>
            </div>
          </div>

          {/* Threat 2 */}
          <div style={{
            flex: 1,
            backgroundColor: 'rgba(192, 57, 43, 0.08)',
            borderRadius: '12px',
            border: '1px solid rgba(192, 57, 43, 0.25)',
            padding: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem',
            position: 'relative'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(192, 57, 43, 0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-light)',
              animation: 'threat-glow-pulse 2s infinite alternate',
              flexShrink: 0
            }}>
              <Smartphone size={22} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <h5 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
                Digital Divide
              </h5>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.3' }}>
                Zero apps needed for paramedics. Native NFC scan works on any smartphone.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes threat-glow-pulse {
          0% { box-shadow: 0 0 0px rgba(192, 57, 43, 0); }
          100% { box-shadow: 0 0 12px rgba(192, 57, 43, 0.6); }
        }
      `}</style>
    </div>
  );
}
