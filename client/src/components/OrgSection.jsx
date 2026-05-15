import { motion } from 'framer-motion';

export function OrgConnector() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '8px 0',
    }}>
      <div style={{
        width: 1,
        height: 32,
        borderLeft: '2px dashed rgba(124,58,237,0.35)',
      }} />
    </div>
  );
}

export default function OrgSection({ title, accent = '#7C3AED', children, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ marginBottom: 40 }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
      }}>
        <div style={{
          width: 4,
          height: 20,
          borderRadius: 2,
          background: accent,
          flexShrink: 0,
        }} />
        <h2 style={{
          margin: 0,
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#9CA3C4',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif',
        }}>
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}
