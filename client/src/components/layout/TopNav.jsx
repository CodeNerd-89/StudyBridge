import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleUserRound, ChevronDown, Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import ScrollPlaneProgress from './ScrollPlaneProgress';

const items = [
  { to: '/', label: 'Home' },
  { to: '/universities', label: 'Universities' },
  { to: '/scholarships', label: 'Scholarships' },
  { to: '/quiz', label: 'Quiz' },
];

const TopNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header className="relative sticky top-0 z-40 bg-white/85 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e35f39] text-sm font-black tracking-tight text-white shadow-soft">hs</span>
          <div>
            <p className="text-base font-black tracking-[-0.04em] text-slate-900">StudyBridge</p>
          </div>
        </Link>

        <nav className="hidden flex-1 justify-center gap-2 lg:flex">
          {items.map((item) => (
            <Link key={item.to} to={item.to} className="rounded-full px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-[#fdebe4] hover:text-[#d95f3d]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <Button to="/login" variant="primary" className="hidden lg:inline-flex rounded-full bg-[#e35f39] px-5 py-2.5 shadow-[0_10px_30px_rgba(227,95,57,0.25)] hover:bg-[#cf5330]">
              Get Started
            </Button>
          ) : (
            <Link
              to="/profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#f0d7cc] bg-white text-[#e35f39] shadow-sm transition hover:border-[#e35f39] hover:text-[#e35f39]"
              aria-label="Open profile"
            >
              <CircleUserRound className="h-6 w-6" />
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#f0d7cc] bg-white text-[#e35f39] shadow-sm transition hover:border-[#e35f39] lg:hidden"
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'}`}>
        <div className="mx-auto mt-4 w-full max-w-7xl rounded-[1.5rem] border border-[#f1ddd1] bg-white p-4 shadow-[0_16px_50px_rgba(227,95,57,0.12)]">
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-[#fff3ed] hover:text-[#d95f3d]"
              >
                {item.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="mt-2 pt-2 border-t border-[#f1ddd1]">
                <Button
                  to="/login"
                  variant="primary"
                  onClick={() => setMenuOpen(false)}
                  className="w-full justify-center rounded-full bg-[#e35f39] px-5 py-2.5 shadow-[0_10px_30px_rgba(227,95,57,0.25)] hover:bg-[#cf5330]"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ScrollPlaneProgress />
    </header>
  );
};

export default TopNav;
