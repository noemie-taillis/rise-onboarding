import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_COLORS = {
  'Culture': '#7C3AED',
  'Pragmatique': '#7DB8E8',
  'Sens critique': '#FF8B94',
  "Création d'agent": '#FFD93D',
};

function computePoints(question, selectedIds) {
  if (question.type === 'checkbox') {
    const count = selectedIds.length;
    if (count >= 3) return 1;
    if (count === 2) return 0.5;
    return 0;
  }
  const correct = question.options.find(o => o.correct);
  return selectedIds.includes(correct.id) ? 1 : 0;
}

function computeResult(question, selectedIds) {
  if (question.type === 'checkbox') {
    const count = selectedIds.length;
    if (count >= question.minCorrect) return 'correct';
    if (count === question.minCorrect - 1) return 'partial';
    return 'incorrect';
  }
  const correct = question.options.find(o => o.correct);
  return selectedIds.includes(correct.id) ? 'correct' : 'incorrect';
}

function getOptionColors(result) {
  if (result === 'correct') return { bg: 'rgba(107,203,119,0.15)', border: '2px solid #6BCB77' };
  if (result === 'partial') return { bg: 'rgba(255,217,61,0.15)', border: '2px solid #FFD93D' };
  return { bg: 'rgba(255,107,107,0.15)', border: '2px solid #FF6B6B' };
}

export default function QuestionCard({ question, onAnswer, isLast }) {
  const [selected, setSelected] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [result, setResult] = useState(null);

  const isCheckbox = question.type === 'checkbox';
  const categoryColor = CATEGORY_COLORS[question.category] || '#7DB8E8';
  const canSubmit = selected.length > 0;

  function toggleOption(id) {
    if (showFeedback) return;
    if (isCheckbox) {
      setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    } else {
      setSelected([id]);
    }
  }

  function handleSubmit() {
    if (showFeedback) {
      onAnswer({ questionId: question.id, selectedIds: selected, points: computePoints(question, selected) });
      return;
    }
    setResult(computeResult(question, selected));
    setShowFeedback(true);
  }

  function getOptionStyle(option) {
    const isSelected = selected.includes(option.id);

    if (!showFeedback) {
      return {
        background: isSelected ? 'rgba(125,184,232,0.15)' : '#1A1530',
        border: isSelected ? '2px solid #7DB8E8' : '1px solid rgba(255,255,255,0.05)',
        cursor: 'pointer',
      };
    }

    if (isCheckbox) {
      if (isSelected) {
        const colors = getOptionColors(result);
        return { background: colors.bg, border: colors.border, cursor: 'default' };
      }
      return { background: '#1A1530', border: '1px solid rgba(107,203,119,0.35)', cursor: 'default' };
    }

    // MCQ
    if (isSelected) {
      return option.correct
        ? { background: 'rgba(107,203,119,0.15)', border: '2px solid #6BCB77', cursor: 'default' }
        : { background: 'rgba(255,107,107,0.15)', border: '2px solid #FF6B6B', cursor: 'default' };
    }
    if (option.correct) {
      return { background: '#1A1530', border: '1px solid rgba(107,203,119,0.45)', cursor: 'default' };
    }
    return { background: '#1A1530', border: '1px solid rgba(255,255,255,0.04)', opacity: 0.45, cursor: 'default' };
  }

  return (
    <div>
      {/* Category pill */}
      <div className="mb-5">
        <span
          className="font-inter text-sm px-3 py-1 rounded-full"
          style={{
            background: `${categoryColor}20`,
            color: categoryColor,
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          {question.category}
        </span>
      </div>

      {/* Question */}
      <h2
        className="font-fraunces mb-7"
        style={{
          fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)',
          color: '#F5F3FF',
          lineHeight: 1.35,
          fontWeight: 500,
        }}
      >
        {question.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3 mb-6">
        {question.options.map(option => {
          const isSelected = selected.includes(option.id);
          const style = getOptionStyle(option);

          return (
            <motion.div
              key={option.id}
              onClick={() => toggleOption(option.id)}
              className="flex items-center gap-4 px-5 py-4 rounded-xl"
              style={{ ...style, transition: 'all 0.2s ease' }}
              whileHover={
                !showFeedback
                  ? { borderColor: '#7DB8E8', boxShadow: '0 0 14px rgba(125,184,232,0.18)' }
                  : {}
              }
            >
              {/* Indicator (checkbox square or radio circle) */}
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: isCheckbox ? 4 : '50%',
                  border: isSelected ? '2px solid #7DB8E8' : '2px solid rgba(255,255,255,0.2)',
                  background: isSelected ? '#7DB8E8' : 'transparent',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      width: isCheckbox ? 9 : 7,
                      height: isCheckbox ? 9 : 7,
                      borderRadius: isCheckbox ? 2 : '50%',
                      background: '#0F0A1F',
                    }}
                  />
                )}
              </div>

              <span className="font-inter" style={{ color: '#F5F3FF', fontSize: '0.95rem', lineHeight: 1.55 }}>
                {option.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Explanation block */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex gap-3 items-start px-5 py-4 rounded-xl mb-6"
            style={{
              background: 'rgba(125,184,232,0.08)',
              border: '1px solid rgba(125,184,232,0.28)',
            }}
          >
            <span style={{ color: '#7DB8E8', fontSize: '1rem', flexShrink: 0, marginTop: 1 }}>✦</span>
            <p
              className="font-inter"
              style={{ color: '#9CA3C4', fontSize: '0.9rem', lineHeight: 1.7, fontStyle: 'italic' }}
            >
              {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <div className="flex justify-end">
        <motion.button
          onClick={handleSubmit}
          disabled={!showFeedback && !canSubmit}
          className="font-inter px-6 py-3 rounded-xl"
          style={{
            background: !showFeedback && !canSubmit ? 'rgba(125,184,232,0.18)' : '#7DB8E8',
            color: !showFeedback && !canSubmit ? 'rgba(125,184,232,0.4)' : '#0F0A1F',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: !showFeedback && !canSubmit ? 'not-allowed' : 'pointer',
            border: 'none',
            outline: 'none',
            transition: 'all 0.2s ease',
          }}
          whileHover={showFeedback || canSubmit ? { scale: 1.02 } : {}}
          whileTap={showFeedback || canSubmit ? { scale: 0.97 } : {}}
        >
          {showFeedback
            ? isLast
              ? 'Voir mes résultats →'
              : 'Question suivante →'
            : 'Suivant →'}
        </motion.button>
      </div>
    </div>
  );
}
