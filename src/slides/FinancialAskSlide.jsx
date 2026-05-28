import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Landmark, Landmark as InfraIcon, TrendingUp, Users } from 'lucide-react';

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
    <span style={{ display: 'inline-block', transition: 'transform 300ms ease', transform: pulse ? 'scale(1.05)' : 'scale(1)' }}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export default function FinancialAskSlide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', gap: '2.5rem' }}>

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
          FINANCIAL PROJECTION & INVESTMENT
        </span>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '4.5rem', color: '#FFFFFF', textAlign: 'center', lineHeight: '1', marginBottom: '-0.5rem' }}>
          SHARK TANK INVESTMENT ASK
        </h2>
      </div>

      {/* Main financials ask grid */}
      <div style={{ display: 'flex', width: '100%', maxWidth: '1100px', gap: '2rem', justifyContent: 'center' }}>

        {/* Left Card: 50M COP Raise */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          style={{
            flex: 1.2,
            backgroundColor: '#1E1E1E',
            borderRadius: '24px',
            border: '1px solid rgba(231, 76, 60, 0.25)',
            borderTop: '5px solid var(--primary-light)',
            padding: '2rem 1.8rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 25px 45px rgba(192, 57, 43, 0.2)'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.85rem', color: 'var(--primary-light)', fontWeight: 700, letterSpacing: '0.05em' }}>
                TOTAL INVESTMENT
              </span>
              <span style={{ backgroundColor: 'rgba(231,76,60,0.2)', color: 'var(--primary-light)', fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '6px', fontFamily: 'var(--font-space)' }}>
                15% EQUITY
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-space)', fontSize: '3.6rem', fontWeight: 800, color: '#FFFFFF', margin: '0.5rem 0' }}>
              <CountUp end="50" prefix="$" suffix="M COP" triggerPulse={true} />
            </div>
            <div style={{ margin: '1.2rem 0 1rem 0', width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}/>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                <InfraIcon size={18} color="var(--primary-light)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>$25M COP - App & Infrastructure</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Cloud services setup, database encryption, IoT smartwatches integration logic.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                <DollarSign size={18} color="var(--primary-light)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>$25M COP - Operating Expenses</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Operational runtime buffer. Cards printed purely on-demand to run zero-inventory risk.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Card: Financial Projections (Coherent chiquito projection) */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          style={{
            flex: 1,
            backgroundColor: '#161616',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '2rem 1.8rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>
                FINANCIAL PROJECTIONS (YEAR 1)
              </span>
              <TrendingUp size={18} color="var(--primary-light)" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left', marginTop: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block', textTransform: 'uppercase' }}>ESTIMATED CARD SALES</span>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF' }}>
                  2,300 units
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary-light)', display: 'block' }}>Retail ($20k) & Wholesale B2B ($15k) on-demand</span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block', textTransform: 'uppercase' }}>TOTAL ESTIMATED REVENUE</span>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF' }}>
                  $40M COP
                </span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', display: 'block' }}>Includes 25% recurring premium subscriptions</span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block', textTransform: 'uppercase' }}>GROSS PROFIT MARGIN</span>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-light)' }}>
                  60%
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>Solid margin with realistic operational costs</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
          *On-Demand printing ensures immediate positive unit economics from the first delivery.
        </p>
      </div>

    </div>
  );
}
