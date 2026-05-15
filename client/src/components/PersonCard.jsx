import { motion } from 'framer-motion';
import { DISC_COLORS, TAG_COLORS, getInitials } from '../data/team';

export function MiniCard({ person, onClick }) {
  const discColor = DISC_COLORS[person.disc];
  const tagColor  = TAG_COLORS[person.tag] ?? TAG_COLORS['Family Office'];

  return (
    <motion.button
      onClick={() => onClick(person)}
      whileHover={{ y: -2, boxShadow: `0 8px 24px ${tagColor.border}22` }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: '#1A1530',
        border: `1px solid rgba(255,255,255,0.08)`,
        borderRadius: 10,
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
      }}
    >
      <div style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: `2px solid ${discColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `${discColor}18`,
        flexShrink: 0,
        fontSize: '0.65rem',
        fontWeight: 700,
        color: discColor,
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.02em',
      }}>
        {getInitials(person)}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: '#F5F3FF', lineHeight: 1.3 }}>
          {person.firstName} {person.lastName}
        </p>
        <p style={{ margin: 0, fontSize: '0.7rem', color: '#9CA3C4', lineHeight: 1.3 }}>
          {person.role}
        </p>
      </div>
    </motion.button>
  );
}

export default function PersonCard({ person, onClick }) {
  const discColor = DISC_COLORS[person.disc];
  const tagColor  = TAG_COLORS[person.tag] ?? TAG_COLORS['Family Office'];

  return (
    <motion.button
      onClick={() => onClick(person)}
      whileHover={{ y: -4, boxShadow: `0 16px 40px ${tagColor.border}28` }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: '#1A1530',
        border: `1px solid rgba(255,255,255,0.08)`,
        borderTop: `4px solid ${tagColor.border}`,
        borderRadius: 12,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 12,
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
      }}
    >
      {/* Avatar with DISC ring */}
      <div style={{
        width: 52,
        height: 52,
        borderRadius: '50%',
        border: `3px solid ${discColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `${discColor}18`,
        fontSize: '1rem',
        fontWeight: 700,
        color: discColor,
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.03em',
        flexShrink: 0,
      }}>
        {getInitials(person)}
      </div>

      {/* Name + Role */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0,
          fontSize: '0.95rem',
          fontWeight: 600,
          color: '#F5F3FF',
          lineHeight: 1.3,
          fontFamily: 'Inter, sans-serif',
        }}>
          {person.firstName} {person.lastName}
        </p>
        <p style={{
          margin: '3px 0 0',
          fontSize: '0.8rem',
          color: '#9CA3C4',
          lineHeight: 1.4,
          fontFamily: 'Inter, sans-serif',
        }}>
          {person.role}
        </p>
      </div>

      {/* Tag pill */}
      <span style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 999,
        background: tagColor.bg,
        border: `1px solid ${tagColor.border}55`,
        color: tagColor.text,
        fontSize: '0.7rem',
        fontWeight: 600,
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.02em',
      }}>
        {person.tag}
      </span>
    </motion.button>
  );
}
