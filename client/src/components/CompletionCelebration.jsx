import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const ACCENT = '#FFB088';

export default function CompletionCelebration({ onClose }) {
  const navigate = useNavigate();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const fire = (angle, origin) =>
      confetti({
        particleCount: 55,
        angle,
        spread: 60,
        origin,
        colors: ['#FFB088', '#C7B9F5', '#7C3AED', '#F5F3FF'],
        scalar: 1.1,
      });

    fire(60, { x: 0, y: 0.65 });
    fire(120, { x: 1, y: 0.65 });

    setTimeout(() => {
      fire(70, { x: 0.1, y: 0.55 });
      fire(110, { x: 0.9, y: 0.55 });
    }, 300);
  }, []);

  return createPortal(
    <motion.div
      className="fixed inset-0 flex items-center justify-center px-6"
      style={{ zIndex: 300, background: 'rgba(15,10,31,0.75)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="relative rounded-3xl p-10 flex flex-col items-center text-center max-w-sm w-full"
        style={{
          background: 'rgba(26,21,48,0.85)',
          border: '1px solid rgba(255,176,136,0.3)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 0 80px rgba(255,176,136,0.15)',
        }}
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Halo */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 320,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,176,136,0.14) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          style={{ fontSize: '3rem', lineHeight: 1, marginBottom: 16 }}
          animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          🎉
        </motion.div>

        <h2
          className="font-fraunces mb-3"
          style={{ fontSize: '1.65rem', fontWeight: 500, color: '#F5F3FF', letterSpacing: '-0.02em' }}
        >
          Tu es prêt·e à rejoindre Rise
        </h2>

        <p
          className="font-inter mb-8"
          style={{ color: '#9CA3C4', fontSize: '0.92rem', lineHeight: 1.7, maxWidth: 260 }}
        >
          Checklist complète. On t'attendait. Enfin, pas vraiment — mais ça sonne mieux.
        </p>

        <motion.button
          onClick={() => navigate('/first-day')}
          className="font-inter w-full rounded-xl py-3 mb-3"
          style={{
            background: ACCENT,
            color: '#0F0A1F',
            fontWeight: 700,
            fontSize: '0.95rem',
            border: 'none',
            cursor: 'pointer',
          }}
          whileHover={{ scale: 1.03, boxShadow: `0 0 28px ${ACCENT}55` }}
          whileTap={{ scale: 0.97 }}
        >
          Voir mon planning du Jour J →
        </motion.button>

        <button
          onClick={onClose}
          className="font-inter"
          style={{ color: '#9CA3C4', fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Fermer
        </button>
      </motion.div>
    </motion.div>,
    document.body
  );
}
