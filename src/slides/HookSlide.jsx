import React from 'react';
import { motion } from 'framer-motion';

export default function HookSlide() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url("src/assets/emergency-alone.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Dark overlay for text contrast */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        zIndex: 1
      }} />

      <div style={{
        zIndex: 2,
        textAlign: 'center',
        maxWidth: '1000px',
        padding: '0 2rem'
      }}>
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-space)',
            fontSize: '1rem',
            color: 'var(--primary-light)',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1.5rem'
          }}
        >
          The Impact
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '5.5rem',
            lineHeight: '1.15',
            color: '#FFFFFF'
          }}
        >
          Every day in Colombia, <br/> people face medical emergencies <span className="text-red-highlight" style={{
            color: 'var(--primary-light)',
            textShadow: '0 0 30px rgba(231, 76, 60, 0.8)',
            fontWeight: 'bold'
          }}>ALONE</span>
        </motion.h2>
      </div>
    </div>
  );
}
