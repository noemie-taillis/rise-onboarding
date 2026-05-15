import { Routes, Route } from 'react-router-dom';
import Landing   from './pages/Landing';
import Home      from './pages/Home';
import Discover  from './pages/Discover';
import Equipe    from './pages/Equipe';
import Team      from './pages/Team';
import AITest    from './pages/AITest';
import Checklist from './pages/Checklist';
import FirstDay  from './pages/FirstDay';
import Playbook  from './pages/Playbook';

export default function App() {
  return (
    <Routes>
      <Route path="/"          element={<Landing />}   />
      <Route path="/home"      element={<Home />}      />
      <Route path="/discover"  element={<Discover />}  />
      <Route path="/equipe"    element={<Equipe />}    />
      <Route path="/team"      element={<Team />}      />
      <Route path="/ai-test"   element={<AITest />}    />
      <Route path="/checklist" element={<Checklist />} />
      <Route path="/first-day" element={<FirstDay />}  />
      <Route path="/playbook"  element={<Playbook />}  />
    </Routes>
  );
}
