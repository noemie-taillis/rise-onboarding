import { motion } from 'framer-motion';

export default function InfoBlock({ icon: Icon, label, value, sub, accent = '#C7B9F5', mono = false, delay = 0, children }) {
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Label */}
      <div className="flex items-center gap-2">
        {Icon && <Icon size={13} color={accent} strokeWidth={2} />}
        <span
          className="font-inter"
          style={{
            color: '#9CA3C4',
            fontSize: '0.7rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {label}
        </span>
      </div>

      {/* Value + optional extra (e.g. copy button) */}
      <div className="flex items-center gap-3">
        <span
          className="font-fraunces"
          style={{
            color: '#F5F3FF',
            fontSize: '1.3rem',
            fontWeight: 500,
            lineHeight: 1.2,
            ...(mono && { letterSpacing: '0.25em' }),
          }}
        >
          {value}
        </span>
        {children}
      </div>

      {/* Sub-line */}
      {sub && (
        <span
          className="font-inter"
          style={{ color: '#9CA3C4', fontSize: '0.8rem', lineHeight: 1.5 }}
        >
          {sub}
        </span>
      )}
    </motion.div>
  );
}
