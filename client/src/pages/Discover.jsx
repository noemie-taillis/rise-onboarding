import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import ChapterNav from '../components/ChapterNav';
import Chapter1FamilyOffice from '../chapters/Chapter1FamilyOffice';
import Chapter2Mantu        from '../chapters/Chapter2Mantu';
import Chapter3Brourhant    from '../chapters/Chapter3Brourhant';

const SOMMAIRE_ITEMS = [
  '01 — Family Office',
  '02 — Mantu',
  '03 — Les Brourhant',
];

const CHAPTER_COMPONENTS = [
  Chapter1FamilyOffice,
  Chapter2Mantu,
  Chapter3Brourhant,
];

const slideVariants = {
  enter:  (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
};

const ease = [0.25, 0.46, 0.45, 0.94];

export default function Discover() {
  const [showSommaire, setShowSommaire] = useState(true);
  const [chapter, setChapter]           = useState(0);
  const [direction, setDirection]       = useState(1);

  /* Bascule automatique vers chapitre 1 après 2.5s */
  useEffect(() => {
    const t = setTimeout(() => setShowSommaire(false), 2500);
    return () => clearTimeout(t);
  }, []);

  /* Navigation clavier */
  useEffect(() => {
    if (showSommaire) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight' && chapter < 2) changeChapter(chapter + 1);
      if (e.key === 'ArrowLeft'  && chapter > 0) changeChapter(chapter - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showSommaire, chapter]);

  const changeChapter = (next) => {
    setDirection(next > chapter ? 1 : -1);
    setChapter(next);
  };

  const CurrentChapter = CHAPTER_COMPONENTS[chapter];

  return (
    <Layout currentStep={0}>
      <AnimatePresence mode="wait">

        {/* ── Sommaire ── */}
        {showSommaire && (
          <motion.div
            key="sommaire"
            className="flex flex-col justify-center px-10 md:px-20"
            style={{ minHeight: 'calc(100vh - 72px)', position: 'relative', zIndex: 2 }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.4, ease } }}
          >
            {SOMMAIRE_ITEMS.map((item, i) => (
              <motion.p
                key={item}
                className="font-fraunces"
                style={{
                  fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)',
                  fontWeight: 400,
                  color: `rgba(245, 243, 255, ${1 - i * 0.08})`,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.45,
                  marginBottom: '0.4rem',
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.55, ease }}
              >
                {item}
              </motion.p>
            ))}
          </motion.div>
        )}

        {/* ── Chapitres ── */}
        {!showSommaire && (
          <motion.div
            key="chapters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease }}
          >
            <ChapterNav current={chapter} onChange={changeChapter} />

            {/* overflow hidden pour que les slides ne débordent pas */}
            <div style={{ overflow: 'hidden' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={chapter}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <CurrentChapter />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </Layout>
  );
}
