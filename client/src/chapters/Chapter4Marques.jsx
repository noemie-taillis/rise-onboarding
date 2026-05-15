import { motion } from 'framer-motion';

const BRANDS = [
  {
    category: 'Venture Capital',
    name: 'Aonia Ventures',
    tagline: 'On mise sur les fondateurs qui changent des industries.',
    description:
      "Aonia, c'est le bras VC de Rise. On investit en early stage dans des startups à fort potentiel — des équipes qui construisent quelque chose de solide, avec une vision longue.",
    accent: '#A78BFA',
    accentDim: 'rgba(167,139,250,0.12)',
    accentBorder: 'rgba(167,139,250,0.22)',
    icon: '◈',
    tags: ['Early Stage', 'Deep Tech', 'B2B'],
  },
  {
    category: 'Immobilier',
    name: 'Horizon 4',
    tagline: "L'immobilier de demain, pensé sur le long terme.",
    description:
      'Horizon 4 pilote les actifs immobiliers de la famille. Acquisitions, gestion de patrimoine, valorisation — on joue sur la durée, pas sur la spéculation rapide.',
    accent: '#7DB8E8',
    accentDim: 'rgba(125,184,232,0.1)',
    accentBorder: 'rgba(125,184,232,0.2)',
    icon: '⬡',
    tags: ['Portugal', 'Résidentiel', 'Patrimoine'],
  },
  {
    category: 'Parahotellerie',
    name: 'Idyllic Collection',
    tagline: 'Des expériences de séjour qui restent.',
    description:
      "Idyllic Collection, c'est la branche hospitality. Locations haut de gamme, villas et appartements d'exception — on gère l'expérience de bout en bout.",
    accent: '#FFB088',
    accentDim: 'rgba(255,176,136,0.1)',
    accentBorder: 'rgba(255,176,136,0.2)',
    icon: '✦',
    tags: ['Lisbonne', 'Haut de gamme', 'Locations'],
  },
];

const SECONDARY = [
  { name: 'Startup Studio', desc: 'On co-crée des boîtes from scratch avec des entrepreneurs.', accent: '#6BCB77' },
  { name: 'DriveXChange', desc: 'Location de voitures premium.', accent: '#FFD93D' },
  { name: 'Mantu', desc: 'Cabinet de conseil en transformation digitale & innovation.', accent: '#FF8B94' },
];

export default function Chapter4Marques() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pb-20">

      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-inter mb-2" style={{ color: '#7C3AED', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          L'écosystème Rise
        </p>
        <h1 className="font-fraunces mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 500, color: '#F5F3FF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          On fait quoi<br />chez Rise ?
        </h1>
        <p className="font-inter" style={{ color: '#9CA3C4', fontSize: '1rem', lineHeight: 1.7, maxWidth: 520 }}>
          Rise n'est pas un fonds. C'est un Family Office — un bureau qui gère et fait fructifier le patrimoine de la famille Brourhant sur plusieurs horizons.
        </p>
      </motion.div>

      {/* 3 marques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {BRANDS.map((brand, i) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
            style={{
              background: brand.accentDim,
              border: `1px solid ${brand.accentBorder}`,
              borderRadius: 20,
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow orb */}
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 140, height: 140, borderRadius: '50%',
              background: brand.accent,
              opacity: 0.08,
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }} />

            {/* Category */}
            <p className="font-inter mb-3" style={{ color: brand.accent, fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 12px' }}>
              {brand.category}
            </p>

            {/* Brand name */}
            <h2 className="font-fraunces mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.9rem)', fontWeight: 500, color: '#F5F3FF', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 10px' }}>
              {brand.name}
            </h2>

            {/* Tagline */}
            <p className="font-inter mb-4" style={{ color: brand.accent, fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.4, fontStyle: 'italic', margin: '0 0 14px', opacity: 0.9 }}>
              "{brand.tagline}"
            </p>

            {/* Separator */}
            <div style={{ height: 1, background: brand.accentBorder, marginBottom: 14 }} />

            {/* Description */}
            <p className="font-inter" style={{ color: '#9CA3C4', fontSize: '0.83rem', lineHeight: 1.65, margin: '0 0 20px', flex: 1 }}>
              {brand.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {brand.tags.map(tag => (
                <span
                  key={tag}
                  className="font-inter"
                  style={{
                    padding: '3px 10px',
                    borderRadius: 99,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#9CA3C4',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Section secondaire */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p className="font-inter mb-4" style={{ color: '#9CA3C4', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Aussi dans l'écosystème
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SECONDARY.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
              style={{
                background: 'rgba(26,21,48,0.7)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14,
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.accent, flexShrink: 0, marginTop: 6 }} />
              <div>
                <p className="font-inter" style={{ margin: '0 0 3px', color: '#F5F3FF', fontWeight: 600, fontSize: '0.88rem' }}>
                  {s.name}
                </p>
                <p className="font-inter" style={{ margin: 0, color: '#9CA3C4', fontSize: '0.78rem', lineHeight: 1.5 }}>
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
