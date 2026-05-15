import { motion } from 'framer-motion';
import Chapter from '../components/Chapter';

const ease = [0.25, 0.46, 0.45, 0.94];

export default function Chapter2Mantu() {
  return (
    <Chapter>
      <div className="flex flex-col items-center justify-center min-h-[75vh] text-center">
        <motion.h1
          className="font-fraunces mb-4"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 6rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: '#F5F3FF',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          Mantu
        </motion.h1>

        <motion.p
          className="font-inter mb-10"
          style={{ color: '#9CA3C4', fontSize: '1.1rem', lineHeight: 1.7 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          L'entreprise originelle d'Olivier Brourhant
        </motion.p>

        <motion.div
          className="max-w-lg w-full rounded-2xl p-8"
          style={{
            background: 'rgba(26, 21, 48, 0.72)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
        >
          <p
            className="font-inter mb-8"
            style={{ color: '#9CA3C4', lineHeight: 1.75, fontSize: '0.95rem', fontStyle: 'italic' }}
          >
            Contenu à venir — décris ici ce qu'est Mantu, son histoire, son lien avec Rise.
          </p>
          <a
            href="https://www.mantu.com"
            target="_blank"
            rel="noreferrer"
            className="font-inter rounded-full text-white inline-block"
            style={{
              padding: '12px 30px',
              fontSize: '0.9rem',
              fontWeight: 500,
              background: '#7C3AED',
              letterSpacing: '0.01em',
              textDecoration: 'none',
            }}
          >
            En savoir plus
          </a>
        </motion.div>
      </div>
    </Chapter>
  );
}
