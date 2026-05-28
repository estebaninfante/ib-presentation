import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';

export default function OpportunitiesSlide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', width: '100%', maxWidth: '1100px' }}>
      <div>
        <span style={{ 
          fontFamily: 'var(--font-space)', 
          fontSize: '0.8rem', 
          color: 'var(--green)', 
          fontWeight: 700, 
          letterSpacing: '0.25em',
          display: 'block',
          textAlign: 'center',
          marginBottom: '0.5rem'
        }}>
          MARKET POTENTIAL
        </span>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '5rem', color: '#FFFFFF', textAlign: 'center', lineHeight: '1' }}>
          OPPORTUNITIES
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '2.5rem', width: '100%' }}>
        <motion.div 
          initial={{ x: -60, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.7, ease: "easeOut" }} 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(39, 174, 96, 0.06)', 
            borderRadius: '20px', 
            padding: '3rem 2.5rem', 
            border: '1px solid rgba(39, 174, 96, 0.2)', 
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
              backgroundColor: 'rgba(39, 174, 96, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--green)'
            }}>
              <TrendingUp size={28} />
            </div>
            <span style={{ backgroundColor: 'rgba(39, 174, 96, 0.2)', color: '#D6FFE7', fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.7rem', borderRadius: '6px', fontFamily: 'var(--font-space)' }}>
              DEMOGRAPHIC SHIFT
            </span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.7rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.5rem' }}>
            Population Aging & <br/>Urban Loneliness
          </h4>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.6' }}>
            The rapid inversion of the demographic pyramid coupled with single-person urban households creates an urgent necessity for personal medical safety solutions.
          </p>
        </motion.div>

        <motion.div 
          initial={{ x: 60, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }} 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(39, 174, 96, 0.06)', 
            borderRadius: '20px', 
            padding: '3rem 2.5rem', 
            border: '1px solid rgba(39, 174, 96, 0.2)', 
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
              backgroundColor: 'rgba(39, 174, 96, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--green)'
            }}>
              <Sparkles size={28} />
            </div>
            <span style={{ backgroundColor: 'rgba(39, 174, 96, 0.2)', color: '#D6FFE7', fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.7rem', borderRadius: '6px', fontFamily: 'var(--font-space)' }}>
              TECH ADOPTION
            </span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.7rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.5rem' }}>
            Mass Adoption of <br/>NFC Technology
          </h4>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.6' }}>
            Universal presence of NFC chips in consumer devices enables native, frictionless interactions without requiring application installs.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
