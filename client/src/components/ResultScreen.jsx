import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { questions } from '../data/aiTest';

function getBadge(score) {
  if (score >= 70) return { label: 'Sharp AI Ready ⚡', color: '#6BCB77', bg: 'rgba(107,203,119,0.15)', border: 'rgba(107,203,119,0.4)' };
  if (score >= 40) return { label: 'Bonne base 🌱', color: '#FFD93D', bg: 'rgba(255,217,61,0.15)', border: 'rgba(255,217,61,0.4)' };
  return { label: "On t'accompagne 🤝", color: '#FF8B94', bg: 'rgba(255,139,148,0.15)', border: 'rgba(255,139,148,0.4)' };
}

function getMessage(score) {
  if (score >= 70)
    return "File créer ton premier agent dans Dust. Tu maîtrises les bases, à toi de jouer maintenant !";
  if (score >= 40)
    return "Bonne base. On t'invite à explorer Dust et à lire le RISE AI Playbook pour aller plus loin.";
  return "Pas de panique — la formation Dust est planifiée dans ton onboarding. Tu seras à l'aise très vite.";
}

function getAnswerStatus(ans) {
  if (ans.points === 1) return { color: '#6BCB77', label: '✓' };
  if (ans.points === 0.5) return { color: '#FFD93D', label: '~' };
  return { color: '#FF6B6B', label: '✗' };
}

export default function ResultScreen({ answers, onRetry }) {
  const totalRaw = answers.reduce((sum, a) => sum + a.points, 0);
  const score = Math.round((totalRaw / 7) * 100);
  const badge = getBadge(score);
  const message = getMessage(score);

  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const start = Date.now();

    function tick() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(tick);
    }

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  return (
    <motion.div
      className="flex flex-col items-center px-6 py-12 max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Score counter */}
      <motion.div
        className="flex flex-col items-center mb-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span
          className="font-fraunces"
          style={{ fontSize: 'clamp(5rem, 16vw, 8rem)', color: '#7DB8E8', lineHeight: 1, fontWeight: 500 }}
        >
          {displayScore}
        </span>
        <span className="font-inter" style={{ color: '#9CA3C4', fontSize: '1.25rem', marginTop: -4 }}>
          / 100
        </span>
        <span className="font-inter" style={{ color: '#9CA3C4', fontSize: '0.85rem', letterSpacing: '0.12em', marginTop: 8, textTransform: 'uppercase' }}>
          Sharpness AI Score
        </span>
      </motion.div>

      {/* Badge */}
      <motion.div
        className="font-inter px-5 py-2 rounded-full mb-4"
        style={{
          background: badge.bg,
          border: `1px solid ${badge.border}`,
          color: badge.color,
          fontWeight: 700,
          fontSize: '1rem',
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.5 }}
      >
        {badge.label}
      </motion.div>

      {/* Personal message */}
      <motion.p
        className="font-inter text-center mb-10 max-w-md"
        style={{ color: '#9CA3C4', fontSize: '0.95rem', lineHeight: 1.7 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.65 }}
      >
        {message}
      </motion.p>

      {/* Recap cards */}
      <div className="w-full flex flex-col gap-2 mb-10">
        {answers.map((ans, i) => {
          const q = questions.find(q => q.id === ans.questionId);
          const status = getAnswerStatus(ans);
          return (
            <motion.div
              key={ans.questionId}
              className="flex items-center gap-4 px-4 py-3 rounded-xl"
              style={{ background: '#1A1530', border: '1px solid rgba(255,255,255,0.05)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.7 + i * 0.07 }}
            >
              {/* Status dot */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: `${status.color}22`,
                  border: `1.5px solid ${status.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: status.color,
                  fontWeight: 700,
                  fontSize: '0.8rem',
                }}
              >
                {status.label}
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className="font-inter block truncate"
                  style={{ color: '#9CA3C4', fontSize: '0.8rem', marginBottom: 1 }}
                >
                  Q{i + 1} · {q.category}
                </span>
                <span
                  className="font-inter block"
                  style={{
                    color: '#F5F3FF',
                    fontSize: '0.88rem',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {q.question}
                </span>
              </div>
              <span className="font-inter" style={{ color: status.color, fontSize: '0.8rem', fontWeight: 600, flexShrink: 0 }}>
                {ans.points === 0.5 ? '½ pt' : ans.points === 1 ? '1 pt' : '0 pt'}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* CTAs */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 w-full justify-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 1.25 }}
      >
        <a
          href="https://dust.tt"
          target="_blank"
          rel="noreferrer"
          className="font-inter text-center px-6 py-3 rounded-xl"
          style={{
            background: '#7DB8E8',
            color: '#0F0A1F',
            fontWeight: 600,
            fontSize: '0.95rem',
            textDecoration: 'none',
          }}
        >
          → Ouvrir Dust et créer mon agent
        </a>
        <button
          onClick={onRetry}
          className="font-inter px-6 py-3 rounded-xl"
          style={{
            background: 'transparent',
            border: '1px solid rgba(125,184,232,0.4)',
            color: '#7DB8E8',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
          }}
        >
          Refaire le test
        </button>
      </motion.div>
    </motion.div>
  );
}
