import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Layout from '../components/Layout';
import PathConnector from '../components/PathConnector';
import ProfileCard from '../components/ProfileCard';
import { useProfile } from '../context/UserProfileContext';

const CARDS = [
  {
    number: 1,
    icon: '🧭',
    title: 'Découvrir RISE',
    description: "Comprends enfin ce qu'est un Family Office — et ce qui rend Rise différent.",
    accent: '#A78BFA',
    route: '/discover',
  },
  {
    number: 2,
    icon: '🏛️',
    title: "Ce qu'on fait",
    description: "Aonia Ventures, Horizon 4, Idyllic Collection — l'écosystème Rise.",
    accent: '#6BCB77',
    route: '/marques',
  },
  {
    number: 3,
    icon: '🧩',
    title: 'PlayBook Rise',
    description: '8 principes qui définissent comment on bosse chez Rise.',
    accent: '#7C3AED',
    route: '/playbook',
  },
  {
    number: 4,
    icon: '🎭',
    title: "L'équipe",
    description: "Leurs rôles, leur perso, leur DISC. Tout ce qu'il faut avant de les approcher.",
    accent: '#FF8B94',
    route: '/equipe',
  },
  {
    number: 5,
    icon: '🧬',
    title: 'Test IA',
    description: "Explore nos outils IA et mets-les à l'épreuve.",
    accent: '#7DB8E8',
    route: '/ai-test',
  },
  {
    number: 6,
    icon: '🗺️',
    title: 'Checklist',
    description: 'Tes actions des premiers jours, étape par étape.',
    accent: '#FFB088',
    route: '/checklist',
  },
  {
    number: 7,
    icon: '🌱',
    title: 'Ton 1er jour',
    description: "Tout ce qu'il faut savoir avant de démarrer.",
    accent: '#C7B9F5',
    route: '/first-day',
  },
  {
    number: 8,
    icon: '👍',
    title: 'Nos réseaux',
    description: 'Suis et like les pages LinkedIn de Rise, Idyllic Collection et Mantu.',
    accent: '#FFD93D',
    route: '/socials',
  },
];

// Serpentin 8 cards :
// Desktop lg (3 cols): C1(1,1) C2(2,1) C3(3,1) — C4(3,2) C5(2,2) C6(1,2) — C7(1,3) C8(2,3)
// Tablet  sm (2 cols): C1(1,1) C2(2,1) — C3(2,2) C4(1,2) — C5(1,3) C6(2,3) — C7(2,4) C8(1,4)
const CARD_CLASSES = [
  'sm:col-start-1 sm:row-start-1 lg:col-start-1 lg:row-start-1',
  'sm:col-start-2 sm:row-start-1 lg:col-start-2 lg:row-start-1',
  'sm:col-start-2 sm:row-start-2 lg:col-start-3 lg:row-start-1',
  'sm:col-start-1 sm:row-start-2 lg:col-start-3 lg:row-start-2',
  'sm:col-start-1 sm:row-start-3 lg:col-start-2 lg:row-start-2',
  'sm:col-start-2 sm:row-start-3 lg:col-start-1 lg:row-start-2',
  'sm:col-start-2 sm:row-start-4 lg:col-start-1 lg:row-start-3',
  'sm:col-start-1 sm:row-start-4 lg:col-start-2 lg:row-start-3',
];

export default function Home() {
  const { profile } = useProfile();
  const containerRef = useRef(null);
  const cardRefs = useRef([null, null, null, null, null, null, null, null]);
  const [pathPoints, setPathPoints] = useState([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  function computePositions() {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const pts = cardRefs.current.map(ref => {
      if (!ref) return { x: 0, y: 0 };
      const r = ref.getBoundingClientRect();
      return {
        x: r.left - cRect.left + r.width / 2,
        y: r.top - cRect.top + r.height / 2,
      };
    });
    setPathPoints(pts);
    setContainerSize({ width: cRect.width, height: cRect.height });
  }

  useLayoutEffect(() => {
    computePositions();
    const observer = new ResizeObserver(computePositions);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center px-6 py-16">

        {/* Carte de profil */}
        <ProfileCard />

        {/* Hello */}
        <motion.p
          className="font-inter text-center mb-2"
          style={{ color: '#A78BFA', fontSize: '1.1rem', fontWeight: 500, letterSpacing: '0.01em' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hello {profile.firstName} 👋
        </motion.p>

        <motion.h1
          className="font-fraunces text-center mb-3"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: '#F5F3FF',
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ton parcours d'onboarding
        </motion.h1>

        <motion.p
          className="font-inter text-center mb-12 max-w-sm"
          style={{ color: '#9CA3C4', fontSize: '1rem', lineHeight: 1.7 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Huit étapes. Dans l'ordre, c'est mieux.
        </motion.p>

        {/* Serpentin grid */}
        <div
          ref={containerRef}
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 w-full max-w-5xl"
        >
          {/* SVG path connector — hidden on mobile */}
          <PathConnector
            points={pathPoints}
            width={containerSize.width}
            height={containerSize.height}
            accents={CARDS.map(c => c.accent)}
            avatarSrc={profile.photoBase64 || null}
            avatarInitials={`${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`.toUpperCase()}
          />

          {CARDS.map((card, i) => (
            <div key={card.number}>
              {/* Card with explicit serpentin placement + position ref */}
              <div
                ref={el => (cardRefs.current[i] = el)}
                className={CARD_CLASSES[i]}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <Card
                  {...card}
                  step={card.number}
                  isFirst={i === 0}
                  delay={0.2 + i * 0.1}
                />
              </div>

              {/* Mobile-only dashed vertical connector between cards */}
              {i < CARDS.length - 1 && (
                <div className="sm:hidden flex justify-start pl-8 py-1">
                  <div
                    style={{
                      width: 1,
                      height: 28,
                      borderLeft: `2px dashed ${CARDS[i + 1].accent}60`,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Jiminy ── */}
        <motion.div
          className="w-full max-w-5xl mt-8 mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(167,139,250,0.06) 100%)',
            border: '1px solid rgba(124,58,237,0.22)',
            borderRadius: 16,
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div style={{
            width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem',
            boxShadow: '0 0 20px rgba(124,58,237,0.4)',
          }}>
            🦗
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="font-fraunces" style={{ margin: 0, fontSize: '1rem', fontWeight: 500, color: '#F5F3FF' }}>
              Jiminy est là pour t'aider
            </p>
            <p className="font-inter" style={{ margin: '2px 0 0', fontSize: '0.82rem', color: '#9CA3C4', lineHeight: 1.5 }}>
              Une question sur Rise, l'équipe, ou ton onboarding ? Clique sur le 🦗 en bas à droite.
            </p>
          </div>
        </motion.div>

      </div>
    </Layout>
  );
}
