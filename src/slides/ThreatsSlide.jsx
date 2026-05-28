import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Wifi, AlertTriangle } from 'lucide-react';

export default function ThreatsSlide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', width: '100%', maxWidth: '1100px' }}>
      <div>
        <span style={{ 
          fontFamily: 'var(--font-space)', 
          fontSize: '0.8rem', 
          color: 'var(--primary-light)', 
          fontWeight: 700, 
          letterSpacing: '0.25em',
          display: 'block',
          textAlign: 'center',
          marginBottom: '0.5rem'
        }}>
          RISKS & CHALLENGES
        </span>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '5rem', color: '#FFFFFF', textAlign: 'center', lineHeight: '1' }}>
          THREATS
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '2.5rem', width: '100%' }}>
        <motion.div 
          initial={{ x: -60, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.7, ease: "easeOut" }} 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(192, 57, 43, 0.05)', 
            borderRadius: '20px', 
            padding: '3rem 2.5rem', 
            border: '1px solid rgba(192, 57, 43, 0.2)', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.2rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: 'rgba(192, 57, 43, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-light)'
            }}>
              <Lock size={28} />
            </div>
            <span style={{ backgroundColor: 'rgba(192, 57, 43, 0.2)', color: '#FFD1CD', fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.7rem', borderRadius: '6px', fontFamily: 'var(--font-space)' }}>
              SECURITY CRITICAL
            </span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.7rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.5rem' }}>
            Concerns about <br/>Data Privacy
          </h4>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.6' }}>
            Absolute user ownership of medical histories, paired with serverless local encryption (AES-256), fully answers user trust requirements.
          </p>
        </motion.div>

        <motion.div 
          initial={{ x: 60, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }} 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(192, 57, 43, 0.05)', 
            borderRadius: '20px', 
            padding: '3rem 2.5rem', 
            border: '1px solid rgba(192, 57, 43, 0.2)', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.2rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: 'rgba(192, 57, 43, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-light)'
            }}>
              <Wifi size={28} />
            </div>
            <span style={{ backgroundColor: 'rgba(192, 57, 43, 0.2)', color: '#FFD1CD', fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.7rem', borderRadius: '6px', fontFamily: 'var(--font-space)' }}>
              INFRASTRUCTURE
            </span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.7rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.5rem' }}>
            Low Connectivity in <br/>Rural Areas in Colombia
          </h4>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.6' }}>
            Built with zero-app offline-first fallback technology, allowing first responders to retrieve critical data even in completely remote territories.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
