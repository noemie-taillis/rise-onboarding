import Layout from '../components/Layout';

export default function Checklist() {
  return (
    <Layout currentStep={3}>
      <div className="flex flex-col items-center justify-center min-h-[82vh] px-6 text-center">
        <h1
          className="font-fraunces mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em', color: '#F5F3FF' }}
        >
          Checklist
        </h1>
        <p
          className="font-inter max-w-md"
          style={{ color: '#9CA3C4', fontSize: '1rem', lineHeight: 1.75 }}
        >
          Tes actions des premiers jours, étape par étape.{' '}
          Ce module arrive bientôt.
        </p>
      </div>
    </Layout>
  );
}
