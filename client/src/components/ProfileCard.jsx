import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Mail } from 'lucide-react';
import { useProfile } from '../context/UserProfileContext';
import ProfileModal from './ProfileModal';
import SignatureModal from './SignatureModal';

function getInitials(firstName, lastName) {
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();
}

const btnStyle = {
  display: 'flex', alignItems: 'center', gap: 6,
  background: 'none', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8, padding: '7px 13px',
  color: '#9CA3C4', cursor: 'pointer', flexShrink: 0,
  fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500,
  transition: 'color 0.2s, border-color 0.2s',
};

export default function ProfileCard() {
  const { profile } = useProfile();
  const [profileOpen,   setProfileOpen]   = useState(false);
  const [signatureOpen, setSignatureOpen] = useState(false);

  return (
    <>
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: '#1A1530',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 16,
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 28,
        }}
      >
        {/* Avatar */}
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          border: '3px solid #7C3AED',
          background: profile.photoBase64 ? 'transparent' : '#7C3AED',
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {profile.photoBase64 ? (
            <img src={profile.photoBase64} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span className="font-fraunces" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff' }}>
              {getInitials(profile.firstName, profile.lastName)}
            </span>
          )}
        </div>

        {/* Infos */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="font-fraunces" style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500, color: '#F5F3FF', lineHeight: 1.3 }}>
            {profile.firstName} {profile.lastName}
          </p>
          {profile.jobTitle && (
            <p className="font-inter" style={{ margin: '1px 0 0', fontSize: '0.78rem', color: '#7C3AED', fontWeight: 600, lineHeight: 1.3 }}>
              {profile.jobTitle} · Rise Family Office
            </p>
          )}
          {profile.description ? (
            <p className="font-inter" style={{
              margin: '4px 0 0', fontSize: '0.82rem', color: '#9CA3C4',
              lineHeight: 1.5, display: '-webkit-box',
              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {profile.description}
            </p>
          ) : (
            <p className="font-inter" style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#9CA3C4', fontStyle: 'italic', lineHeight: 1.5 }}>
              Ajoute quelques mots sur toi
            </p>
          )}
        </div>

        {/* Boutons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
          <button
            onClick={() => setProfileOpen(true)}
            style={btnStyle}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#7C3AED'; e.currentTarget.style.color = '#A78BFA'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#9CA3C4'; }}
          >
            <Pencil size={12} />
            Modifier
          </button>
          <button
            onClick={() => setSignatureOpen(true)}
            style={btnStyle}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#7C3AED'; e.currentTarget.style.color = '#A78BFA'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#9CA3C4'; }}
          >
            <Mail size={12} />
            Signature
          </button>
        </div>
      </motion.div>

      <ProfileModal    open={profileOpen}   onClose={() => setProfileOpen(false)} />
      <SignatureModal  open={signatureOpen} onClose={() => setSignatureOpen(false)} />
    </>
  );
}
