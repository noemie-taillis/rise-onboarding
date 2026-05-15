import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chapter from '../components/Chapter';

const DEFINITION =
  "Un Family Office est une équipe dédiée à la gestion financière globale pour des familles fortunées — patrimoine, investissements, règlement des charges et planification successorale.";

const SECONDARY =
  "C'est le gold standard de la gestion de patrimoine, avec une approche sur-mesure pour préserver et valoriser l'héritage financier familial.";

const DEF_WORDS = DEFINITION.split(' ');
// Delay after which secondary text + source appear (last word + buffer)
const SEC_DELAY = 0.45 + DEF_WORDS.length * 0.03 + 0.2;

const KEYWORDS = [
  { text: 'patrimoine',       top: '18%',   right: '7%',   dur: 5.2 },
  { text: 'investissements',  top: '36%',   right: '4%',   dur: 6.1 },
  { text: 'héritage',         top: '55%',   right: '6%',   dur: 4.8 },
  { text: 'sur-mesure',       bottom: '25%', left: '3%',   dur: 7.0 },
  { text: 'gold standard',    bottom: '12%', right: '8%',  dur: 5.7 },
];

const ease = [0.25, 0.46, 0.45, 0.94];

export default function Chapter1FamilyOffice() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <Chapter>
      <AnimatePresence mode="wait">
        {!revealed ? (
          /* ── Hero : titre centré XXL ── */
          <motion.div
            key="hero"
            className="flex items-center justify-center"
            style={{ minHeight: 'calc(100vh - 180px)' }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.4, ease } }}
          >
            <motion.h1
              className="font-fraunces text-center"
              style={{
                fontSize: 'clamp(4rem, 10vw, 7rem)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: '#F5F3FF',
                textShadow: '0 0 80px rgba(124,58,237,0.35)',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease }}
            >
              Family Office
            </motion.h1>
          </motion.div>
        ) : (
          /* ── Contenu révélé ── */
          <motion.div
            key="content"
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease }}
          >
            {/* Titre réduit, haut gauche */}
            <h1
              className="font-fraunces mb-8"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: '#F5F3FF',
              }}
            >
              Family Office
            </h1>

            {/* Définition mot par mot */}
            <div className="mb-6 max-w-2xl">
              <p className="font-inter" style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#F5F3FF' }}>
                {DEF_WORDS.map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    style={{ marginRight: '0.28em' }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.03, duration: 0.22, ease: 'easeOut' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </div>

            {/* Phrase secondaire */}
            <motion.p
              className="font-inter max-w-2xl mb-6"
              style={{ fontSize: '1.05rem', lineHeight: 1.78, color: '#9CA3C4', fontStyle: 'italic' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: SEC_DELAY, duration: 0.6 }}
            >
              {SECONDARY}
            </motion.p>

            {/* Mots-clés flottants (desktop seulement) */}
            <div className="hidden md:block absolute inset-0 pointer-events-none">
              {KEYWORDS.map(({ text, dur, ...pos }, i) => (
                <motion.span
                  key={text}
                  className="absolute font-inter rounded-full"
                  style={{
                    ...pos,
                    padding: '8px 18px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    background: 'rgba(124, 58, 237, 0.18)',
                    border: '1px solid rgba(124, 58, 237, 0.38)',
                    color: '#A78BFA',
                    whiteSpace: 'nowrap',
                    animation: `kw-float ${dur}s ease-in-out infinite`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: SEC_DELAY + 0.1 + i * 0.12, duration: 0.5 }}
                >
                  {text}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Chapter>
  );
}
