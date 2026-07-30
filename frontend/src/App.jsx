import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import { LoginPage, ProfilePage } from './features/auth';

const EmptyPage = ({ title }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">StudyBridge</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-primary">{title}</h1>
      <p className="mt-4 max-w-2xl text-slate-600">This section is intentionally empty for now.</p>
    </section>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="universities" element={<EmptyPage title="Universities" />} />
          <Route path="scholarships" element={<EmptyPage title="Scholarships" />} />
          <Route path="quiz" element={<EmptyPage title="Quiz" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
