import { useState } from 'react';
import { motion } from 'framer-motion';
import Chapter from '../components/Chapter';
import { BROURHANT_FAMILY } from '../data/brourhant';

const ease = [0.25, 0.46, 0.45, 0.94];

function PhotoAvatar({ member }) {
  const [imgError, setImgError] = useState(false);
  const showPhoto = member.photo && !imgError;

  return (
    <div
      className="flex items-center justify-center rounded-full mb-4 overflow-hidden"
      style={{
        width: 80,
        height: 80,
        background: showPhoto ? 'transparent' : (member.isCEO ? '#7C3AED' : 'rgba(167,139,250,0.25)'),
        border: member.isCEO && !showPhoto ? 'none' : '1px solid rgba(167,139,250,0.4)',
        flexShrink: 0,
      }}
    >
      {showPhoto ? (
        <img
          src={member.photo}
          alt={member.name}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
        />
      ) : (
        <span
          className="font-inter"
          style={{
            color: '#F5F3FF',
            fontSize: member.initials.length > 2 ? '0.85rem' : '1rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
          }}
        >
          {member.initials}
        </span>
      )}
    </div>
  );
}

export default function Chapter3Brourhant() {
  return (
    <Chapter>
      <motion.h1
        className="font-fraunces mb-3"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          color: '#F5F3FF',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        La Famille Brourhant
      </motion.h1>

      <motion.p
        className="font-inter mb-10"
        style={{ color: '#9CA3C4', fontSize: '1rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Six membres, une vision familiale.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {BROURHANT_FAMILY.map((member, i) => (
          <motion.div
            key={member.name}
            className="relative rounded-2xl p-6"
            style={{
              background: '#1A1530',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease }}
            whileHover={{
              y: -4,
              boxShadow: '0 0 36px rgba(124,58,237,0.22)',
              borderColor: 'rgba(124,58,237,0.28)',
            }}
          >

            {/* Avatar */}
            <PhotoAvatar member={member} />

            {/* Nom */}
            <h3
              className="font-fraunces mb-1"
              style={{ color: '#F5F3FF', fontSize: '1.15rem', fontWeight: 500 }}
            >
              {member.name}
            </h3>

            {/* Rôle */}
            <p
              className="font-inter"
              style={{ color: '#9CA3C4', fontSize: '0.85rem' }}
            >
              {member.role}
            </p>
          </motion.div>
        ))}
      </div>
    </Chapter>
  );
}
