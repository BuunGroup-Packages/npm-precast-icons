import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { FrameworkProvider } from './contexts/FrameworkContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { IconPage } from './pages/IconPage';
import { ColorShowcase } from './pages/ColorShowcase';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import './App.css';

function AppContent() {
  const [search, setSearch] = useState('');
  const [showFooter, setShowFooter] = useState(true);
  const location = useLocation();

  // Always show footer on pages other than home
  useEffect(() => {
    if (location.pathname !== '/') {
      setShowFooter(true);
    }
  }, [location.pathname]);

  return (
    <FrameworkProvider>
      <ScrollToTop />
      <div className="app">
        <Header search={search} onSearchChange={setSearch} />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  search={search}
                  onSearchChange={setSearch}
                  onScrollModeChange={setShowFooter}
                />
              }
            />
            <Route path="/icon/:slug" element={<IconPage />} />
            <Route path="/color" element={<ColorShowcase />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </main>
        {showFooter && <Footer />}
      </div>
    </FrameworkProvider>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
