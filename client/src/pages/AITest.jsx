import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import QuestionCard from '../components/QuestionCard';
import ResultScreen from '../components/ResultScreen';
import { questions } from '../data/aiTest';

const THEMES = [
  { icon: '🧠', label: 'Culture', detail: '3 questions' },
  { icon: '🎯', label: 'Pragmatique', detail: '2 questions' },
  { icon: '🛡️', label: 'Sens critique', detail: '1 question' },
  { icon: '⚡', label: "Création d'agent", detail: '1 question' },
];

const slideVariants = {
  enter: { opacity: 0, x: 60 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};

export default function AITest() {
  const [phase, setPhase] = useState('intro'); // 'intro' | 'quiz' | 'results'
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);

  function startQuiz() {
    setCurrentIdx(0);
    setAnswers([]);
    setPhase('quiz');
  }

  function handleAnswer(answer) {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setPhase('results');
    }
  }

  function handleRetry() {
    setPhase('intro');
    setCurrentIdx(0);
    setAnswers([]);
  }

  const progressPct = ((currentIdx + 1) / questions.length) * 100;

  return (
    <Layout currentStep={2}>
      {/* Back link */}
      <div className="max-w-2xl mx-auto px-6 pt-4 pb-0">
        <Link
          to="/home"
          className="font-inter inline-flex items-center gap-1"
          style={{ color: '#9CA3C4', fontSize: '0.875rem', textDecoration: 'none' }}
        >
          ← Retour au hub
        </Link>
      </div>

      {/* INTRO */}
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            className="flex flex-col items-center px-6 py-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
          >
            <motion.h1
              className="font-fraunces text-center mb-3"
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 5rem)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: '#F5F3FF',
                lineHeight: 1.05,
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Test IA
            </motion.h1>

            <motion.p
              className="font-inter text-center mb-10 max-w-sm"
              style={{ color: '#9CA3C4', fontSize: '1.05rem', lineHeight: 1.7 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              7 questions, 6 minutes. On teste ta culture IA et ton pragmatisme.
              À la fin, tu reçois ton score Sharpness AI ⚡
            </motion.p>

            {/* Themes card */}
            <motion.div
              className="w-full rounded-2xl p-6 mb-8"
              style={{
                background: 'rgba(26,21,48,0.7)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {THEMES.map((t, i) => (
                  <motion.div
                    key={t.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(125,184,232,0.06)', border: '1px solid rgba(125,184,232,0.1)' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.35 + i * 0.07 }}
                  >
                    <span style={{ fontSize: '1.3rem' }}>{t.icon}</span>
                    <div>
                      <div className="font-inter" style={{ color: '#F5F3FF', fontWeight: 600, fontSize: '0.9rem' }}>
                        {t.label}
                      </div>
                      <div className="font-inter" style={{ color: '#9CA3C4', fontSize: '0.78rem' }}>
                        {t.detail}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Start button */}
            <motion.button
              onClick={startQuiz}
              className="font-inter px-8 py-4 rounded-xl"
              style={{
                background: '#7DB8E8',
                color: '#0F0A1F',
                fontWeight: 700,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.01em',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.55 }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(125,184,232,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              Commencer le test
            </motion.button>
          </motion.div>
        )}

        {/* QUIZ */}
        {phase === 'quiz' && (
          <motion.div
            key="quiz"
            className="max-w-2xl mx-auto px-6 pt-6 pb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="font-inter" style={{ color: '#9CA3C4', fontSize: '0.8rem' }}>
                  Question {currentIdx + 1} / {questions.length}
                </span>
                <span className="font-inter" style={{ color: '#7DB8E8', fontSize: '0.8rem', fontWeight: 600 }}>
                  {Math.round(progressPct)}%
                </span>
              </div>
              <div
                style={{
                  height: 3,
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: 99,
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  style={{ height: 3, background: '#7DB8E8', borderRadius: 99 }}
                  initial={false}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Question with slide animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <QuestionCard
                  question={questions[currentIdx]}
                  onAnswer={handleAnswer}
                  isLast={currentIdx === questions.length - 1}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* RESULTS */}
        {phase === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResultScreen answers={answers} onRetry={handleRetry} />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
