import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const ACCENT = '#FFB088';

export default function ChecklistItem({ item, checked, onToggle, delay = 0 }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <motion.button
        onClick={() => onToggle(item.id)}
        className="w-full text-left rounded-2xl p-5 flex items-start gap-4"
        style={{
          background: checked ? 'rgba(255,176,136,0.08)' : '#1A1530',
          border: `1px solid ${checked ? 'rgba(255,176,136,0.3)' : 'rgba(255,255,255,0.06)'}`,
          cursor: 'pointer',
          transition: 'background 0.25s ease, border-color 0.25s ease',
        }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.985 }}
      >
        {/* Icon */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: checked ? 'rgba(255,176,136,0.18)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${checked ? 'rgba(255,176,136,0.35)' : 'rgba(255,255,255,0.08)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.25s ease',
          }}
        >
          <Icon size={18} color={checked ? ACCENT : '#9CA3C4'} strokeWidth={1.8} />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            className="font-inter mb-1"
            style={{
              margin: 0,
              fontSize: '0.95rem',
              fontWeight: 600,
              color: checked ? ACCENT : '#F5F3FF',
              textDecoration: checked ? 'line-through' : 'none',
              transition: 'color 0.25s ease',
            }}
          >
            {item.title}
          </p>
          <p
            className="font-inter"
            style={{
              margin: 0,
              fontSize: '0.82rem',
              color: '#9CA3C4',
              lineHeight: 1.6,
              opacity: checked ? 0.6 : 1,
              transition: 'opacity 0.25s ease',
            }}
          >
            {item.description}
          </p>
        </div>

        {/* Checkbox */}
        <motion.div
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            border: `2px solid ${checked ? ACCENT : 'rgba(255,255,255,0.15)'}`,
            background: checked ? ACCENT : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.2s ease, border-color 0.2s ease',
          }}
          animate={checked ? { scale: [1, 1.18, 1] } : { scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          {checked && <Check size={13} color="#0F0A1F" strokeWidth={3} />}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
