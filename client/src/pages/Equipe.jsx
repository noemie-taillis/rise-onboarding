import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import OrgSection from '../components/OrgSection';
import PersonCard from '../components/PersonCard';
import { MiniCard } from '../components/PersonCard';
import PersonDrawer from '../components/PersonDrawer';
import { TEAM, TAG_COLORS } from '../data/team';

/* Ordre et libellé des sections */
const SECTIONS = [
  { tag: 'Direction',       label: 'Direction',         accent: '#F97316' },
  { tag: 'Executive',       label: 'Executive',          accent: '#C7B9F5' },
  { tag: 'Real Estate',     label: 'Real Estate',        accent: '#3B82F6' },
  { tag: 'Tech & AI',       label: 'Tech & AI',          accent: '#06B6D4' },
  { tag: 'Legal',           label: 'Legal',              accent: '#EC4899' },
  { tag: 'Tax',             label: 'Tax',                accent: '#F59E0B' },
  { tag: 'Admin & Finance', label: 'Admin & Finance',    accent: '#10B981' },
  { tag: 'Recrutement',     label: 'Recrutement',        accent: '#FF8B94' },
  { tag: 'Studio',          label: 'Studio',             accent: '#FFB088' },
];

/* Personnes nommées vs placeholders (sans prénom réel) */
function isPlaceholder(person) {
  return person.firstName === person.tag.split(' ')[0] || person.id.startsWith('compta-') || person.id.startsWith('re-') || person.id.startsWith('tech-') || person.id.startsWith('sh-');
}

export default function Equipe() {
  const [activePerson, setActivePerson] = useState(null);

  const openDrawer  = (person) => setActivePerson(person);
  const closeDrawer = () => setActivePerson(null);

  return (
    <Layout currentStep={2}>
      <div className="px-6 md:px-16 py-10 max-w-4xl mx-auto">

        {/* Page title */}
        <motion.h1
          className="font-fraunces"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 500,
            color: '#F5F3FF',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: 8,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          L'équipe
        </motion.h1>
        <motion.p
          className="font-inter"
          style={{ color: '#9CA3C4', fontSize: '0.95rem', marginBottom: 40, lineHeight: 1.6 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Leurs rôles, leur personnalité, leur profil DISC. Tout ce qu'il faut savoir avant de les approcher.
        </motion.p>

        {SECTIONS.map(({ tag, label, accent }, sectionIdx) => {
          const people = TEAM.filter((p) => p.tag === tag);
          if (!people.length) return null;

          const named       = people.filter((p) => !isPlaceholder(p));
          const placeholders = people.filter((p) => isPlaceholder(p));

          return (
            <OrgSection key={tag} title={label} accent={accent} delay={0.1 + sectionIdx * 0.06}>
              {/* Cartes nommées */}
              {named.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, marginBottom: placeholders.length ? 10 : 0 }}>
                  {named.map((person) => (
                    <PersonCard key={person.id} person={person} onClick={openDrawer} />
                  ))}
                </div>
              )}

              {/* Mini-cartes placeholders */}
              {placeholders.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 8 }}>
                  {placeholders.map((person) => (
                    <MiniCard key={person.id} person={person} onClick={openDrawer} />
                  ))}
                </div>
              )}
            </OrgSection>
          );
        })}

      </div>

      <PersonDrawer
        person={activePerson}
        onClose={closeDrawer}
        onNavigate={openDrawer}
      />
    </Layout>
  );
}
