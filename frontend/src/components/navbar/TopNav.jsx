import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CircleUserRound, LogOut, Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import ScrollPlaneProgress from '../common/ScrollPlaneProgress';

const items = [
  { to: '/', label: 'Home' },
  { to: '/universities', label: 'University' },
  { to: '/scholarships', label: 'Scholarship' },
  { to: '/quiz', label: 'Quiz' },
];

const TopNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authchange'));
    navigate('/login');
  };

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(Boolean(localStorage.getItem('token')));

    window.addEventListener('storage', syncAuth);
    window.addEventListener('authchange', syncAuth);
    syncAuth();

    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('authchange', syncAuth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`glass-nav fixed inset-x-0 top-0 z-50 flex w-full items-center transition-all duration-300 ${
        scrolled ? 'h-16 shadow-sm' : 'h-20'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-8">
        {/* Logo */}
        <div className="flex flex-1 items-center">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-primary">
            StudyBridge
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden flex-1 items-center justify-center gap-10 md:flex">
          {items.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? 'font-semibold text-primary'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex flex-1 items-center justify-end gap-4">
          {!isLoggedIn ? (
            <Button
              to="/login"
              variant="primary"
              className="hidden rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 lg:inline-flex"
            >
              Get Started
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              {isActive('/profile') ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-red-300 bg-red-50 text-red-500 shadow-sm transition hover:bg-red-100"
                  aria-label="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              ) : (
                <Link
                  to="/profile"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-outline bg-white text-primary shadow-sm transition hover:border-primary"
                  aria-label="Open profile"
                >
                  <CircleUserRound className="h-6 w-6" />
                </Link>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-outline bg-white text-primary shadow-sm transition hover:border-primary md:hidden"
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
        <div className="absolute left-4 right-4 top-full mt-2 rounded-2xl border border-outline bg-white p-4 shadow-lg">
          <div className="flex flex-col gap-2">
            {items.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? 'bg-primary text-white'
                      : 'text-primary hover:bg-secondary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {!isLoggedIn ? (
              <div className="mt-2 border-t border-outline pt-2">
                <Button
                  to="/login"
                  variant="primary"
                  onClick={() => setMenuOpen(false)}
                  className="w-full justify-center rounded-full bg-primary px-5 py-2.5 shadow-sm hover:bg-opacity-90"
                >
                  Get Started
                </Button>
              </div>
            ) : (
              <div className="mt-2 border-t border-outline pt-2">
                <button
                  type="button"
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plane scroll indicator — KEPT from original */}
      <ScrollPlaneProgress />
    </header>
  );
};

export default TopNav;
