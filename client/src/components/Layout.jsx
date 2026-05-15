import { Link, useLocation } from 'react-router-dom';
import BackgroundDecor from './BackgroundDecor';
import Jiminy from './Jiminy';
import { useProfile } from '../context/UserProfileContext';

const NO_BACK = ['/', '/home'];

function getInitials(firstName, lastName) {
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();
}

export default function Layout({ children, currentStep = -1 }) {
  const { profile } = useProfile();
  const { pathname } = useLocation();
  const showBack = !NO_BACK.includes(pathname);

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

        <div className="flex items-center gap-4">
          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
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

          {/* Avatar + prénom */}
          <Link to="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              border: '2px solid #7C3AED',
              background: profile.photoBase64 ? 'transparent' : '#7C3AED',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {profile.photoBase64 ? (
                <img src={profile.photoBase64} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span className="font-fraunces" style={{ fontSize: '0.65rem', fontWeight: 600, color: '#fff' }}>
                  {getInitials(profile.firstName, profile.lastName)}
                </span>
              )}
            </div>
            <span className="font-inter" style={{ fontSize: '0.82rem', fontWeight: 500, color: '#9CA3C4' }}>
              {profile.firstName}
            </span>
          </Link>
        </div>
      </header>

      <main style={{ paddingTop: 72, position: 'relative', zIndex: 2 }}>
        {showBack && (
          <div className="max-w-5xl mx-auto px-6 pt-4">
            <Link
              to="/home"
              className="font-inter inline-flex items-center gap-1"
              style={{ color: '#9CA3C4', fontSize: '0.875rem', textDecoration: 'none' }}
            >
              ← Retour au hub
            </Link>
          </div>
        )}
        {children}
      </main>

      <Jiminy />
    </div>
  );
}
