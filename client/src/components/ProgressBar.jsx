import { motion } from 'framer-motion';

const ACCENT = '#FFB088';

export default function ProgressBar({ done, total }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-inter" style={{ color: '#9CA3C4', fontSize: '0.8rem' }}>
          {done} / {total} complétés
        </span>
        <span className="font-inter" style={{ color: ACCENT, fontSize: '0.8rem', fontWeight: 600 }}>
          {pct}%
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 99,
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            height: 4,
            background: ACCENT,
            borderRadius: 99,
            boxShadow: `0 0 12px ${ACCENT}88`,
          }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
