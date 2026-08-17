import { Link, useLocation } from 'react-router-dom';

const items = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/universities', label: 'University', icon: 'school' },
  { to: '/profile', label: 'Profile', icon: 'person' },
  { to: '/scholarships', label: 'Scholarship', icon: 'payments' },
  { to: '/quiz', label: 'Quiz', icon: 'edit_note' },
  { to: '/chatbot', label: 'Chatbot', icon: 'smart_toy' },
];

const MobileBottomNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed inset-x-6 bottom-6 z-50 md:hidden" aria-label="Primary">
      <div className="flex h-16 items-center justify-around rounded-2xl border border-outline/70 bg-white/85 px-2 shadow-2xl backdrop-blur-xl">
        {items.map((item) => {
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center transition-colors ${
                active ? 'text-accent' : 'text-text-muted hover:text-primary'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings: active
                    ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24"
                    : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                {item.icon}
              </span>
              <span className={`mt-1 text-[10px] ${active ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
