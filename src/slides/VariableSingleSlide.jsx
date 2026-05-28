import React from 'react';
import { Target, Globe, Activity, Package, Smartphone, Heart } from 'lucide-react';

export default function VariableSingleSlide({ index }) {
  const variablesData = [
    { icon: <Target size={100} color="var(--primary)" />, label: "TARGET", watermark: "01", val: "The Only Child", ctx: "Households: 3.9 → 2.9 members in 1 year" },
    {
      icon: <Globe size={100} color="var(--primary)" />,
      label: "SDG 1",
      watermark: "02",
      val: "No Poverty",
      ctx: "Poverty is multidimensional, and having a good Healthcare system is part of it."
    },
    { icon: <Activity size={100} color="var(--primary)" />, label: "INDUSTRY", watermark: "03", val: "Healthcare", ctx: "Only 6 of 29 EPS entities remain solvent" },
    { icon: <Package size={100} color="var(--primary)" />, label: "MATERIAL", watermark: "04", val: "Cardboard", ctx: "It is easyto make, cheap, and lightweight to carry" },
    { icon: <Smartphone size={100} color="var(--primary)" />, label: "UX", watermark: "05", val: "Only in Emergencies", ctx: "Zero prior training required, maximum stress design" },
    { icon: <Heart size={100} color="var(--primary)" />, label: "EMOTION", watermark: "06", val: "Inspiration", ctx: "The inspiration to serve and help others in emergency moments" }
  ];

  const card = variablesData[index] || variablesData[0];

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
