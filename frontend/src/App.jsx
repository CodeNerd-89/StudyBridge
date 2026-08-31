import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { flushSync } from 'react-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import UniversityPage from './pages/universities/UniversityPage';
import ScholarshipPage from './pages/scholarships/ScholarshipPage';
import { LoginPage, ProfilePage } from './features/auth';
import { ChatbotPage } from './features/ai';

import AdminDashboard from './pages/admin/AdminDashboard';

const NAV_ORDER = ['/', '/universities', '/profile', '/scholarships', '/quiz', '/chatbot', '/admin'];

const getNavIndex = (pathname) => {
  const index = NAV_ORDER.findIndex((path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  });
  return index !== -1 ? index : 999;
};

// Scrolls to the top whenever the route changes (React Router preserves scroll by default)
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Flag to prevent RequireAuth from redirecting to /login during logout
let isLoggingOut = false;
export const beginLogout = () => { isLoggingOut = true; };
export const endLogout = () => { isLoggingOut = false; };

// Route guard: redirects to login when there's no auth token
const RequireAuth = ({ children }) => {
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const location = useLocation();

  if (!isLoggedIn && !isLoggingOut) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

// Admin route guard: redirects to login or home if not an admin
const RequireAdmin = ({ children }) => {
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  let role = 'student';
  try {
    const u = JSON.parse(localStorage.getItem('userProfile') || '{}');
    role = u.role || 'student';
  } catch {
    role = 'student';
  }

  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

const EmptyPage = ({ title }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">StudyBridge</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-primary">{title}</h1>
      <p className="mt-4 max-w-2xl text-slate-600">This section is intentionally empty for now.</p>
    </section>
  );
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
    ) {
      return;
    }

    const prevPath = prevPathRef.current;
    const nextPath = location.pathname;

    // Skip slide transitions for /login for instant, stable rendering
    if (prevPath === '/login' || nextPath === '/login' || nextPath.startsWith('/login')) {
      prevPathRef.current = nextPath;
      setDisplayLocation(location);
      return;
    }

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
      <Route path="/login/*" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        <Route path="universities" element={<UniversityPage />} />
        <Route path="scholarships" element={<ScholarshipPage />} />
        <Route path="quiz" element={<EmptyPage title="Quiz" />} />
        <Route path="chatbot" element={<RequireAuth><ChatbotPage /></RequireAuth>} />
        <Route path="admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
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
