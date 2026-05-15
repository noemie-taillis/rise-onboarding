import Layout from '../components/Layout';

export default function FirstDay() {
  return (
    <Layout currentStep={4}>
      <div className="flex flex-col items-center justify-center min-h-[82vh] px-6 text-center">
        <h1
          className="font-fraunces mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em', color: '#F5F3FF' }}
        >
          Ton 1er jour
        </h1>
        <p
          className="font-inter max-w-md"
          style={{ color: '#9CA3C4', fontSize: '1rem', lineHeight: 1.75 }}
        >
          Tout ce qu'il faut savoir avant de démarrer.{' '}
          Ce module arrive bientôt.
        </p>
      </div>
    </Layout>
  );
}
