import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chapter from '../components/Chapter';
import { PLAYBOOK_CATEGORIES } from '../data/playbook';

const ease = [0.25, 0.46, 0.45, 0.94];

/* ── Construit la séquence aplatie règles + sous-puces ── */
function buildSequence(rules) {
  const items = [];
  let num = 1;
  rules.forEach((rule) => {
    items.push({ type: 'rule', text: rule.text, num: num++ });
    rule.subs.forEach((sub) => items.push({ type: 'sub', text: sub }));
  });
  return items;
}

/* ── Composant typewriter séquentiel ── */
function PlaybookTypewriter({ rules }) {
  const [step, setStep]   = useState(0);
  const [typed, setTyped] = useState('');
  const [shown, setShown] = useState([]);

  // La séquence est calculée une fois au montage
  const [sequence] = useState(() => buildSequence(rules));

  useEffect(() => {
    if (step >= sequence.length) return;

    const item  = sequence[step];
    const speed = item.type === 'rule' ? 18 : 11;
    let charIdx = 0;
    setTyped('');

    // Légère pause avant la première règle
    const startDelay = step === 0 ? 250 : 0;

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        charIdx++;
        setTyped(item.text.slice(0, charIdx));

        if (charIdx >= item.text.length) {
          clearInterval(interval);
          setShown((prev) => [...prev, item]);
          setTyped('');
          // Pause entre items : plus longue après une règle principale
          const pause = item.type === 'rule' ? 420 : 200;
          setTimeout(() => setStep((s) => s + 1), pause);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const currentItem = step < sequence.length ? sequence[step] : null;

  return (
    <div className="font-inter" style={{ lineHeight: 1.85 }}>
      {/* Items terminés */}
      {shown.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginBottom: item.type === 'rule' ? 20 : 6 }}
        >
          {item.type === 'rule' ? (
            <p style={{ color: '#F5F3FF', fontSize: '0.95rem' }}>
              <span style={{ color: '#7C3AED', fontWeight: 700, marginRight: 10 }}>
                {item.num}.
              </span>
              {item.text}
            </p>
          ) : (
            <p style={{ color: '#9CA3C4', fontSize: '0.9rem', paddingLeft: 28 }}>
              <span style={{ color: '#A78BFA', marginRight: 8 }}>→</span>
              {item.text}
            </p>
          )}
        </motion.div>
      ))}

      {/* Item en cours de frappe */}
      {currentItem && (
        <div style={{ marginBottom: currentItem.type === 'rule' ? 20 : 6 }}>
          {currentItem.type === 'rule' ? (
            <p style={{ color: '#F5F3FF', fontSize: '0.95rem' }}>
              <span style={{ color: '#7C3AED', fontWeight: 700, marginRight: 10 }}>
                {currentItem.num}.
              </span>
              {typed}
              <span className="cursor" style={{ color: '#A78BFA' }}>|</span>
            </p>
          ) : (
            <p style={{ color: '#9CA3C4', fontSize: '0.9rem', paddingLeft: 28 }}>
              <span style={{ color: '#A78BFA', marginRight: 8 }}>→</span>
              {typed}
              <span className="cursor" style={{ color: '#A78BFA' }}>|</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Chapitre 4 ── */
export default function Chapter4Playbook() {
  const [selectedCat, setSelectedCat] = useState(0);

  const category = PLAYBOOK_CATEGORIES[selectedCat];
  const hasRules  = category.rules.length > 0;

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
        Le Playbook RISE
      </motion.h1>

      <motion.p
        className="font-inter mb-8"
        style={{ color: '#9CA3C4', fontSize: '1rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Notre manière de bosser, en 8 principes.
      </motion.p>

      {/* Pills catégories */}
      <motion.div
        className="flex flex-wrap gap-2 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {PLAYBOOK_CATEGORIES.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(i)}
            className="font-inter rounded-full"
            style={{
              padding: '8px 18px',
              fontSize: '0.82rem',
              fontWeight: 500,
              background: i === selectedCat ? '#7C3AED' : 'rgba(124,58,237,0.18)',
              color: '#F5F3FF',
              border: `1px solid ${i === selectedCat ? '#7C3AED' : 'rgba(124,58,237,0.3)'}`,
              cursor: 'pointer',
              transition: 'background 0.2s ease, border-color 0.2s ease',
              letterSpacing: '0.01em',
            }}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Zone contenu */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCat}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          className="max-w-2xl"
        >
          {hasRules ? (
            <PlaybookTypewriter key={`tw-${selectedCat}`} rules={category.rules} />
          ) : (
            <p
              className="font-inter"
              style={{ color: '#9CA3C4', fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.75 }}
            >
              Contenu à venir pour cette catégorie.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </Chapter>
  );
}
