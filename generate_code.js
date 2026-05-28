const fs = require('fs');
const path = require('path');

const appJsxContent = `import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Smartphone, CreditCard, Zap, Activity, AlertTriangle,
  TrendingUp, CheckCircle, User, Wifi, MapPin, Lock, Heart, Target, Globe, Package
} from 'lucide-react';

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
  const [time, setTime] = useState(600);
  const [flashActive, setFlashActive] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [direction, setDirection] = useState(1);

  const totalSlides = 16;

  const next = () => {
    if (activeSlide < totalSlides - 1 && !isFadingOut) {
      setDirection(1);
      if (activeSlide === 7 || activeSlide === 10) {
        setFlashActive(true);
        setTimeout(() => setFlashActive(false), 150);
      }
      setActiveSlide(prev => prev + 1);
    }
  };

  const prev = () => {
    if (activeSlide > 0 && !isFadingOut) {
      setDirection(-1);
      setActiveSlide(prev => prev - 1);
    }
  };

  const handleContainerClick = (e) => {
    if (e.target.closest('.interactive')) return;
    const width = window.innerWidth;
    const clickX = e.clientX;
    if (clickX > width / 2) {
      next();
    } else {
      prev();
    }
  };

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

  useEffect(() => {
    if (activeSlide === 0) return;
    const timer = setInterval(() => {
      setTime(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
  };

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
            left: \`\${left}%\`,
            '--drift': \`\${drift}px\`,
            animationDuration: \`\${duration}s\`,
            animationDelay: \`\${delay}s\`
          }}
        />
      );
    }
    return <div className="particles-container">{particles}</div>;
  };

  return (
    <div className="presentation-container" onClick={handleContainerClick}>
      {renderParticles()}
      <div className={\`countdown-timer \${time === 0 ? 'pulse-red' : ''}\`}>
        {formatTime(time)}
      </div>
      <div className={\`white-flash-overlay \${flashActive ? 'flash-active' : ''}\`} />

      <AnimatePresence initial={false} custom={direction}>
        {/* SLIDE 0: HERO */}
        {activeSlide === 0 && (
          <SlideWrapper key="slide-0" direction={direction}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', height: '100%', zIndex: 2 }}>
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '16vh', position: 'relative', zIndex: 4 }}>
                <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: '12rem', lineHeight: '0.85', color: '#FFFFFF', display: 'flex', overflow: 'hidden', justifyContent: 'center' }}>
                  {"I-SAFE".split("").map((letter, i) => (
                    <span key={i} className="slide-up-fade" style={{ display: 'inline-block', animationDelay: \`\${i * 80}ms\`, animationFillMode: 'forwards' }}>
                      {letter}
                    </span>
                  ))}
                </h1>
                <div className="slide-up-fade" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary)', margin: '1.5rem 0', animationDelay: '800ms', animationFillMode: 'forwards' }} />
                <p className="slide-up-fade" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'var(--muted)', animationDelay: '1000ms', animationFillMode: 'forwards', fontWeight: 400 }}>Smart Emergency Card</p>
                <p className="slide-up-fade" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '0.5rem', animationDelay: '1100ms', animationFillMode: 'forwards' }}>AMAXONICOS · 2025</p>
              </div>
              <div style={{ position: 'absolute', top: '3%', left: '50%', transform: 'translateX(-50%)', width: '68%', height: '58%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2, pointerEvents: 'none' }}>
                <div className="slide-up-fade" style={{ width: '100%', height: '100%', opacity: 0, animationDelay: '300ms', animationDuration: '1.4s', animationFillMode: 'forwards', filter: 'drop-shadow(0 22px 30px rgba(0, 0, 0, 0.35))' }}>
                  <model-viewer src="/isafe-tarjeta.glb" auto-rotate auto-rotate-delay="0" rotation-per-second="8deg" orientation="-90deg 0deg 0deg" camera-orbit="30deg 58deg auto" environment-image="neutral" style={{ width: '100%', height: '100%' }} interaction-prompt="none" />
                </div>
              </div>
            </div>
          </SlideWrapper>
        )}

        {/* SLIDE 1: HOOK */}
        {activeSlide === 1 && (
          <SlideWrapper key="slide-1" direction={direction}>
            <div className="hook-bg" />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 0 }} />
            <div style={{ zIndex: 2, textAlign: 'center', maxWidth: '1000px', padding: '0 2rem' }}>
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ fontFamily: 'var(--font-bebas)', fontSize: '6rem', lineHeight: '1.1', color: '#FFFFFF' }}
              >
                Every day in Colombia, <br/> people face medical emergencies <span className="text-red-highlight">ALONE</span>
              </motion.h2>
            </div>
          </SlideWrapper>
        )}

        {/* SLIDES 2-7: VARIABLES CAROUSEL */}
        {[2,3,4,5,6,7].includes(activeSlide) && (
          <SlideWrapper key={\`slide-\${activeSlide}\`} direction={direction}>
            <VariableSingleSlide index={activeSlide - 2} />
          </SlideWrapper>
        )}

        {/* SLIDE 8: THE NEED */}
        {activeSlide === 8 && (
          <SlideWrapper key="slide-8" direction={direction}>
            <div style={{ color: '#FFFFFF', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.12, display: 'flex', alignItems: 'center' }}>
                <svg width="100%" height="200" viewBox="0 0 1000 200" preserveAspectRatio="none">
                  <path className="ecg-line" d="M0,100 L200,100 L220,70 L240,130 L260,30 L280,170 L300,90 L320,110 L340,100 L550,100 L570,70 L590,130 L610,30 L630,170 L650,90 L670,110 L690,100 L1000,100" fill="none" stroke="#C0392B" strokeWidth="4" />
                </svg>
              </div>
              <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 2 }}>
                <span className="slide-up-fade" style={{ fontFamily: 'var(--font-space)', fontSize: '0.8rem', color: 'var(--primary-light)', fontWeight: 700, letterSpacing: '0.25em', marginBottom: '1rem' }}>THE NEED</span>
                <h2 className="slide-up-fade" style={{ fontFamily: 'var(--font-bebas)', fontSize: '3.5rem', lineHeight: '1.15', animationDelay: '150ms', maxWidth: '680px' }}>
                  "A growing number of Colombians face medical emergencies completely alone."
                </h2>
                <div className="slide-up-fade" style={{ width: '60px', height: '2px', backgroundColor: 'var(--primary)', margin: '2rem 0', animationDelay: '300ms' }} />
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '1.5rem', marginTop: '1.5rem' }}>
                  {[
                    { val: "30.5", prefix: "", suffix: "%", decimal: true, label: "Colombians in vulnerability" },
                    { val: "6", prefix: "", suffix: "/29", decimal: false, label: "EPS entities remain solvent" },
                    { val: "1", prefix: "", suffix: "", decimal: false, label: "Child. No ID. No contacts. No information." }
                  ].map((stat, idx) => (
                    <div key={idx} className="slide-up-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', borderLeft: idx > 0 ? '1px solid rgba(255,255,255,0.15)' : 'none', padding: '0 1rem', animationDelay: \`\${400 + idx * 200}ms\`, animationFillMode: 'forwards' }}>
                      <div style={{ fontFamily: 'var(--font-space)', fontSize: '4.2rem', fontWeight: 700, lineHeight: '1.1' }}>
                        <CountUp end={stat.val} prefix={stat.prefix} suffix={stat.suffix} decimal={stat.decimal} triggerPulse={true} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.6rem', maxWidth: '180px', lineHeight: '1.3' }}>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SlideWrapper>
        )}

        {/* SLIDE 9: OPPORTUNITIES */}
        {activeSlide === 9 && (
          <SlideWrapper key="slide-9" direction={direction}>
            <OpportunitiesSlide />
          </SlideWrapper>
        )}

        {/* SLIDE 10: THREATS */}
        {activeSlide === 10 && (
          <SlideWrapper key="slide-10" direction={direction}>
            <ThreatsSlide />
          </SlideWrapper>
        )}

        {/* SLIDE 11: DEMO */}
        {activeSlide === 11 && (
          <SlideWrapper key="slide-11" direction={direction}>
            <DemoSlide isActive={true} />
          </SlideWrapper>
        )}

        {/* SLIDE 12: HOW IT WORKS */}
        {activeSlide === 12 && (
          <SlideWrapper key="slide-12" direction={direction}>
            <HowItWorksSlide isActive={true} />
          </SlideWrapper>
        )}

        {/* SLIDE 13: BUSINESS MODEL PLANS */}
        {activeSlide === 13 && (
          <SlideWrapper key="slide-13" direction={direction}>
            <BusinessModelPlansSlide />
          </SlideWrapper>
        )}

        {/* SLIDE 14: BUSINESS MODEL SUBSCRIPTION MORPH */}
        {activeSlide === 14 && (
          <SlideWrapper key="slide-14" direction={direction}>
            <BusinessModelSubSlide />
          </SlideWrapper>
        )}

        {/* SLIDE 15: THE ASK / FINANCIALS */}
        {activeSlide === 15 && (
          <SlideWrapper key="slide-15" direction={direction}>
            <FinancialAskSlide />
          </SlideWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Framer Motion Wrapper for Slides */
const SlideWrapper = ({ children, direction }) => {
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 }
      }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '4rem'
      }}
    >
      {children}
    </motion.div>
  );
};

/* --- SLIDES COMPONENTS --- */

function VariableSingleSlide({ index }) {
  const variablesData = [
    { icon: <Target size={100} color="var(--primary)" />, label: "TARGET", watermark: "01", val: "The Only Child", ctx: "Households: 3.9 → 2.9 members in 1 year" },
    { icon: <Globe size={100} color="var(--primary)" />, label: "SDG 1", watermark: "02", val: "No Poverty", ctx: "30.5% of Colombians in vulnerability" },
    { icon: <Activity size={100} color="var(--primary)" />, label: "INDUSTRY", watermark: "03", val: "Healthcare", ctx: "Only 6 of 29 EPS entities remain solvent" },
    { icon: <Package size={100} color="var(--primary)" />, label: "MATERIAL", watermark: "04", val: "Cardboard", ctx: "Absorbs 3.1x its weight, repels water" },
    { icon: <Smartphone size={100} color="var(--primary)" />, label: "UX", watermark: "05", val: "Only in Emergencies", ctx: "Zero prior training required, maximum stress design" },
    { icon: <Heart size={100} color="var(--primary)" />, label: "EMOTION", watermark: "06", val: "Inspiration", ctx: "In the worst moment, you are not alone" }
  ];

  const card = variablesData[index];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px' }}>
      <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '15rem', color: 'rgba(255, 255, 255, 0.03)', position: 'absolute', zIndex: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
        {card.watermark}
      </span>
      <div style={{ zIndex: 2, backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '50%', marginBottom: '2rem', border: '1px solid rgba(192, 57, 43, 0.3)', boxShadow: '0 0 30px rgba(192, 57, 43, 0.2)' }}>
        {card.icon}
      </div>
      <span style={{ fontFamily: 'var(--font-space)', fontSize: '1.2rem', color: 'var(--primary-light)', fontWeight: 700, letterSpacing: '0.15em', zIndex: 2 }}>
        VARIABLE {card.watermark}: {card.label}
      </span>
      <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '6rem', color: '#FFFFFF', margin: '1rem 0', zIndex: 2, lineHeight: '1' }}>
        {card.val}
      </h2>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', color: 'rgba(255,255,255,0.7)', zIndex: 2 }}>
        {card.ctx}
      </p>
    </div>
  );
}

function OpportunitiesSlide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', width: '100%', maxWidth: '1100px' }}>
      <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '4.5rem', color: '#FFFFFF' }}>OPPORTUNITIES</h2>
      <div style={{ display: 'flex', gap: '2rem', width: '100%' }}>
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ flex: 1, backgroundColor: 'rgba(39, 174, 96, 0.08)', borderRadius: '16px', padding: '2.5rem', border: '1px solid rgba(39,174,96,0.25)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.9rem', color: 'var(--green)', fontWeight: 700, letterSpacing: '0.05em' }}>OPPORTUNITY 01</span>
            <span style={{ backgroundColor: 'rgba(39, 174, 96, 0.2)', color: '#D6FFE7', fontSize: '0.8rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '5px' }}>HIGH URGENCY</span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.8rem', fontWeight: 700, color: '#FFFFFF' }}>Urban Loneliness & Isolation</h4>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>Families seek immediate ways to identify and care for loved ones during medical emergencies.</p>
        </motion.div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} style={{ flex: 1, backgroundColor: 'rgba(39, 174, 96, 0.08)', borderRadius: '16px', padding: '2.5rem', border: '1px solid rgba(39,174,96,0.25)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.9rem', color: 'var(--green)', fontWeight: 700, letterSpacing: '0.05em' }}>OPPORTUNITY 02</span>
            <span style={{ backgroundColor: 'rgba(39, 174, 96, 0.2)', color: '#D6FFE7', fontSize: '0.8rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '5px' }}>READY TO SCALE</span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.8rem', fontWeight: 700, color: '#FFFFFF' }}>Mass NFC Adoption</h4>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>Native scanning with zero app installations reduces user friction to absolute zero.</p>
        </motion.div>
      </div>
    </div>
  );
}

function ThreatsSlide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', width: '100%', maxWidth: '1100px' }}>
      <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '4.5rem', color: '#FFFFFF' }}>THREATS & MITIGATIONS</h2>
      <div style={{ display: 'flex', gap: '2rem', width: '100%' }}>
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ flex: 1, backgroundColor: 'rgba(192, 57, 43, 0.08)', borderRadius: '16px', border: '1px solid rgba(192, 57, 43, 0.25)', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(192, 57, 43, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-light)' }}>
            <Lock size={40} />
          </div>
          <h5 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.8rem', fontWeight: 700, color: '#FFFFFF' }}>Data Privacy Concerns</h5>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>AES-256 local database encryption and absolute user ownership of sensitive data mitigates leaks.</p>
        </motion.div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} style={{ flex: 1, backgroundColor: 'rgba(192, 57, 43, 0.08)', borderRadius: '16px', border: '1px solid rgba(192, 57, 43, 0.25)', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(192, 57, 43, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-light)' }}>
            <Wifi size={40} />
          </div>
          <h5 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.8rem', fontWeight: 700, color: '#FFFFFF' }}>Low Connectivity in Rural Areas</h5>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>Zero apps needed for paramedics. Native NFC scan works offline to show basic medical data instantly.</p>
        </motion.div>
      </div>
    </div>
  );
}

function BusinessModelPlansSlide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%', maxWidth: '1200px' }}>
      <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '4.5rem', color: '#FFFFFF' }}>BUSINESS MODEL</h2>
      <div style={{ display: 'flex', gap: '2rem', width: '100%', justifyContent: 'center' }}>
        
        {/* Card 1 */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={{ flex: 1, maxWidth: '320px', backgroundColor: '#1A1A1A', borderRadius: '16px', padding: '2rem', borderTop: '4px solid #4A4A4A', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-space)', fontSize: '1rem', color: 'var(--muted)', fontWeight: 700, marginBottom: '1rem' }}>THE CARD</span>
          <span style={{ fontFamily: 'var(--font-space)', fontSize: '2.5rem', fontWeight: 700, color: '#FFFFFF' }}>$20.000 <span style={{fontSize:'1rem'}}>COP</span></span>
          <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>per unit / final consumer</span>
          <div style={{ marginTop: '2rem', width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}/>
          <ul style={{ marginTop: '1.5rem', textAlign: 'left', width: '100%', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
            <li>✓ Basic medical profile</li>
            <li>✓ NFC tag included</li>
            <li>✓ 1 Emergency contact</li>
          </ul>
        </motion.div>

        {/* Card 2 */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} style={{ flex: 1, maxWidth: '320px', backgroundColor: '#252525', borderRadius: '16px', padding: '2rem', borderTop: '4px solid var(--primary-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transform: 'scale(1.05)', zIndex: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <span style={{ fontFamily: 'var(--font-space)', fontSize: '1rem', color: 'var(--primary-light)', fontWeight: 700, marginBottom: '1rem' }}>B2B PARTNERS</span>
          <span style={{ fontFamily: 'var(--font-space)', fontSize: '2.5rem', fontWeight: 700, color: '#FFFFFF' }}>$15.000 <span style={{fontSize:'1rem'}}>COP</span></span>
          <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>wholesale volume</span>
          <div style={{ marginTop: '2rem', width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}/>
          <ul style={{ marginTop: '1.5rem', textAlign: 'left', width: '100%', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
            <li>✓ Co-branding available</li>
            <li>✓ Clinic partnerships</li>
            <li>✓ Mass distribution</li>
          </ul>
        </motion.div>

        {/* Card 3 - Morph Target */}
        <motion.div layoutId="subscription-card" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} style={{ flex: 1, maxWidth: '320px', backgroundColor: 'var(--primary)', borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-space)', fontSize: '1rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '1rem', opacity: 0.9 }}>PREMIUM</span>
          <span style={{ fontFamily: 'var(--font-space)', fontSize: '2.5rem', fontWeight: 700, color: '#FFFFFF' }}>$15.000 <span style={{fontSize:'1rem'}}>/ mo</span></span>
          <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>subscription model</span>
          <div style={{ marginTop: '2rem', width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }}/>
          <ul style={{ marginTop: '1.5rem', textAlign: 'left', width: '100%', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: '#FFFFFF' }}>
            <li>✓ Real-time GPS alerts</li>
            <li>✓ Advanced monitoring</li>
            <li><br/><span style={{fontStyle:'italic', opacity:0.8}}>Press right for details →</span></li>
          </ul>
        </motion.div>

      </div>
    </div>
  );
}

function BusinessModelSubSlide() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <motion.div layoutId="subscription-card" style={{ width: '100%', maxWidth: '900px', backgroundColor: 'var(--primary)', borderRadius: '24px', padding: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem', color: '#FFFFFF', boxShadow: '0 25px 50px rgba(192,57,43,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '1rem' }}>
          <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '4rem', margin: 0, lineHeight: 1 }}>PREMIUM SUBSCRIPTION</h3>
          <span style={{ fontFamily: 'var(--font-space)', fontSize: '2rem', fontWeight: 700 }}>$15.000 <span style={{fontSize:'1rem'}}>/ mo</span></span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <User size={32} />
            <div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 700 }}>Per Account, Not Per Card</h4>
              <p style={{ fontSize: '0.95rem', opacity: 0.8, marginTop: '0.4rem' }}>One subscription covers up to 5 family members independently of their physical cards.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Activity size={32} />
            <div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 700 }}>IoT & Smartwatch Integration</h4>
              <p style={{ fontSize: '0.95rem', opacity: 0.8, marginTop: '0.4rem' }}>Connects with Apple Watch and Garmin to monitor vitals and detect falls automatically.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <MapPin size={32} />
            <div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 700 }}>Location & Sensors</h4>
              <p style={{ fontSize: '0.95rem', opacity: 0.8, marginTop: '0.4rem' }}>Advanced tracking capabilities and emergency sensor triggers.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Shield size={32} />
            <div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 700 }}>Personalized Attention</h4>
              <p style={{ fontSize: '0.95rem', opacity: 0.8, marginTop: '0.4rem' }}>Direct line to our emergency support center in case of needing immediate help.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FinancialAskSlide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
      <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '4.5rem', color: '#FFFFFF', marginBottom: '-1rem' }}>THE PROPOSAL</h2>
      
      <div style={{ display: 'flex', width: '100%', maxWidth: '1000px', justifyContent: 'space-between', backgroundColor: '#1A1A1A', borderRadius: '16px', padding: '3rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        {[
          { val: "100", prefix: "$", suffix: "M COP", label: "Initial investment" },
          { val: "4", prefix: "", suffix: "+ months", label: "Runway" },
          { val: "30", prefix: "$", suffix: "M COP", label: "App development (one-time)" }
        ].map((stat, idx) => (
          <div key={idx} className="slide-up-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', borderLeft: idx > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none', animationDelay: \`\${200 + idx * 150}ms\`, animationFillMode: 'forwards' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '3.5rem', fontWeight: 700, color: 'var(--primary)' }}>
              <CountUp end={stat.val} prefix={stat.prefix} suffix={stat.suffix} triggerPulse={true} />
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '850px', marginTop: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '5rem', lineHeight: '1.05', color: '#FFFFFF', letterSpacing: '0.02em', marginBottom: '1rem' }}>
          <div className="slide-up-fade" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>IN AN EMERGENCY,</div>
          <div className="slide-up-fade" style={{ color: 'var(--primary-light)', animationDelay: '1000ms', animationFillMode: 'forwards' }}>INFORMATION</div>
          <div className="slide-up-fade" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>SAVES LIVES.</div>
        </h2>
        <div className="slide-up-fade" style={{ width: '60px', height: '2px', backgroundColor: 'var(--primary)', margin: '1rem 0', animationDelay: '1400ms' }} />
        <p className="slide-up-fade" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', maxWidth: '620px', animationDelay: '1600ms', animationFillMode: 'forwards' }}>
          "We are looking for a partner who believes, like we do, that information saves lives."
        </p>
      </div>
    </div>
  );
}

/* Include DemoSlide & HowItWorksSlide directly below to avoid missing code */
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
        <div style={{ width: '45%', height: '75%', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: isScanPose ? 'translateX(140px)' : 'translateX(0)', transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' }}>
          <model-viewer src="/isafe-tarjeta.glb" auto-rotate auto-rotate-delay="0" rotation-per-second="8deg" orientation="-90deg 0deg 0deg" camera-orbit="0deg 58deg auto" environment-image="neutral" style={{ width: '100%', height: '100%' }} interaction-prompt="none" />
        </div>
        <div style={{ width: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: isScanPose ? 'translateX(-140px) rotateZ(-12deg)' : 'translateX(0) rotateZ(0deg)', transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' }}>
          <div style={{ position: 'relative', width: '280px', height: '490px', borderRadius: '36px', border: '10px solid #1A1A1A', backgroundColor: '#F8F9FA', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column', zIndex: 4 }}>
            <div style={{ width: '100px', height: '22px', backgroundColor: '#1A1A1A', borderRadius: '0 0 14px 14px', position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 100 }} />
            <div style={{ height: '35px', width: '100%' }} />
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
                      <div className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#E8F5E9', color: '#2E7D32', padding: '0.4rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700 }}>
                        <CheckCircle size={12} /><span>Emergency contact notified</span>
                      </div>
                      <div className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#FFEBEE', color: '#C62828', padding: '0.5rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700, animation: 'mini-pulse 1.2s infinite' }}>
                        <MapPin size={14} /><span>GPS location sent automatically</span>
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
    </div>
  );
}

function HowItWorksSlide({ isActive }) {
  const [lineActive, setLineActive] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setLineActive(false); setActiveIcon(-1); return;
    }
    setLineActive(true);
    const runLoop = () => {
      setActiveIcon(0);
      const t1 = setTimeout(() => setActiveIcon(-1), 3750);
      const t2 = setTimeout(() => setActiveIcon(1), 10000);
      const t3 = setTimeout(() => setActiveIcon(-1), 13750);
      const t4 = setTimeout(() => setActiveIcon(2), 20000);
      const t5 = setTimeout(() => setActiveIcon(-1), 23750);
      return [t1, t2, t3, t4, t5];
    };
    let timers = runLoop();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = runLoop();
    }, 25000);
    return () => { clearInterval(interval); timers.forEach(clearTimeout); };
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
          <span className="slide-up-fade" style={{ fontFamily: 'var(--font-space)', fontSize: '0.8rem', color: 'var(--primary-light)', fontWeight: 700, letterSpacing: '0.25em', display: 'block', marginBottom: '0.5rem' }}>SIMPLE METHOD</span>
          <h2 className="slide-up-fade" style={{ fontFamily: 'var(--font-bebas)', fontSize: '4.5rem', color: '#FFFFFF', lineHeight: '1.0', animationDelay: '150ms' }}>How It Works</h2>
        </div>
        <div style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'space-between', padding: '0 2rem' }}>
          <div style={{ position: 'absolute', top: '32px', left: '8%', right: '8%', height: '2px', backgroundColor: 'rgba(255, 255, 255, 0.15)', zIndex: 1 }} />
          {lineActive && (
            <div style={{ position: 'absolute', top: '27px', left: '8%', width: '84%', height: '12px', zIndex: 3, pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: 0, width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFFFFF', boxShadow: '0 0 14px 4px var(--primary-light), 0 0 4px #FFFFFF', animation: 'dot-travel-paused 25s infinite linear' }} />
            </div>
          )}
          {steps.map((step, index) => {
            const isGlow = activeIcon === index;
            return (
              <div key={index} className="slide-up-fade" style={{ width: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 4, animationDelay: \`\${300 + index * 200}ms\`, animationFillMode: 'forwards' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: isGlow ? 'rgba(231, 76, 60, 0.22)' : 'rgba(255, 255, 255, 0.08)', color: isGlow ? '#FFFFFF' : 'var(--primary-light)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: isGlow ? '2.5px solid var(--primary-light)' : '2px solid rgba(255, 255, 255, 0.1)', marginBottom: '1.2rem', transform: isGlow ? 'scale(1.18)' : 'scale(1)', boxShadow: isGlow ? '0 0 25px rgba(231, 76, 60, 0.6), inset 0 0 10px rgba(231, 76, 60, 0.3)' : 'none', transition: 'all 500ms cubic-bezier(0.25, 1, 0.5, 1)' }}>
                  {step.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '0.4rem', textShadow: isGlow ? '0 0 10px rgba(255,255,255,0.2)' : 'none', transition: 'text-shadow 500ms ease' }}>{step.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: isGlow ? '#FFFFFF' : 'rgba(255,255,255,0.7)', lineHeight: '1.4', transition: 'color 500ms ease' }}>{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
\`;

fs.writeFileSync(path.join(__dirname, 'src', 'App.jsx'), appJsxContent, 'utf-8');

// Also update index.css
const cssAdditions = \`
/* --- HOOK SLIDE BACKGROUND --- */
.hook-bg {
  position: absolute;
  inset: 0;
  background-image: url('./assets/emergency-alone.jpeg');
  background-size: cover;
  background-position: center;
  z-index: -1;
  filter: brightness(0.3) saturate(1.2);
}

.text-red-highlight {
  color: var(--primary);
  text-shadow: 0 0 20px rgba(192, 57, 43, 0.6);
  font-weight: 700;
}
\`;

fs.appendFileSync(path.join(__dirname, 'src', 'index.css'), cssAdditions, 'utf-8');
console.log("Files written successfully.");
