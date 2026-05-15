import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import ChecklistItem from '../components/ChecklistItem';
import ProgressBar from '../components/ProgressBar';
import CompletionCelebration from '../components/CompletionCelebration';
import { CHECKLIST_ITEMS } from '../data/checklist';

const STORAGE_KEY = 'rise-onboarding-checklist';
const ACCENT = '#FFB088';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function Checklist() {
  const [checked, setChecked] = useState(loadState);
  const [showCelebration, setShowCelebration] = useState(false);
  const [alreadyCelebrated, setAlreadyCelebrated] = useState(false);

  const done = CHECKLIST_ITEMS.filter(item => checked[item.id]).length;
  const total = CHECKLIST_ITEMS.length;
  const allDone = done === total;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    if (allDone && !alreadyCelebrated) {
      const t = setTimeout(() => {
        setShowCelebration(true);
        setAlreadyCelebrated(true);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [allDone, alreadyCelebrated]);

  function toggle(id) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function handleReset() {
    if (window.confirm('Remettre toute la checklist à zéro ?')) {
      setChecked({});
      setAlreadyCelebrated(false);
    }
  }

  return (
    <Layout currentStep={4}>
      <div className="flex flex-col items-center px-6 py-10 max-w-2xl mx-auto">

        {/* Title */}
        <motion.h1
          className="font-fraunces text-center mb-3 w-full"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: '#F5F3FF',
            lineHeight: 1.05,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          Checklist
        </motion.h1>

        <motion.p
          className="font-inter text-center mb-10 max-w-sm"
          style={{ color: '#9CA3C4', fontSize: '1.05rem', lineHeight: 1.7 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          7 trucs à faire. Tu peux pas rater, c'est en ordre.
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="w-full mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22 }}
        >
          <ProgressBar done={done} total={total} />
        </motion.div>

        {/* All-done banner */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              className="w-full rounded-2xl px-6 py-4 mb-6 flex items-center gap-3"
              style={{
                background: 'rgba(255,176,136,0.1)',
                border: '1px solid rgba(255,176,136,0.3)',
              }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <span style={{ fontSize: '1.4rem' }}>🎉</span>
              <div>
                <p className="font-inter" style={{ margin: 0, fontWeight: 600, color: ACCENT, fontSize: '0.9rem' }}>
                  Checklist complète !
                </p>
                <p className="font-inter" style={{ margin: 0, color: '#9CA3C4', fontSize: '0.78rem' }}>
                  Tu peux aller voir ton planning du premier jour.
                </p>
              </div>
              <motion.button
                onClick={() => setShowCelebration(true)}
                className="font-inter ml-auto rounded-xl"
                style={{
                  padding: '6px 14px',
                  background: ACCENT,
                  color: '#0F0A1F',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Jour J →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Items */}
        <div className="w-full flex flex-col gap-3">
          {CHECKLIST_ITEMS.map((item, i) => (
            <ChecklistItem
              key={item.id}
              item={item}
              checked={!!checked[item.id]}
              onToggle={toggle}
              delay={0.28 + i * 0.07}
            />
          ))}
        </div>

        {/* Reset */}
        {done > 0 && (
          <motion.button
            onClick={handleReset}
            className="font-inter mt-10"
            style={{
              color: 'rgba(156,163,196,0.45)',
              fontSize: '0.75rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ color: '#9CA3C4' }}
          >
            Tout réinitialiser
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showCelebration && (
          <CompletionCelebration onClose={() => setShowCelebration(false)} />
        )}
      </AnimatePresence>
    </Layout>
  );
}
