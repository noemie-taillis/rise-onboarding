import { Link } from 'react-router-dom';
import BackgroundDecor from './BackgroundDecor';

export default function Layout({ children, currentStep = -1 }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundDecor />

      <header
        className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4"
        style={{
          zIndex: 50,
          background: 'rgba(26, 21, 48, 0.65)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <img
            src="/Rise_Logo_White_Transparent.png"
            alt="RISE"
            style={{ height: '32px', width: 'auto' }}
          />
        </Link>

        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: i === currentStep ? '#7C3AED' : 'rgba(255, 255, 255, 0.18)',
                transition: 'background 0.3s ease',
              }}
            />
          ))}
        </div>
      </header>

      <main style={{ paddingTop: 72, position: 'relative', zIndex: 2 }}>
        {children}
      </main>
    </div>
  );
}
