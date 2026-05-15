import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import OrgSection, { OrgConnector } from '../components/OrgSection';
import PersonCard from '../components/PersonCard';
import { MiniCard } from '../components/PersonCard';
import PersonDrawer from '../components/PersonDrawer';
import { TEAM, getDirectReports } from '../data/team';

const SHAREHOLDERS  = TEAM.filter((p) => p.tag === 'Shareholders');
const CEO           = TEAM.find((p) => p.id === 'ceo');
const CEO_REPORTS   = getDirectReports('ceo');

/* Direction & rapports directs = Bruno's reports + those under Naomi */
const BRUNO_REPORTS = getDirectReports('bruno');
const NAOMI_REPORTS = getDirectReports('naomi');

/* Départements = one card per dept head + mini-cards of their reports */
const DEPT_HEADS = ['ilinca', 'nina', 'amaury', 'gonzague', 'adrien', 'noemie'];

function SubteamSection({ managerId, onOpen }) {
  const reports = getDirectReports(managerId);
  if (!reports.length) return null;
  return (
    <div style={{ marginTop: 12, paddingLeft: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
        {reports.map((r) => (
          <MiniCard key={r.id} person={r} onClick={onOpen} />
        ))}
      </div>
      {/* one level deeper (e.g. Maeva's team) */}
      {reports.map((r) => {
        const deeper = getDirectReports(r.id);
        if (!deeper.length) return null;
        return (
          <div key={r.id} style={{ marginTop: 10, paddingLeft: 16, borderLeft: '2px dashed rgba(124,58,237,0.2)' }}>
            <p style={{ margin: '0 0 6px', fontSize: '0.68rem', color: '#7C3AED', fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.05em' }}>
              Équipe de {r.firstName}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 6 }}>
              {deeper.map((d) => (
                <MiniCard key={d.id} person={d} onClick={onOpen} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Equipe() {
  const [activePerson, setActivePerson] = useState(null);

  const openDrawer  = (person) => setActivePerson(person);
  const closeDrawer = () => setActivePerson(null);

  return (
    <Layout currentStep={1}>
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
          Qui fait quoi, les canaux de communication, les rituels.
        </motion.p>

        {/* ── 1. Shareholders ── */}
        <OrgSection title="Shareholders" accent="#94A3B8" delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
            {SHAREHOLDERS.map((p) => (
              <MiniCard key={p.id} person={p} onClick={openDrawer} />
            ))}
          </div>
        </OrgSection>

        <OrgConnector />

        {/* ── 2. Direction Générale ── */}
        <OrgSection title="Direction Générale" accent="#7C3AED" delay={0.18}>
          <div style={{ maxWidth: 280 }}>
            <PersonCard person={CEO} onClick={openDrawer} />
          </div>
        </OrgSection>

        <OrgConnector />

        {/* ── 3. Direction & Rapports Directs ── */}
        <OrgSection title="Direction & Rapports Directs" accent="#F97316" delay={0.26}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {CEO_REPORTS.map((p) => (
              <div key={p.id}>
                <PersonCard person={p} onClick={openDrawer} />
                {/* Naomi's reports inline */}
                {p.id === 'naomi' && NAOMI_REPORTS.length > 0 && (
                  <div style={{ marginTop: 10, paddingLeft: 12, borderLeft: '2px dashed rgba(199,185,245,0.3)' }}>
                    {NAOMI_REPORTS.map((r) => (
                      <MiniCard key={r.id} person={r} onClick={openDrawer} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </OrgSection>

        <OrgConnector />

        {/* ── 4. Départements ── */}
        <OrgSection title="Départements" accent="#06B6D4" delay={0.34}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {BRUNO_REPORTS.map((head) => (
              <div key={head.id} style={{
                background: '#1A1530',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14,
                padding: '20px',
              }}>
                {/* Dept head */}
                <div style={{ maxWidth: 260, marginBottom: 12 }}>
                  <PersonCard person={head} onClick={openDrawer} />
                </div>
                {/* Reports */}
                <SubteamSection managerId={head.id} onOpen={openDrawer} />
              </div>
            ))}
          </div>
        </OrgSection>

      </div>

      {/* Drawer */}
      <PersonDrawer
        person={activePerson}
        onClose={closeDrawer}
        onNavigate={openDrawer}
      />
    </Layout>
  );
}
