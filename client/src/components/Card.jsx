import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Card({ number, title, description, accent, route, delay = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(route)}
      className="relative cursor-pointer rounded-2xl p-7"
      style={{
        background: '#1A1530',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        boxShadow: `0 0 40px ${accent}28`,
        borderColor: `${accent}30`,
        y: -4,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon square */}
      <div
        className="flex items-center justify-center rounded-xl mb-5"
        style={{ width: 48, height: 48, background: `${accent}26` }}
      >
        <span
          className="font-inter"
          style={{ color: accent, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.05em' }}
        >
          {String(number).padStart(2, '0')}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-inter mb-2"
        style={{ color: '#F5F3FF', fontWeight: 600, fontSize: '1.05rem', letterSpacing: '-0.01em' }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="font-inter"
        style={{ color: '#9CA3C4', fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.65 }}
      >
        {description}
      </p>

      {/* Arrow */}
      <div
        className="absolute bottom-5 right-6 font-inter"
        style={{ color: accent, fontSize: '1.1rem' }}
      >
        →
      </div>
    </motion.div>
  );
}
