import { createContext, useContext, useState } from 'react';

const DEFAULT = {
  firstName: 'Noémie',
  lastName: 'Taillis',
  jobTitle: 'COO',
  photoBase64: null,
  description: '',
};

const UserProfileContext = createContext(null);

function load() {
  try {
    const raw = localStorage.getItem('rise-onboarding-profile');
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export function UserProfileProvider({ children }) {
  const [profile, setProfile] = useState(load);

  function updateProfile(updates) {
    const next = { ...profile, ...updates };
    setProfile(next);
    try {
      localStorage.setItem('rise-onboarding-profile', JSON.stringify(next));
    } catch {
      // quota exceeded — silently ignore
    }
  }

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(UserProfileContext);
}
