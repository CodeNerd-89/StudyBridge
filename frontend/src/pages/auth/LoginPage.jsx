import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SignUpWizard from '../../features/auth/SignUpWizard';

const LoginPage = () => {
  const [active, setActive] = useState(false); // false = sign-in visible by default
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/profile';

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'studybridge-demo-token');
    window.dispatchEvent(new Event('authchange'));
    navigate(from);
  };

  const handleSignUpComplete = (payload) => {
    localStorage.setItem('token', 'studybridge-demo-token');
    localStorage.setItem('userProfile', JSON.stringify(payload));
    window.dispatchEvent(new Event('authchange'));
    navigate(from);
  };

  return (
    <div className="font-['Plus_Jakarta_Sans'] h-screen w-screen bg-background overflow-hidden">
      {/* StudyBridge Logo — matches TopNav position exactly, teal accent */}
      <div className="fixed top-0 left-0 z-[200] pointer-events-none flex items-center h-20 px-8">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-accent pointer-events-auto">
          StudyBridge
        </Link>
      </div>

      {/* ===== DESKTOP LAYOUT (md+) ===== */}
      <main
        className={`hidden md:flex container-slider relative w-screen h-screen bg-white overflow-hidden shadow-2xl ${active ? 'right-panel-active' : ''}`}
      >
        {/* Sign Up Form */}
        <div className="form-container sign-up-container" data-purpose="sign-up-form">
          <SignUpWizard onComplete={handleSignUpComplete} />
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container" data-purpose="sign-in-form">
          <form onSubmit={handleSignIn} className="flex flex-col items-center justify-center px-10 md:px-24 h-full text-center bg-white">
            <h1 className="text-4xl font-extrabold text-primary mb-6">Welcome Back</h1>
            <div className="flex space-x-3 mb-6">{/* social buttons placeholder */}</div>
            <p className="text-text-muted text-sm mb-6">Access your student dashboard</p>
            <div className="w-full max-w-xs space-y-3 mb-4">
              <input className="auth-input" placeholder="Email Address" type="email" />
              <input className="auth-input" placeholder="Password" type="password" />
            </div>
            <a href="#" className="text-accent text-sm font-semibold hover:underline mb-8">
              Forgot password?
            </a>
            <button
              type="submit"
              className="w-full max-w-[200px] bg-primary text-white font-bold py-2 rounded-full hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest text-xs shadow-lg"
            >
              SIGN IN
            </button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container" data-purpose="sliding-overlay">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-accent text-[10px] font-extrabold tracking-widest uppercase mb-6 border border-white/20">
                <span className="material-symbols-outlined text-xs">person</span>
                ALREADY A MEMBER?
              </div>
              <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
              <p className="text-sm text-white/70 leading-relaxed mb-10 max-w-[280px]">
                To keep connected with your mentors please login with your personal info
              </p>
              <button
                type="button"
                onClick={() => setActive(false)}
                className="bg-accent text-primary font-bold text-sm px-10 py-2 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-xl"
                id="signIn"
              >
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-accent text-[10px] font-extrabold tracking-widest uppercase mb-6 border border-white/20">
                <span className="material-symbols-outlined text-xs">star</span>
                NEW TO STUDYBRIDGE?
              </div>
              <h2 className="text-3xl font-bold mb-6">Hello, Friend!</h2>
              <p className="text-sm text-white/70 leading-relaxed mb-10 max-w-[280px]">
                Enter your details and start your personalized academic journey with us
              </p>
              <button
                type="button"
                onClick={() => setActive(true)}
                className="bg-accent text-primary font-bold text-sm px-10 py-2 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-xl"
                id="signUp"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ===== MOBILE LAYOUT (<md) ===== */}
      <main
        className={`flex md:hidden flex-col w-screen h-screen overflow-hidden ${active ? 'right-panel-active' : ''}`}
        id="auth-root-mobile"
      >
        {/* TOP INFO PANEL (40% height) */}
        <div className="relative h-[40%] bg-[#1a2b48] overflow-hidden z-20 shadow-xl">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#1a2b48] rounded-full blur-[120px]"></div>
          </div>

          {/* Vertical sliding content */}
          <div className="mobile-slider h-[200%] w-full" id="info-panel-inner">
            {/* View 1: Sign Up prompt */}
            <div className="h-1/2 flex flex-col items-center justify-center px-8 text-center pt-12">
              <h2 className="text-[36px] font-extrabold tracking-tight text-white mb-2 leading-tight">Hello, Friend!</h2>
              <p className="text-[14px] text-[#b6c7eb] leading-relaxed mb-6 max-w-[280px]">
                Enter your personal details and start your academic journey with us today.
              </p>
              <button
                type="button"
                onClick={() => setActive(true)}
                className="px-10 py-3 border-2 border-white text-white rounded-full text-[12px] font-bold tracking-[0.1em] uppercase hover:bg-white hover:text-[#1a2b48] transition-all duration-300 btn-active relative overflow-hidden"
              >
                Sign Up
              </button>
            </div>

            {/* View 2: Sign In prompt */}
            <div className="h-1/2 flex flex-col items-center justify-center px-8 text-center pt-12">
              <h2 className="text-[36px] font-extrabold tracking-tight text-white mb-2 leading-tight">Welcome Back!</h2>
              <p className="text-[14px] text-[#b6c7eb] leading-relaxed mb-6 max-w-[280px]">
                To keep connected with your mentors, please login with your personal info.
              </p>
              <button
                type="button"
                onClick={() => setActive(false)}
                className="px-10 py-3 border-2 border-accent text-accent rounded-full text-[12px] font-bold tracking-[0.1em] uppercase hover:bg-accent hover:text-white transition-all duration-300 btn-active relative overflow-hidden"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM FORM PANEL (60% height) */}
        <div className="relative h-[60%] bg-[#f8f9ff] z-10 overflow-hidden">
          <div className="mobile-slider h-[200%] w-full" id="form-panel-inner">
            {/* Form 1: SIGN IN */}
            <div className="h-1/2 flex flex-col px-8 py-8 overflow-y-auto">
              <div className="mb-6">
                <h1 className="text-[30px] font-bold text-[#031632]">Sign In</h1>
                <div className="flex gap-4 mt-4">
                  <button type="button" className="w-12 h-12 flex items-center justify-center rounded-full border border-[#c5c6ce] hover:bg-[#eff4ff] transition-colors">
                    <span className="material-symbols-outlined text-[#031632]">account_circle</span>
                  </button>
                  <button type="button" className="w-12 h-12 flex items-center justify-center rounded-full border border-[#c5c6ce] hover:bg-[#eff4ff] transition-colors">
                    <span className="material-symbols-outlined text-[#031632]">mail</span>
                  </button>
                </div>
                <p className="text-[10px] font-extrabold tracking-[0.15em] text-[#44474d] mt-6 text-center uppercase">or use your account</p>
              </div>
              <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#44474d]">mail</span>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-[#eff4ff] border border-[#c5c6ce] rounded-lg text-[14px] outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(38,166,154,0.15)] transition-all"
                    placeholder="Email"
                    type="email"
                  />
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#44474d]">lock</span>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-[#eff4ff] border border-[#c5c6ce] rounded-lg text-[14px] outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(38,166,154,0.15)] transition-all"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <a href="#" className="text-right text-accent text-[14px] hover:underline">Forgot your password?</a>
                <button
                  type="submit"
                  className="mt-2 w-full py-4 bg-[#031632] text-white rounded-full text-[12px] font-bold tracking-[0.1em] uppercase shadow-lg btn-active relative overflow-hidden"
                >
                  Sign In
                </button>
              </form>
            </div>

            {/* Form 2: SIGN UP (5-step wizard) */}
            <div className="h-1/2 flex flex-col overflow-y-auto">
              <SignUpWizard onComplete={handleSignUpComplete} />
            </div>
          </div>
        </div>
      </main>

      <style>{`
        /* ===== DESKTOP STYLES ===== */
        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
        }
        .sign-in-container {
          left: 0;
          width: 60%;
          z-index: 2;
        }
        .sign-up-container {
          left: 0;
          width: 60%;
          opacity: 0;
          z-index: 1;
        }
        .container-slider.right-panel-active .sign-in-container {
          transform: translateX(66.67%);
        }
        .container-slider.right-panel-active .sign-up-container {
          transform: translateX(66.67%);
          opacity: 1;
          z-index: 5;
        }
        .overlay-container {
          position: absolute;
          top: 0;
          left: 60%;
          width: 40%;
          height: 100%;
          overflow: hidden;
          transition: transform 0.6s ease-in-out;
          z-index: 100;
        }
        .container-slider.right-panel-active .overlay-container {
          transform: translateX(-150%);
        }
        .overlay {
          background: #1a2b48;
          background: linear-gradient(to right, #1a2b48, #283852);
          color: #FFFFFF;
          position: relative;
          left: -150%;
          height: 100%;
          width: 250%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }
        .container-slider.right-panel-active .overlay {
          transform: translateX(60%);
        }
        .overlay-panel {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
          text-align: center;
          top: 0;
          height: 100%;
          width: 40%;
          transition: transform 0.6s ease-in-out;
        }
        .overlay-left {
          transform: translateX(-20%);
        }
        .container-slider.right-panel-active .overlay-left {
          transform: translateX(0);
        }
        .overlay-right {
          right: 0;
          transform: translateX(0);
        }
        .container-slider.right-panel-active .overlay-right {
          transform: translateX(20%);
        }
        .auth-input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          transition: all 0.2s;
          outline: none;
        }
        .auth-input:focus {
          box-shadow: 0 0 0 2px rgba(38, 166, 154, 0.2);
          border-color: #26a69a;
        }

        /* ===== MOBILE STYLES ===== */
        .mobile-slider {
          transition: transform 0.6s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .right-panel-active #info-panel-inner {
          transform: translateY(-50%);
        }
        .right-panel-active #form-panel-inner {
          transform: translateY(-50%);
        }

        /* Micro-interactions */
        .btn-active:active {
          transform: scale(0.96) !important;
        }

        /* Material Symbols defaults */
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
