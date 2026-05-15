import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Lock, Train, Bus, Car, ClipboardCopy, Check } from 'lucide-react';
import Layout from '../components/Layout';
import InfoBlock from '../components/InfoBlock';
import PersonCard from '../components/PersonCard';
import PersonDrawer from '../components/PersonDrawer';
import { getPersonById } from '../data/team';
import { FIRST_DAY_PEOPLE_IDS } from '../data/firstDay';

const ACCENT = '#C7B9F5';

const TRANSPORT = [
  {
    icon: Train,
    title: 'En train',
    text: "Léman Express, arrêt Chêne-Bourg. Tu sors de la gare, le bureau est à 30 secondes à pied, juste sur la place.",
  },
  {
    icon: Bus,
    title: 'En tram',
    text: "Tram 17, arrêt Place Favre. 5 min à pied jusqu'à la gare.",
  },
  {
    icon: Car,
    title: 'En voiture',
    text: "Parking de la gare juste à côté. Vérifie les conditions de stationnement avant.",
  },
];

const CONFETTI = [
  { left: '28%', delay: 0,    size: '1.1rem' },
  { left: '44%', delay: 0.1,  size: '0.85rem' },
  { left: '59%', delay: 0.22, size: '1rem' },
  { left: '71%', delay: 0.06, size: '0.9rem' },
];

function AlexisPlaceholder() {
  return (
    <div
      style={{
        background: '#1A1530',
        border: '1px dashed rgba(199,185,245,0.3)',
        borderRadius: 10,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        opacity: 0.55,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          border: '2px dashed rgba(199,185,245,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: ACCENT,
          fontFamily: 'Inter, sans-serif',
          flexShrink: 0,
        }}
      >
        AX
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 600, color: '#F5F3FF', fontFamily: 'Inter, sans-serif' }}>
          Alexis
        </p>
        <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#9CA3C4', fontFamily: 'Inter, sans-serif' }}>
          À compléter
        </p>
      </div>
    </div>
  );
}

export default function FirstDay() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  const people = FIRST_DAY_PEOPLE_IDS.map(id => getPersonById(id)).filter(Boolean);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 2400);
    return () => clearTimeout(t);
  }, []);

  function copyCode() {
    navigator.clipboard.writeText('2539');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Layout currentStep={5}>

      {/* Confetti lavande au premier chargement */}
      <AnimatePresence>
        {showConfetti && CONFETTI.map((c, i) => (
          <motion.div
            key={i}
            style={{
              position: 'fixed',
              left: c.left,
              top: '42%',
              fontSize: c.size,
              color: ACCENT,
              pointerEvents: 'none',
              zIndex: 200,
            }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -140, opacity: 0 }}
            transition={{ delay: c.delay, duration: 1.7, ease: 'easeOut' }}
          >
            ✦
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="flex flex-col items-center px-6 py-12 w-full max-w-4xl mx-auto">

        {/* Back */}
        <div className="w-full mb-8">
          <Link
            to="/home"
            className="font-inter inline-flex items-center gap-1"
            style={{ color: '#9CA3C4', fontSize: '0.875rem', textDecoration: 'none' }}
          >
            ← Retour au hub
          </Link>
        </div>

        {/* Titre */}
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
          transition={{ duration: 0.6 }}
        >
          Ton 1er jour
        </motion.h1>

        <motion.p
          className="font-inter text-center mb-12 max-w-sm"
          style={{ color: '#9CA3C4', fontSize: '1.05rem', lineHeight: 1.7 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Tout ce qu'il te faut pour ne pas arriver comme un touriste.
        </motion.p>

        {/* ── Section 1 : L'essentiel ── */}
        <motion.div
          className="w-full mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="relative rounded-2xl p-8 overflow-hidden"
            style={{
              background: '#1A1530',
              border: '1px solid rgba(199,185,245,0.28)',
            }}
          >
            {/* Halo lavande discret */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                height: 280,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(199,185,245,0.16) 0%, transparent 70%)',
                filter: 'blur(50px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* 3 blocs en ligne */}
            <div
              className="relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0"
              style={{ zIndex: 1 }}
            >
              {/* Adresse */}
              <div className="flex-1 min-w-0">
                <InfoBlock
                  icon={MapPin}
                  label="Adresse"
                  value="4 place de la Gare"
                  sub="Chêne-Bourg"
                  accent={ACCENT}
                  delay={0.38}
                />
              </div>

              {/* Dividers */}
              <div className="hidden md:block self-stretch" style={{ width: 1, background: 'rgba(199,185,245,0.14)', margin: '0 12px' }} />
              <div className="md:hidden w-full" style={{ height: 1, background: 'rgba(199,185,245,0.1)' }} />

              {/* Heure */}
              <div className="flex-1 min-w-0">
                <InfoBlock
                  icon={Clock}
                  label="Rendez-vous"
                  value="9h00"
                  sub="Ne t'inquiète pas si tu as 5 min de retard 😉"
                  accent={ACCENT}
                  delay={0.52}
                />
              </div>

              <div className="hidden md:block self-stretch" style={{ width: 1, background: 'rgba(199,185,245,0.14)', margin: '0 12px' }} />
              <div className="md:hidden w-full" style={{ height: 1, background: 'rgba(199,185,245,0.1)' }} />

              {/* Code */}
              <div className="flex-1 min-w-0">
                <InfoBlock
                  icon={Lock}
                  label="Code d'entrée"
                  value="2539"
                  mono
                  accent={ACCENT}
                  delay={0.66}
                >
                  <motion.button
                    onClick={copyCode}
                    className="flex items-center gap-1 rounded-lg font-inter"
                    style={{
                      padding: '4px 8px',
                      background: copied ? 'rgba(107,203,119,0.15)' : 'rgba(199,185,245,0.1)',
                      border: `1px solid ${copied ? 'rgba(107,203,119,0.4)' : 'rgba(199,185,245,0.25)'}`,
                      color: copied ? '#6BCB77' : ACCENT,
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.span
                          key="ok"
                          className="flex items-center gap-1"
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check size={11} />
                          Copié !
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          className="flex items-center gap-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <ClipboardCopy size={11} />
                          Copier
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </InfoBlock>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Section 2 : Comment venir ── */}
        <motion.div
          className="w-full mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2
            className="font-fraunces mb-2"
            style={{ color: '#F5F3FF', fontSize: 'clamp(1.35rem, 3vw, 1.7rem)', fontWeight: 500 }}
          >
            Comment venir 🚉
          </h2>
          <p className="font-inter mb-6" style={{ color: '#9CA3C4', fontSize: '0.95rem', lineHeight: 1.65 }}>
            Le bureau est juste en face de la gare de Chêne-Bourg, super pratique.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TRANSPORT.map((t, i) => (
              <motion.div
                key={t.title}
                className="rounded-xl p-5"
                style={{
                  background: '#1A1530',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.46 + i * 0.08 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <t.icon size={15} color={ACCENT} strokeWidth={1.8} />
                  <span className="font-inter" style={{ color: '#F5F3FF', fontWeight: 600, fontSize: '0.88rem' }}>
                    {t.title}
                  </span>
                </div>
                <p className="font-inter" style={{ color: '#9CA3C4', fontSize: '0.82rem', lineHeight: 1.65 }}>
                  {t.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Section 3 : Qui tu vas rencontrer ── */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <h2
            className="font-fraunces mb-2"
            style={{ color: '#F5F3FF', fontSize: 'clamp(1.35rem, 3vw, 1.7rem)', fontWeight: 500 }}
          >
            Qui tu vas rencontrer sur place 👋
          </h2>
          <p className="font-inter mb-6" style={{ color: '#9CA3C4', fontSize: '0.95rem', lineHeight: 1.65 }}>
            L'équipe Chêne-Bourg t'attend. Clique sur quelqu'un pour en savoir plus.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {people.map((person, i) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.6 + i * 0.06 }}
              >
                <PersonCard person={person} onClick={setSelectedPerson} />
              </motion.div>
            ))}

            {/* Alexis — placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.6 + people.length * 0.06 }}
            >
              <AlexisPlaceholder />
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Drawer personne */}
      <PersonDrawer
        person={selectedPerson}
        onClose={() => setSelectedPerson(null)}
        onNavigate={p => setSelectedPerson(p)}
      />
    </Layout>
  );
}
