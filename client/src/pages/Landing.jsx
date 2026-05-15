import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackgroundDecor from '../components/BackgroundDecor';

const TITLE_WORDS = ['Bienvenue', 'chez', 'RISE'];
const PILLS = ['Family Office', 'Dare To Be Sharp', 'AI-First', 'High Standards'];
const ease = [0.25, 0.46, 0.45, 0.94];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <BackgroundDecor />

      {/* Violet sphere rising from below */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 640,
          height: 640,
          left: '50%',
          top: '50%',
          marginLeft: -320,
          marginTop: -320,
          background:
            'radial-gradient(circle, rgba(167,139,250,0.82) 0%, rgba(124,58,237,0.42) 45%, transparent 100%)',
          filter: 'blur(32px)',
          zIndex: 1,
        }}
        initial={{ y: 750, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease, delay: 0.4 }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center"
        style={{ zIndex: 2 }}
      >
        {/* Title — Inter bold sur fond sombre */}
        <h1
          className="font-inter mb-6"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#F5F3FF',
            lineHeight: 1.05,
          }}
        >
          {TITLE_WORDS.map((word, i) => (
            <motion.span
              key={word}
              className="inline-block"
              style={{
                marginRight: i < TITLE_WORDS.length - 1 ? '0.25em' : 0,
                ...(word === 'RISE' && {
                  color: '#A78BFA',
                  textShadow:
                    '0 0 60px rgba(167,139,250,0.75), 0 0 120px rgba(124,58,237,0.45)',
                }),
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 1.5 + i * 0.15, ease }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="font-inter mb-10 max-w-lg"
          style={{ fontSize: '1.1rem', lineHeight: 1.78, color: '#9CA3C4', fontWeight: 400 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.3, ease: 'easeOut' }}
        >
          Ton guide d'onboarding — capte l'ambiance, récupère tes outils,{' '}
          démarre en force dès le premier jour.
        </motion.p>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {PILLS.map((pill, i) => (
            <motion.span
              key={pill}
              className="font-inter rounded-full"
              style={{
                padding: '9px 22px',
                fontSize: '0.875rem',
                fontWeight: 500,
                background: 'rgba(124, 58, 237, 0.2)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(124, 58, 237, 0.4)',
                color: '#F5F3FF',
              }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.6 + i * 0.1, ease: 'easeOut' }}
            >
              {pill}
            </motion.span>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          onClick={() => navigate('/home')}
          className="btn-pulse font-inter rounded-full text-white cursor-pointer"
          style={{
            padding: '17px 42px',
            fontSize: '1rem',
            fontWeight: 600,
            background: '#7C3AED',
            border: 'none',
            letterSpacing: '0.01em',
            outline: 'none',
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3.1, ease: 'easeOut' }}
          whileHover={{ scale: 1.03, background: '#8B4CF7' }}
          whileTap={{ scale: 0.97 }}
        >
          Commencer mon onboarding
        </motion.button>
      </div>
    </motion.div>
  );
}
