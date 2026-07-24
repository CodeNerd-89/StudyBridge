import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Sparkles, Users, Mail, Lock, Eye, Phone } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [mode, setMode] = useState('signin');
  const isSignIn = mode === 'signin';
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('token', 'studybridge-demo-token');
    window.dispatchEvent(new Event('authchange'));
    navigate('/profile');
  };

  return (
    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-slate-700">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e35f39] text-white shadow-soft">hs</span>
          <span className="text-2xl font-light tracking-tight">StudyBridge</span>
        </div>

        <div className="space-y-4">
          <h1 className="max-w-xl text-5xl font-black tracking-tight text-slate-900 sm:text-6xl">
            Your Gateway to <span className="text-[#e35f39]">Higher Education</span>
          </h1>
          <p className="max-w-lg text-lg leading-8 text-slate-600">
            Connect with top colleges, explore courses, and take the next step in your academic journey.
          </p>
        </div>

        <div className="space-y-5">
          {[
            { icon: GraduationCap, title: 'Discover Opportunities', text: 'Access thousands of colleges and courses' },
            { icon: Sparkles, title: 'Smart Matching', text: 'Find the perfect fit for your goals' },
            { icon: BookOpen, title: 'For Institutions', text: 'Showcase your programs to the right students' },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[#fff0e9] text-[#e35f39]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Card className="overflow-hidden rounded-[2rem] border-[#f0ddd3] bg-white p-0 shadow-[0_24px_70px_rgba(17,24,39,0.08)]">
        <div className="border-b border-[#f4e4dc] bg-[#faf6f3] p-2">
          <div className="grid grid-cols-2 rounded-2xl bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${isSignIn ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${!isSignIn ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-black text-slate-900">{isSignIn ? 'Welcome Back' : 'Create Your Account'}</h2>
          <p className="mt-2 text-sm text-slate-500">
            {isSignIn ? 'Enter your email and password to sign in' : 'Create your account to save your shortlist and match scores'}
          </p>

          {isSignIn ? (
            <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-[#f8f5f3] p-1">
              <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm">Email</button>
              <button className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-400">Phone OTP</button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-[#f8f5f3] p-1">
              <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm">Student</button>
              <button className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-400">Institution</button>
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {!isSignIn && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="fullName">
                  Full Name
                </label>
                <Input id="fullName" type="text" placeholder="Sajjad Rahman" />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-11" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-11 pr-11" />
                <Eye className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {!isSignIn && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" />
              </div>
            )}

            <Button className="w-full rounded-2xl bg-[#e35f39] py-3 text-base shadow-[0_14px_30px_rgba(227,95,57,0.25)] hover:bg-[#cf5330]" type="submit" variant="primary">
              {isSignIn ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            {isSignIn
              ? 'By signing in you agree to the StudyBridge Privacy Policy & Terms & conditions.'
              : 'By creating an account you agree to the StudyBridge Privacy Policy & Terms & conditions.'}
          </p>

          <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
            <Link to="/" className="inline-flex items-center gap-2 hover:text-[#e35f39]">
              Back to Home
            </Link>
            <Link to="/profile" className="inline-flex items-center gap-2 hover:text-[#e35f39]">
              <Users className="h-4 w-4" />
              Profile
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default LoginPage;
