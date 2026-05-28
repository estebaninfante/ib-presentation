import React, { useState, useEffect } from 'react';
import {
  Target, Globe, Activity, Package, Smartphone, Heart,
  Shield, AlertTriangle, TrendingUp, CheckCircle, User, Wifi, MapPin, Lock,
  CreditCard, Zap, Users
} from 'lucide-react';
import VariableSingleSlide from './slides/VariableSingleSlide';
import HookSlide from './slides/HookSlide';
import OpportunitiesSlide from './slides/OpportunitiesSlide';
import ThreatsSlide from './slides/ThreatsSlide';
import BusinessModelPlansSlide from './slides/BusinessModelPlansSlide';
import BusinessModelSubSlide from './slides/BusinessModelSubSlide';
import FinancialAskSlide from './slides/FinancialAskSlide';

/* CountUp Component */
const CountUp = ({ end, duration = 1200, prefix = "", suffix = "", decimal = false, triggerPulse = false }) => {
  const [value, setValue] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let start = 0;
    const numEnd = parseFloat(end.toString().replace(/[^0-9.]/g, ''));
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
  const [flashActive, setFlashActive] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Slides structure:
  // Slide 0: Hero / Portada (I-SAFE title + 3D Card)
  // Slide 1: Hook (diapositiva intermedia)
  // Slide 2: Variable 1 (Target)
  // Slide 3: Variable 2 (SDG 1)
  // Slide 4: Variable 3 (Industry)
  // Slide 5: Variable 4 (Material)
  // Slide 6: Variable 5 (UX)
  // Slide 7: Variable 6 (Emotion)
  // Slide 8: The Need (statistics and EPS, vulnerability data) - POSITIONED AFTER VARIABLES
  // Slide 9: Opportunities
  // Slide 10: Threats
  // Slide 11: Demo Scan
  // Slide 12: How It Works
  // Slide 13: Business Model vertical cards
  // Slide 14: Business Model subscription details (expanded morph)
  // Slide 15: Financial Proposal (Shark Tank Investment, Cost, Equity)
  // Slide 16: Ask / Conclusion ("IN AN EMERGENCY...")
  const totalSlides = 17;

  // Slide navigation
  const next = () => {
    if (activeSlide < totalSlides - 1 && !isFadingOut) {
      setIsFadingOut(true);
      // Flash at transition before demo scan (moved from slide 10 to slide 10 since slide index changed)
      if (activeSlide === 10) {
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

      {/* --- SLIDE 0: HERO / PORTADA --- */}
      <div className={`section section-0 ${activeSlide === 0 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', height: '100%', zIndex: 2 }}>
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

        <div className={`scroll-indicator ${activeSlide > 0 ? 'fade-out' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      {/* --- SLIDE 1: HOOK INTERMEDIO --- */}
      <div className={`section section-1 ${activeSlide === 1 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <HookSlide />
      </div>

      {/* --- CAROUSEL SLIDES 2-7: THE 6 VARIABLES SCANNING ONE BY ONE --- */}
      {[0,1,2,3,4,5].map((idx) => {
  const slideIndex = 2 + idx;
  const isCurrent = activeSlide === slideIndex;

  return (
    <div
      key={idx}
      className={`section section-${slideIndex} ${isCurrent ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}
      style={{
        transition: 'opacity 500ms ease, transform 500ms ease, filter 500ms ease',
        transform: isCurrent
          ? 'translateX(0px) scale(1)'
          : activeSlide > slideIndex
            ? 'translateX(-100vw) scale(0.9)'
            : 'translateX(100vw) scale(0.9)',
        opacity: isCurrent ? 1 : 0,
        filter: isCurrent ? 'blur(0)' : 'blur(5px)',
        pointerEvents: isCurrent ? 'auto' : 'none'
      }}
    >
      <VariableSingleSlide index={idx} />
    </div>
  );
})}

      {/* --- SLIDE 8: THE NEED (MOVED AFTER THE VARIABLES DECK) --- */}
      <div className={`section section-8 ${activeSlide === 8 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ color: '#FFFFFF', width: '100%', display: 'flex', justifyContent: 'center' }}>
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

            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '1.5rem', marginTop: '1.5rem' }}>
              {[
                { val: "30.5", prefix: "", suffix: "%", decimal: true, label: "Colombians in vulnerability" },
                { val: "6", prefix: "", suffix: "/29", decimal: false, label: "EPS entities remain solvent" },
                { val: "1", prefix: "", suffix: "", decimal: false, label: "Child. No ID. No contacts. No information." }
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
                    <CountUp key={activeSlide === 8 ? 'act' : 'inact'} end={stat.val} prefix={stat.prefix} suffix={stat.suffix} decimal={stat.decimal} triggerPulse={true} />
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

      {/* --- SLIDE 9: OPPORTUNITIES --- */}
      <div className={`section section-9 ${activeSlide === 9 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <OpportunitiesSlide />
      </div>

      {/* --- SLIDE 10: THREATS --- */}
      <div className={`section section-10 ${activeSlide === 10 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <ThreatsSlide />
      </div>

      {/* --- SLIDE 11: DEMO SCAN --- */}
      <div className={`section section-11 ${activeSlide === 11 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <DemoSlide isActive={activeSlide === 11} />
      </div>

      {/* --- SLIDE 12: HOW IT WORKS --- */}
      <div className={`section section-12 ${activeSlide === 12 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <HowItWorksSlide isActive={activeSlide === 12} />
      </div>

      {/* --- SLIDE 13: BUSINESS MODEL PLANS --- */}
      <div className={`section section-13 ${activeSlide === 13 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <BusinessModelPlansSlide isActive={activeSlide === 13} />
      </div>

      {/* --- SLIDE 14: BUSINESS MODEL DETAILS (SUBSCRIPTION MORPH) --- */}
      <div className={`section section-14 ${activeSlide === 14 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <BusinessModelSubSlide />
      </div>

      {/* --- SLIDE 15: FINANCIAL ASK SLIDE (PROPOSAL SHARK TANK) --- */}
      <div className={`section section-15 ${activeSlide === 15 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <FinancialAskSlide />
      </div>

      {/* --- SLIDE 16: CONCLUSION / THE ASK --- */}
      <div className={`section section-16 ${activeSlide === 16 ? 'active' : ''} ${isFadingOut ? 'fading-out' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 2, gap: '1rem' }}>

          <div style={{ width: '100%', height: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                width: '450px',
                height: '340px',
                animation: activeSlide === 16 ? 'smooth-appear-scale 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards' : 'none'
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

/* --- SUB-COMPONENT: HOW IT WORKS --- */
function HowItWorksSlide({ isActive }) {
  const [activeIcon, setActiveIcon] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setActiveIcon(0);
      return;
    }
    const timer = setInterval(() => {
      setActiveIcon(prev => (prev + 1) % 3);
    }, 10000); // 10 seconds glow loop
    return () => clearInterval(timer);
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

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 2rem', gap: '2rem' }}>
          {steps.map((step, index) => {
            const isGlow = activeIcon === index;
            return (
              <div
                key={index}
                className="slide-up-fade"
                style={{
                  width: '280px',
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
    </div>
  );
}
