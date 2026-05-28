import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BusinessModelPlansSlide({ isActive }) {
  const [highlightedCard, setHighlightedCard] = useState(-1);

  // Play highlight sequence only when slide becomes active and transition finishes (quieta)
  useEffect(() => {
    if (!isActive) {
      setHighlightedCard(-1);
      return;
    }

    // Begin sequence after 500ms (so slide has stopped moving)
    const initDelay = setTimeout(() => {
      // 0s to 4s: highlight Card 0 (The Card)
      setHighlightedCard(0);

      const t1 = setTimeout(() => {
        // 4s to 8s: highlight Card 1 (B2B)
        setHighlightedCard(1);
      }, 4000);

      const t2 = setTimeout(() => {
        // 8s to 12s: highlight Card 2 (Subscription)
        setHighlightedCard(2);
      }, 8000);

      const t3 = setTimeout(() => {
        // After 12s: clear highlight (all normal)
        setHighlightedCard(-1);
      }, 12000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }, 500);

    return () => clearTimeout(initDelay);
  }, [isActive]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', width: '100%', maxWidth: '1200px' }}>
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
          PRICING DECK & ON-DEMAND MODEL
        </span>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '5rem', color: '#FFFFFF', textAlign: 'center', lineHeight: '1' }}>
          PLANS & SUBSCRIPTION
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '2.5rem', width: '100%', justifyContent: 'center', alignItems: 'stretch', height: '420px' }}>
        
        {/* Card 1: La Tarjeta */}
        <motion.div 
          onClick={() => setHighlightedCard(0)}
          animate={{
            scale: highlightedCard === 0 ? 1.05 : 0.95,
            opacity: highlightedCard === -1 ? 0.9 : highlightedCard === 0 ? 1 : 0.4,
            borderColor: highlightedCard === 0 ? 'var(--muted)' : 'rgba(255,255,255,0.06)',
            boxShadow: highlightedCard === 0 ? '0 20px 40px rgba(255,255,255,0.08)' : '0 10px 20px rgba(0,0,0,0.2)'
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ 
            flex: 1, 
            maxWidth: '350px', 
            backgroundColor: '#161616', 
            borderRadius: '24px', 
            padding: '2rem 1.8rem', 
            border: '1px solid',
            borderTop: '5px solid #5A5A5A', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            position: 'relative',
            cursor: 'pointer'
          }}
        >
          <div style={{ textAlign: 'center', width: '100%' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.1em', display: 'block', marginBottom: '1rem' }}>THE CARD</span>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF', display: 'block' }}>
              $20,000 <span style={{fontSize:'1rem', fontWeight:400, color:'rgba(255,255,255,0.6)'}}>COP</span>
            </span>
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.3rem', display: 'block' }}>On-Demand Production · Retail</span>
            
            <div style={{ margin: '1.5rem 0 1.2rem 0', width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}/>
            
            <ul style={{ textAlign: 'left', width: '100%', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary-light)' }}>✓</span> Basic digital medical profile</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary-light)' }}>✓</span> Waterproof physical NFC card</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary-light)' }}>✓</span> 1 Emergency contact setup</li>
            </ul>
          </div>
        </motion.div>

        {/* Card 2: B2B Partners */}
        <motion.div 
          onClick={() => setHighlightedCard(1)}
          animate={{
            scale: highlightedCard === 1 ? 1.05 : 0.95,
            opacity: highlightedCard === -1 ? 0.9 : highlightedCard === 1 ? 1 : 0.4,
            borderColor: highlightedCard === 1 ? 'var(--primary-light)' : 'rgba(255,255,255,0.06)',
            boxShadow: highlightedCard === 1 ? '0 25px 45px rgba(231, 76, 60, 0.15)' : '0 10px 20px rgba(0,0,0,0.2)'
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ 
            flex: 1, 
            maxWidth: '350px', 
            backgroundColor: '#1E1E1E', 
            borderRadius: '24px', 
            padding: '2rem 1.8rem', 
            border: '1px solid',
            borderTop: '5px solid var(--primary-light)', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            zIndex: 2,
            position: 'relative',
            cursor: 'pointer'
          }}
        >
          <div style={{ textAlign: 'center', width: '100%' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.85rem', color: 'var(--primary-light)', fontWeight: 700, letterSpacing: '0.1em', display: 'block', marginBottom: '1rem' }}>B2B PARTNERS</span>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF', display: 'block' }}>
              $15,000 <span style={{fontSize:'1rem', fontWeight:400, color:'rgba(255,255,255,0.6)'}}>COP</span>
            </span>
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.3rem', display: 'block' }}>On-Demand Production · B2B</span>
            
            <div style={{ margin: '1.5rem 0 1.2rem 0', width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}/>
            
            <ul style={{ textAlign: 'left', width: '100%', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary-light)' }}>✓</span> Clinical and EPS partnerships</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary-light)' }}>✓</span> Corporate custom co-branding</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary-light)' }}>✓</span> Zero inventory cost model</li>
            </ul>
          </div>
        </motion.div>

        {/* Card 3: Premium Subscription */}
        <motion.div 
          layoutId="subscription-card-layout"
          onClick={() => setHighlightedCard(2)}
          animate={{
            scale: highlightedCard === 2 ? 1.05 : 0.95,
            opacity: highlightedCard === -1 ? 0.9 : highlightedCard === 2 ? 1 : 0.4,
            boxShadow: highlightedCard === 2 ? '0 30px 60px rgba(192,57,43,0.45)' : '0 10px 20px rgba(0,0,0,0.2)'
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ 
            flex: 1, 
            maxWidth: '350px', 
            backgroundColor: 'var(--primary)', 
            borderRadius: '24px', 
            padding: '2rem 1.8rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            position: 'relative',
            color: '#FFFFFF',
            cursor: 'pointer'
          }}
        >
          <div style={{ textAlign: 'center', width: '100%' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 700, letterSpacing: '0.1em', display: 'block', marginBottom: '1rem', opacity: 0.9 }}>PREMIUM</span>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF', display: 'block' }}>
              $15,000 <span style={{fontSize:'1rem', fontWeight:400, color:'rgba(255,255,255,0.8)'}}>/ mo</span>
            </span>
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.3rem', display: 'block' }}>Monthly Recurring Subscription</span>
            
            <div style={{ margin: '1.5rem 0 1.2rem 0', width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }}/>
            
            <ul style={{ textAlign: 'left', width: '100%', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: '#FFFFFF' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#FFFFFF' }}>✓</span> Real-time GPS safety alerts</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#FFFFFF' }}>✓</span> Advanced IOT integrations</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#FFFFFF' }}>✓</span> Up to 5 family members</li>
            </ul>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
