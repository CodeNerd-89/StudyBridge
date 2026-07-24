import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-primary">
      <TopNav />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;