import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Layout from '../components/Layout';

const CARDS = [
  {
    number: 1,
    title: 'Découvrir RISE',
    description: 'La culture, les valeurs, et ce qui rend Rise unique.',
    accent: '#A78BFA',
    route: '/discover',
  },
  {
    number: 2,
    title: "L'équipe",
    description: 'Qui fait quoi, les canaux de communication, les rituels.',
    accent: '#FF8B94',
    route: '/equipe',
  },
  {
    number: 3,
    title: 'Test IA',
    description: "Explore nos outils IA et mets-les à l'épreuve.",
    accent: '#7DB8E8',
    route: '/ai-test',
  },
  {
    number: 4,
    title: 'Checklist',
    description: 'Tes actions des premiers jours, étape par étape.',
    accent: '#FFB088',
    route: '/checklist',
  },
  {
    number: 5,
    title: 'Ton 1er jour',
    description: "Tout ce qu'il faut savoir avant de démarrer.",
    accent: '#C7B9F5',
    route: '/first-day',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col items-center px-6 py-16">
        <motion.p
          className="font-inter text-center mb-2"
          style={{ color: '#A78BFA', fontSize: '1.1rem', fontWeight: 500, letterSpacing: '0.01em' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Bienvenue Léa ! Tu démarres à Lisbonne le 15 juillet !
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
          Cinq étapes pour être opérationnel dès le premier jour.
        </motion.p>

        {/* 2-col grid, 5e card centrée sur la dernière rangée */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
          {CARDS.slice(0, 4).map((card, i) => (
            <Card key={card.number} {...card} delay={0.2 + i * 0.08} />
          ))}
          <div className="md:col-span-2 flex justify-center">
            <div className="w-full md:w-[calc(50%-10px)]">
              <Card {...CARDS[4]} delay={0.52} />
            </div>
          </div>
        </div>

        {/* ── PlayBook Rise ── */}
        <motion.div
          className="w-full max-w-2xl mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.68 }}
        >
          {/* Séparateur */}
          <div className="flex items-center gap-4 mb-6">
            <div style={{ flex: 1, height: 1, background: 'rgba(124, 58, 237, 0.2)' }} />
            <span
              className="font-inter"
              style={{ color: '#7C3AED', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}
            >
              Ressource
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(124, 58, 237, 0.2)' }} />
          </div>

          {/* Encart PlayBook */}
          <motion.div
            onClick={() => navigate('/playbook')}
            className="relative cursor-pointer rounded-2xl p-7 w-full"
            style={{
              background: 'linear-gradient(135deg, #1A1530 0%, #1E1538 100%)',
              border: '1px solid rgba(124, 58, 237, 0.25)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.74, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{
              boxShadow: '0 0 48px rgba(124, 58, 237, 0.22)',
              borderColor: 'rgba(124, 58, 237, 0.5)',
              y: -4,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-5">
              {/* Icône */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{ width: 48, height: 48, background: 'rgba(124, 58, 237, 0.2)' }}
              >
                <span style={{ fontSize: '1.3rem' }}>📖</span>
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="font-inter mb-0.5"
                  style={{ color: '#A78BFA', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                >
                  PlayBook Rise
                </p>
                <h3
                  className="font-fraunces mb-2"
                  style={{ color: '#F5F3FF', fontWeight: 500, fontSize: '1.2rem', letterSpacing: '-0.01em' }}
                >
                  Notre manière de bosser
                </h3>
                <p
                  className="font-inter"
                  style={{ color: '#9CA3C4', fontSize: '0.875rem', lineHeight: 1.65 }}
                >
                  8 principes qui définissent la culture RISE — orientation, exécution, communication et posture.
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div
              className="absolute bottom-5 right-6 font-inter"
              style={{ color: '#7C3AED', fontSize: '1.1rem' }}
            >
              →
            </div>
          </motion.div>
        </motion.div>

      </div>
    </Layout>
  );
}
