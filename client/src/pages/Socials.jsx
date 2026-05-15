import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const NETWORKS = [
  {
    name: 'Rise',
    handle: '@rise',
    description: 'Le Family Office. Suivre pour rester dans la boucle des actualités.',
    accent: '#A78BFA',
    accentDim: 'rgba(167,139,250,0.10)',
    accentBorder: 'rgba(167,139,250,0.22)',
    url: 'https://www.linkedin.com/company/TODO-rise',
  },
  {
    name: 'Idyllic Collection',
    handle: '@idyllic-collection',
    description: 'La branche hospitality — villas et propriétés d'exception.',
    accent: '#FFB088',
    accentDim: 'rgba(255,176,136,0.10)',
    accentBorder: 'rgba(255,176,136,0.22)',
    url: 'https://www.linkedin.com/company/TODO-idyllic-collection',
  },
  {
    name: 'Mantu',
    handle: '@mantugroup',
    description: 'Cabinet de conseil en transformation digitale & innovation.',
    accent: '#FF8B94',
    accentDim: 'rgba(255,139,148,0.10)',
    accentBorder: 'rgba(255,139,148,0.22)',
    url: 'https://www.linkedin.com/company/mantugroup',
  },
];

export default function Socials() {
  return (
    <Layout currentStep={8}>
      <div className="flex flex-col items-center px-6 py-12 w-full max-w-3xl mx-auto">

        <div className="w-full mb-8">
          <Link
            to="/home"
            className="font-inter inline-flex items-center gap-1"
            style={{ color: '#9CA3C4', fontSize: '0.875rem', textDecoration: 'none' }}
          >
            ← Retour au hub
          </Link>
        </div>

        <motion.h1
          className="font-fraunces text-center mb-3 w-full"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: '#F5F3FF',
            lineHeight: 1.05,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Nos réseaux
        </motion.h1>

        <motion.p
          className="font-inter text-center mb-12 max-w-sm"
          style={{ color: '#9CA3C4', fontSize: '1rem', lineHeight: 1.7 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Suis et like nos pages LinkedIn — c'est 30 secondes et ça compte.
        </motion.p>

        <div className="w-full flex flex-col gap-4">
          {NETWORKS.map((n, i) => (
            <motion.a
              key={n.name}
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-2xl p-6 flex items-center gap-5 no-underline"
              style={{
                background: n.accentDim,
                border: `1px solid ${n.accentBorder}`,
                textDecoration: 'none',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -3, boxShadow: `0 0 32px ${n.accent}22` }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow */}
              <div style={{
                position: 'absolute', top: -30, right: -30,
                width: 120, height: 120, borderRadius: '50%',
                background: n.accent, opacity: 0.07,
                filter: 'blur(36px)', pointerEvents: 'none',
              }} />

              {/* LinkedIn icon */}
              <div
                className="flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ width: 52, height: 52, background: n.accentDim, border: `1px solid ${n.accentBorder}` }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={n.accent}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="font-inter" style={{ margin: 0, color: '#F5F3FF', fontWeight: 600, fontSize: '1rem' }}>
                  {n.name}
                </p>
                <p className="font-inter" style={{ margin: '1px 0 0', color: n.accent, fontSize: '0.75rem', fontWeight: 500 }}>
                  {n.handle}
                </p>
                <p className="font-inter" style={{ margin: '6px 0 0', color: '#9CA3C4', fontSize: '0.82rem', lineHeight: 1.55 }}>
                  {n.description}
                </p>
              </div>

              <span className="font-inter flex-shrink-0" style={{ color: n.accent, fontSize: '1.2rem' }}>→</span>
            </motion.a>
          ))}
        </div>

      </div>
    </Layout>
  );
}
