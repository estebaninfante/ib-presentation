import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Globe,
  BarChart3,
  Search,
  ShieldCheck,
  CreditCard,
  Target,
  ChevronRight,
  ChevronLeft,
  Users,
  Smartphone,
  ArrowRight,
  TrendingUp,
  Landmark,
  WifiOff,
  Info
} from 'lucide-react';

const data = [
  { id: 'ca', name: 'Canada', val: 25, active: true, gdp: '$52,248', infl: '3.44%', ef: '75.22', internet: '93.75%', account: '99.18%' },
  { id: 'eg', name: 'Egypt', val: 10, active: false, gdp: '$3,673', infl: '17.26%', ef: '51.00', internet: '72.97%', account: '39.29%' },
  { id: 'ma', name: 'Malaysia', val: 20, active: true, gdp: '$11,175', infl: '1.81%', ef: '68.52', internet: '95.88%', account: '92.70%' },
  { id: 'pa', name: 'Panama', val: 16, active: true, gdp: '$16,827', infl: '1.02%', ef: '65.00', internet: '67.89%', account: '61.14%' },
  { id: 'tr', name: 'Türkiye', val: 15, active: false, gdp: '$11,789', infl: '43.31%', ef: '58.02', internet: '83.16%', account: '83.26%' },
];

const CreditCard3D = () => {
  return (
    <div className="card-perspective">
      <motion.div
        initial={{ rotateY: 0, y: 0 }}
        animate={{ 
          rotateY: 360,
          y: [0, -20, 0]
        }}
        transition={{
          rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="card-3d"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="card-chip" />
        </div>
        <div className="card-number" style={{ fontSize: '1rem', marginTop: '2rem' }}>**** **** **** 2026</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
          <div className="card-holder">Card Holder</div>
          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>RESEARCH TEAM</div>
          <div style={{ display: 'flex', gap: '0.2rem', marginTop: '0.5rem' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', marginLeft: '-12px' }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const InteractiveBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const blob1X = useTransform(mouseX, [0, window.innerWidth], [-100, 100]);
  const blob1Y = useTransform(mouseY, [0, window.innerHeight], [-100, 100]);
  
  const blob2X = useTransform(mouseX, [0, window.innerWidth], [50, -50]);
  const blob2Y = useTransform(mouseY, [0, window.innerHeight], [50, -50]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden', background: '#000b1e' }}>
      {/* Background Mesh/Grid */}
      <div style={{ 
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
        backgroundSize: '40px 40px',
        opacity: 0.5 
      }} />

      {/* Animated Blobs */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          width: '600px', 
          height: '600px', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(0, 117, 235, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          x: blob1X,
          y: blob1Y,
          top: '10%',
          left: '10%',
        }}
      />
      <motion.div 
        style={{ 
          position: 'absolute', 
          width: '500px', 
          height: '500px', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(176, 38, 255, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          x: blob2X,
          y: blob2Y,
          bottom: '10%',
          right: '10%',
        }}
      />
      
      {/* Dynamic Mouse Spotlight */}
      <motion.div
        style={{
          position: 'absolute',
          width: '1000px',
          height: '1000px',
          borderRadius: '50%',
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 117, 235, 0.05), transparent 80%)`
          ),
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);
  const [time, setTime] = useState(300); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  const next = () => {
    if (!isActive) setIsActive(true); // Start timer on first move

    if (scenes[currentScene].id === 'juan-filtering' && !isFiltered) {
      setIsFiltered(true);
    } else {
      setCurrentScene(prev => Math.min(prev + 1, scenes.length - 1));
      setIsFiltered(false);
    }
  };

  const prev = () => {
    if (scenes[currentScene].id === 'juan-filtering' && isFiltered) {
      setIsFiltered(false);
    } else {
      setCurrentScene(prev => Math.max(prev - 1, 0));
    }
  };

  // Timer logic (Countdown)
  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(t => t - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Auto-advance for Filtering Animation
  useEffect(() => {
    if (isFiltered) {
      const timer = setTimeout(() => {
        setCurrentScene(prev => Math.min(prev + 1, scenes.length - 1));
        setIsFiltered(false);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [isFiltered]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene, isFiltered, isActive]);

  // Auto-advance for Qualitative Frameworks
  useEffect(() => {
    if (scenes[currentScene].id === 'manuela-qualitative-frameworks') {
      const timer = setTimeout(() => {
        next();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [currentScene]);

  const scenes = [
    {
      id: 'cover',
      content: (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CreditCard3D />
        </div>
      )
    },
    {
      id: 'nicoll',
      content: (
        <div style={{ textAlign: 'center', maxWidth: '900px' }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
            <Globe size={120} strokeWidth={1} style={{ marginBottom: '2rem', color: '#0075eb' }} />
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="title" style={{ fontSize: '3rem' }}>
            Global Expansion Strategy
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
            "Global expansion in fintech is no longer defined only by market size, but by how well a country's environment aligns with strategy."
          </motion.p>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3.5rem', justifyContent: 'center' }}>
            {['Canada', 'Egypt', 'Panama', 'Türkiye', 'Malaysia'].map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                style={{ padding: '0.8rem 1.2rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem' }}
              >
                {c}
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'juan-filtering',
      content: (
        <div style={{ width: '100%', maxWidth: '1000px', textAlign: 'center', position: 'relative' }}>
          <div className="label">Quantitative Analysis</div>
          <h2 className="title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The Filtering Process</h2>

          <div style={{ display: 'flex', gap: '4rem', marginBottom: '3rem', justifyContent: 'center' }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--secondary-color)', marginBottom: '1rem' }}>General Variables</div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['GDP', 'Inflation', 'Economic Freedom'].map(v => (
                  <span key={v} style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.5rem 1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>{v}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#0075eb', marginBottom: '1rem' }}>Specific Variables</div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['Internet Penetration', 'Financial Account Ownership'].map(v => (
                  <span key={v} style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.5rem 1rem', background: 'rgba(0, 117, 235, 0.1)', border: '1px solid rgba(0, 117, 235, 0.2)', color: '#0075eb', borderRadius: '8px' }}>{v}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bar-chart" style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '2rem', position: 'relative', marginBottom: '4rem' }}>
            {data.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isFiltered && (item.id === 'eg' || item.id === 'tr') ? [null, null, 0] : `${item.val * 10}px`,
                  opacity: isFiltered && (item.id === 'eg' || item.id === 'tr') ? [1, 1, 0] : 1,
                  backgroundColor: isFiltered && (item.id === 'eg' || item.id === 'tr') ? ['rgba(255, 255, 255, 0.1)', '#ff3b30', '#ff3b30'] : (item.active ? '#0075eb' : 'rgba(255, 255, 255, 0.2)'),
                  width: isFiltered && (item.id === 'eg' || item.id === 'tr') ? [100, 100, 0] : 100,
                  margin: isFiltered && (item.id === 'eg' || item.id === 'tr') ? [null, null, 0] : '0 1rem'
                }}
                transition={{
                  duration: isFiltered && (item.id === 'eg' || item.id === 'tr') ? 3.5 : 1,
                  times: [0, 0.6, 1],
                  delay: isFiltered ? (item.id === 'eg' || item.id === 'tr' ? 0 : 0.4) : i * 0.1,
                  ease: "easeInOut"
                }}
                className="bar"
                style={{ borderRadius: '8px 8px 0 0', position: 'relative', cursor: 'help' }}
                whileHover={!isFiltered || (item.id !== 'eg' && item.id !== 'tr') ? { scale: 1.05 } : {}}
              >
                {(!isFiltered || (item.id !== 'eg' && item.id !== 'tr')) && (
                  <>
                    <div className="bar-label" style={{ fontWeight: 800, fontSize: '1.2rem', position: 'absolute', top: '-2.5rem', width: '100%', textAlign: 'center' }}>{item.val}</div>
                    <div className="bar-name" style={{ fontSize: '0.8rem', position: 'absolute', bottom: '-2.5rem', width: '100%', textAlign: 'center', fontWeight: 700 }}>{item.name}</div>
                    <div className="bar-tooltip">
                      <div style={{ fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.2)', marginBottom: '0.5rem', paddingBottom: '0.2rem' }}>{item.name} Detail</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
                        <span style={{ opacity: 0.6 }}>GDP:</span> <span>{item.gdp}</span>
                        <span style={{ opacity: 0.6 }}>Inflation:</span> <span>{item.infl}</span>
                        <span style={{ opacity: 0.6 }}>Econ Free:</span> <span>{item.ef}</span>
                        <span style={{ opacity: 0.6 }}>Internet:</span> <span>{item.internet}</span>
                        <span style={{ opacity: 0.6 }}>Account:</span> <span>{item.account}</span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          <div style={{ fontSize: '0.65rem', color: 'var(--secondary-color)', position: 'absolute', bottom: '-8rem', width: '100%', lineHeight: 1.4, textAlign: 'center' }}>
            <strong>Los datos se obtuvieron de las siguientes fuentes:</strong><br/>
            International Telecommunication Union. (2024). Measuring digital development: Facts and figures 2024. ITU Telecommunication Development Bureau. https://www.itu.int/itu-d/reports/statistics/facts-figures-2024/<br/>
            World Bank. (2025a). The global findex database 2025. World Bank Group. https://www.worldbank.org<br/>
            The Heritage Foundation. (2026). 2026 index of economic freedom. https://economicfreedom.heritage.org/pages/report
          </div>
        </div>
      )
    },
    {
      id: 'manuela-qualitative-frameworks',
      content: (
        <div style={{ textAlign: 'center' }}>
          <div className="label">Qualitative Frameworks</div>
          <h2 className="title">Deep Comparison</h2>
          <div style={{ display: 'flex', gap: '4rem', marginTop: '4rem', justifyContent: 'center' }}>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div className="icon-box" style={{ width: '80px', height: '80px' }}><Search size={32} /></div>
              <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>PESTLE</div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div className="icon-box" style={{ width: '80px', height: '80px' }}><Users size={32} /></div>
              <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>HOFSTEDE</div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'manuela-finalists',
      content: (
        <div style={{ width: '100%', maxWidth: '1000px' }}>
          <div className="label">Key Findings</div>
          <h2 className="title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>The Finalist Countries</h2>
          <div className="grid-container" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="grid-item" style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="icon-box" style={{ width: '48px', height: '48px' }}><Landmark size={24} /></div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>Canada</div>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.8 }}>Strong institutional stability, but a <strong>highly saturated</strong> banking sector dominated by major incumbents.</p>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="grid-item" style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="icon-box" style={{ width: '48px', height: '48px' }}><WifiOff size={24} /></div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>Panama</div>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.8 }}>Macroeconomic stability and connectivity, but <strong>lower internet penetration</strong> limits digital banking models.</p>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="grid-item" style={{ padding: '2rem', background: '#0075eb', color: 'white', borderRadius: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="icon-box" style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', color: 'white' }}><Target size={24} /></div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>Malaysia</div>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.9 }}><strong>Strongest alignment:</strong> fintech-friendly, high digital adoption, and regional integration within ASEAN.</p>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'samuel-entry',
      content: (
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', maxWidth: '1100px' }}>
          <div style={{ flex: 1.2 }}>
            <div className="label">Entry Strategy</div>
            <h2 className="title" style={{ fontSize: '3rem' }}>Greenfield Strategy</h2>
            <p className="subtitle" style={{ fontSize: '1.1rem', marginTop: '1.5rem', lineHeight: 1.6 }}>
              The research concluded that a <strong>greenfield investment</strong> allows Revolut to maintain full control over its technology, operations, and organizational culture.
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5 }}
              style={{ height: '4px', background: '#0075eb', marginTop: '2.5rem' }}
            />
          </div>
          <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem', borderRadius: '20px', borderLeft: '4px solid #0075eb' }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Fintech Sandbox</div>
              <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Entering through Malaysia's regulatory sandbox to reduce operational risk before scaling.</p>
            </motion.div>
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem', borderRadius: '20px', borderLeft: '4px solid #0075eb' }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Local Adaptation</div>
              <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Facilitating adaptation to local regulations and payment infrastructure seamlessly.</p>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'juanjose-marketing',
      content: (
        <div style={{ textAlign: 'center', maxWidth: '900px' }}>
          <div className="label">Marketing & Local Adaptation</div>
          <h2 className="title">Scaling Trust</h2>
          <p className="subtitle" style={{ fontSize: '1rem', marginBottom: '3rem' }}>Local adaptation is a key factor for successful expansion.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <motion.div whileHover={{ y: -5 }} style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', padding: '2rem', borderRadius: '24px', textAlign: 'left' }}>
              <CreditCard size={32} style={{ marginBottom: '1rem', color: '#0075eb' }} />
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Shariah Compliance</div>
              <p style={{ opacity: 0.6, fontSize: '0.85rem', marginTop: '1rem' }}>Financial products adapted to Malaysia's Islamic finance environment.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: '24px', textAlign: 'left' }}>
              <ArrowRight size={32} style={{ marginBottom: '1rem', color: '#0075eb' }} />
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>DuitNow Integration</div>
              <p style={{ opacity: 0.6, fontSize: '0.85rem', marginTop: '1rem' }}>Seamless connection with local payment infrastructure.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: '24px', textAlign: 'left' }}>
              <TrendingUp size={32} style={{ marginBottom: '1rem', color: '#0075eb' }} />
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Digital-First</div>
              <p style={{ opacity: 0.6, fontSize: '0.85rem', marginTop: '1rem' }}>TikTok campaigns, influencer marketing, and referral systems.</p>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'carlos-conclusions',
      content: (
        <div style={{ maxWidth: '800px' }}>
          <div className="label">Conclusions</div>
          <h2 className="title" style={{ fontSize: '2.5rem' }}>Beyond Economic Size</h2>
          <p className="subtitle" style={{ marginBottom: '3rem', fontSize: '1rem' }}>"International expansion depends on much more than economic size alone."</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem', borderRadius: '20px' }}>
              <div style={{ fontWeight: 800, color: '#0075eb', marginBottom: '0.5rem' }}>Strategic Influence</div>
              <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Digital readiness, regulation, and culture directly influence success.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem', borderRadius: '20px' }}>
              <div style={{ fontWeight: 800, color: '#0075eb', marginBottom: '0.5rem' }}>Balanced Analysis</div>
              <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Combining quantitative and qualitative data for stronger decisions.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ gridColumn: 'span 2', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', padding: '1.5rem', borderRadius: '20px', textAlign: 'center' }}>
              <p style={{ fontWeight: 600 }}>Understanding the complexity behind global expansion in fintech.</p>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'closing',
      content: (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center' }}
        >
          <h1 className="title" style={{ fontSize: '6rem' }}>Thanks</h1>
          <p className="subtitle">Revolut Research Team</p>
        </motion.div>
      )
    }
  ];

  const handleGlobalClick = (e) => {
    const { clientX } = e;
    const { innerWidth } = window;
    if (clientX > innerWidth / 2) {
      next();
    } else {
      prev();
    }
  };

  return (
    <div className="presentation-container" onClick={handleGlobalClick} style={{ cursor: 'pointer' }}>
      <InteractiveBackground />

      <div className="progress-bar" style={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }} />

      {/* Timer Overlay */}
      <div style={{ position: 'fixed', top: '2rem', right: '2rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--secondary-color)', zIndex: 200 }}>
        {formatTime(time)}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -1000 }}
          transition={{ duration: 0.5}}
          className="scene-wrapper"
        >
          {scenes[currentScene].content}
        </motion.div>
      </AnimatePresence>

      <div className="controls" onClick={(e) => e.stopPropagation()}>
        <button onClick={prev} className="control-btn" disabled={currentScene === 0}>
          <ChevronLeft />
        </button>
        <button onClick={next} className="control-btn" disabled={currentScene === scenes.length - 1}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
