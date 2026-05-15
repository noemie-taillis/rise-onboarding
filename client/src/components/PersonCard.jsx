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
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: '#F5F3FF', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {person.firstName} {person.lastName}
        </p>
        <p style={{ margin: 0, fontSize: '0.7rem', color: '#9CA3C4', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
      whileHover={{ y: -3, boxShadow: `0 12px 32px ${tagColor.border}28` }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: '#1A1530',
        border: `1px solid rgba(255,255,255,0.08)`,
        borderTop: `3px solid ${tagColor.border}`,
        borderRadius: 10,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        border: `2px solid ${discColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `${discColor}18`,
        fontSize: '0.85rem',
        fontWeight: 700,
        color: discColor,
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.03em',
        flexShrink: 0,
      }}>
        {getInitials(person)}
      </div>

      {/* Name + Role */}
      <div style={{ minWidth: 0 }}>
        <p style={{
          margin: 0,
          fontSize: '0.88rem',
          fontWeight: 600,
          color: '#F5F3FF',
          lineHeight: 1.3,
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {person.firstName} {person.lastName}
        </p>
        <p style={{
          margin: '2px 0 0',
          fontSize: '0.75rem',
          color: '#9CA3C4',
          lineHeight: 1.4,
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {person.role}
        </p>
      </div>
    </motion.button>
  );
}
