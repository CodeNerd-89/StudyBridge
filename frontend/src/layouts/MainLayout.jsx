import { Outlet, useLocation } from 'react-router-dom';
import TopNav from '../components/navbar/TopNav';
import MobileBottomNav from '../components/navbar/MobileBottomNav';
import Footer from '../components/common/Footer';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background text-text-main font-sans selection:bg-secondary selection:text-primary overflow-x-hidden pt-20 pb-28 md:pb-0">
      <TopNav />
      {/* Mobile bottom navigation — shown on every page except login (login is outside this layout) */}
      <MobileBottomNav />
      {isHome ? (
        <>{children ?? <Outlet />}</>
      ) : (
        <main className="mx-auto w-full max-w-[1200px] px-8 py-8">{children ?? <Outlet />}</main>
      )}
      <Footer />
    </div>
  );
};

export default MainLayout;