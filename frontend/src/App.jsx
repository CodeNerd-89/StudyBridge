import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { flushSync } from 'react-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import UniversityPage from './pages/universities/UniversityPage';
import ScholarshipPage from './pages/scholarships/ScholarshipPage';
import QuizPage from './pages/tests/QuizPage';
import { LoginPage, ProfilePage } from './features/auth';
import { ChatbotPage } from './features/ai';

const NAV_ORDER = ['/', '/universities', '/profile', '/scholarships', '/exam', '/chatbot'];

const getNavIndex = (pathname) => {
  const normalized = pathname.startsWith('/quiz') ? '/exam' : pathname;
  const index = NAV_ORDER.findIndex((path) => {
    if (path === '/') return normalized === '/';
    return normalized.startsWith(path);
  });
  return index !== -1 ? index : 999;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

let isLoggingOut = false;
export const beginLogout = () => { isLoggingOut = true; };
export const endLogout = () => { isLoggingOut = false; };

const RequireAuth = ({ children }) => {
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const location = useLocation();

  if (!isLoggedIn && !isLoggingOut) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

const ViewTransitionRoutes = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const prevPathRef = useRef(location.pathname);

  useLayoutEffect(() => {
    if (
      location.pathname === displayLocation.pathname &&
      location.search === displayLocation.search &&
      location.hash === displayLocation.hash
    ) return;

    const prevPath = prevPathRef.current;
    const nextPath = location.pathname;
    const prevIdx = getNavIndex(prevPath);
    const nextIdx = getNavIndex(nextPath);
    const direction = nextIdx >= prevIdx ? 'slide-forward' : 'slide-backward';
    prevPathRef.current = nextPath;

    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      document.documentElement.classList.remove('slide-forward', 'slide-backward');
      document.documentElement.classList.add(direction);
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setDisplayLocation(location);
        });
      });
      transition.finished.finally(() => {
        document.documentElement.classList.remove('slide-forward', 'slide-backward');
      });
    } else {
      setDisplayLocation(location);
    }
  }, [location, displayLocation]);

  return (
    <Routes location={displayLocation}>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        <Route path="universities" element={<UniversityPage />} />
        <Route path="scholarships" element={<ScholarshipPage />} />
        <Route path="exam" element={<RequireAuth><QuizPage /></RequireAuth>} />
        <Route path="quiz" element={<Navigate to="/exam" replace />} />
        <Route path="chatbot" element={<RequireAuth><ChatbotPage /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ViewTransitionRoutes />
    </BrowserRouter>
  );
}

export default App;
