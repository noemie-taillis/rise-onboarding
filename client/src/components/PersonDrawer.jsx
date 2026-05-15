import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Users, Calendar, ChevronLeft } from 'lucide-react';
import { DISC_COLORS, TAG_COLORS, getInitials, getManager, getDirectReports } from '../data/team';

const DISC_LABELS = {
  D: { label: 'Dominant', desc: 'Direct, déterminé, orienté résultats.' },
  I: { label: 'Influent',  desc: 'Communicant, enthousiaste, persuasif.' },
  S: { label: 'Stable',   desc: 'Patient, fiable, bon esprit d\'équipe.' },
  C: { label: 'Consciencieux', desc: 'Analytique, précis, soucieux de la qualité.' },
};

function DiscBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: '0.75rem', color: '#9CA3C4', fontFamily: 'Inter, sans-serif' }}>{label}</span>
        <span style={{ fontSize: '0.75rem', color, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{value}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          style={{ height: '100%', borderRadius: 999, background: color }}
        />
      </div>
    </div>
  );
}

export default function PersonDrawer({ person, onClose, onNavigate }) {
  if (!person) return null;

  const discColor  = DISC_COLORS[person.disc];
  const tagColor   = TAG_COLORS[person.tag] ?? TAG_COLORS['Family Office'];
  const manager    = getManager(person);
  const reports    = getDirectReports(person.id);
  const discInfo   = DISC_LABELS[person.disc];

  return (
    <AnimatePresence>
      {person && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 10, 31, 0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 100,
            }}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 420,
              background: '#120D24',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              zIndex: 101,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header — fixe en haut, ne scrolle pas */}
            <div style={{
              flexShrink: 0,
              background: '#120D24',
              borderBottom: `4px solid ${tagColor.border}`,
              padding: '20px 24px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
            }}>
              {/* Avatar */}
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: `3px solid ${discColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `${discColor}18`,
                fontSize: '1.1rem',
                fontWeight: 700,
                color: discColor,
                fontFamily: 'Inter, sans-serif',
                flexShrink: 0,
              }}>
                {getInitials(person)}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#F5F3FF', fontFamily: 'Inter, sans-serif' }}>
                  {person.firstName} {person.lastName}
                </p>
                <p style={{ margin: '3px 0 6px', fontSize: '0.82rem', color: '#9CA3C4', fontFamily: 'Inter, sans-serif' }}>
                  {person.role}
                </p>
                <span style={{
                  display: 'inline-block',
                  padding: '2px 10px',
                  borderRadius: 999,
                  background: tagColor.bg,
                  border: `1px solid ${tagColor.border}55`,
                  color: tagColor.text,
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {person.tag}
                </span>
              </div>

              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  padding: 6,
                  cursor: 'pointer',
                  color: '#9CA3C4',
                  display: 'flex',
                  alignItems: 'center',
                  flexShrink: 0,
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Content — zone scrollable */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Infos */}
              <div>
                <p style={{ margin: '0 0 12px', fontSize: '0.7rem', fontWeight: 700, color: '#9CA3C4', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                  Infos
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {person.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <MapPin size={14} color="#7C3AED" />
                      <span style={{ fontSize: '0.85rem', color: '#F5F3FF', fontFamily: 'Inter, sans-serif' }}>{person.location}</span>
                    </div>
                  )}
                  {person.startDate && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Calendar size={14} color="#7C3AED" />
                      <span style={{ fontSize: '0.85rem', color: '#F5F3FF', fontFamily: 'Inter, sans-serif' }}>Chez Rise depuis {person.startDate}</span>
                    </div>
                  )}
                  {manager && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <ChevronLeft size={14} color="#7C3AED" />
                      <span style={{ fontSize: '0.85rem', color: '#F5F3FF', fontFamily: 'Inter, sans-serif' }}>
                        Reporte à{' '}
                        <button
                          onClick={() => onNavigate(manager)}
                          style={{ background: 'none', border: 'none', color: '#A78BFA', cursor: 'pointer', fontWeight: 600, padding: 0, fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}
                        >
                          {manager.firstName} {manager.lastName}
                        </button>
                      </span>
                    </div>
                  )}
                  {reports.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Users size={14} color="#7C3AED" />
                      <span style={{ fontSize: '0.85rem', color: '#F5F3FF', fontFamily: 'Inter, sans-serif' }}>
                        {reports.length} rapport{reports.length > 1 ? 's' : ''} direct{reports.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Fun stuff */}
              {person.funFact && (
                <div>
                  <p style={{ margin: '0 0 10px', fontSize: '0.7rem', fontWeight: 700, color: '#9CA3C4', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                    Fun stuff
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '0.88rem',
                    color: '#F5F3FF',
                    lineHeight: 1.65,
                    fontFamily: 'Inter, sans-serif',
                    padding: '12px 14px',
                    background: 'rgba(124,58,237,0.08)',
                    borderRadius: 10,
                    borderLeft: '3px solid #7C3AED',
                  }}>
                    {person.funFact}
                  </p>
                </div>
              )}

              {/* DISC */}
              {person.discDetails && (
                <div>
                  <p style={{ margin: '0 0 12px', fontSize: '0.7rem', fontWeight: 700, color: '#9CA3C4', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                    Profil DISC
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    background: `${discColor}10`,
                    borderRadius: 10,
                    border: `1px solid ${discColor}30`,
                    marginBottom: 16,
                  }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      border: `2px solid ${discColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      fontWeight: 800,
                      color: discColor,
                      fontFamily: 'Inter, sans-serif',
                      flexShrink: 0,
                    }}>
                      {person.disc}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: discColor, fontFamily: 'Inter, sans-serif' }}>
                        {discInfo.label}
                      </p>
                      <p style={{ margin: 0, fontSize: '0.77rem', color: '#9CA3C4', fontFamily: 'Inter, sans-serif', lineHeight: 1.4 }}>
                        {discInfo.desc}
                      </p>
                    </div>
                  </div>

                  {Object.entries(person.discDetails).map(([key, val]) => (
                    <DiscBar key={key} label={key} value={val} color={DISC_COLORS[key]} />
                  ))}
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
