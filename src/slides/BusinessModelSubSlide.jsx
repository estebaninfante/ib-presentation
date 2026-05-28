import React from 'react';
import { motion } from 'framer-motion';
import { Users, Cpu, Shield, MapPin } from 'lucide-react';

export default function BusinessModelSubSlide() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
      <motion.div 
        layoutId="subscription-card-layout" 
        style={{ 
          width: '100%', 
          maxWidth: '960px', 
          backgroundColor: 'var(--primary)', 
          borderRadius: '32px', 
          padding: '2.5rem 3rem', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.8rem', 
          color: '#FFFFFF', 
          boxShadow: '0 30px 60px rgba(192,57,43,0.45)',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '1rem' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
              SUBSCRIPTION MODEL
            </span>
            <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '4rem', margin: 0, lineHeight: 0.95 }}>
              WHAT'S INCLUDED?
            </h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '2.2rem', fontWeight: 800 }}>$15,000 <span style={{fontSize:'1.1rem', fontWeight: 400}}>/ mo</span></span>
            <span style={{ fontSize: '0.8rem', display: 'block', opacity: 0.8, marginTop: '0.2rem' }}>Up to 5 Family Accounts</span>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 2.5rem', marginTop: '0.5rem' }}>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0
            }}>
              <Users size={24} />
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', fontWeight: 800 }}>Per Family Account (Max 5)</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.85, marginTop: '0.3rem', lineHeight: '1.4' }}>
                A single monthly charge independently covers up to 5 family members, regardless of their individual physical cards.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0
            }}>
              <Cpu size={24} />
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', fontWeight: 800 }}>IOT & Smartwatch Integration</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.85, marginTop: '0.3rem', lineHeight: '1.4' }}>
                Real-time syncing with smartwatches to enable fall alerts, distress trigger buttons, and automated vital monitoring.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0
            }}>
              <MapPin size={24} />
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', fontWeight: 800 }}>GPS Location & Telemetry</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.85, marginTop: '0.3rem', lineHeight: '1.4' }}>
                Immediate dispatch of precise GPS location coordinates and sensor data when an emergency card is scanned.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0
            }}>
              <Shield size={24} />
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', fontWeight: 800 }}>Personalized Assistance</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.85, marginTop: '0.3rem', lineHeight: '1.4' }}>
                Dedicated channels connecting immediately with local emergency response units when help is requested.
              </p>
            </div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}
