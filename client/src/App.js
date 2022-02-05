import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Alerts from './pages/alerts/Alerts';
import Friends from './pages/friends/Friends';
import Home from './pages/home/Home';
import LogOn from './pages/logOn/LogOn';
import Profile from './pages/profile/Profile';
import ViewProfile from './pages/viewProfiles/ViewProfiles';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LogOn />} />

        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/home" element={<Home />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </Layout>
  );
}

export default App;
