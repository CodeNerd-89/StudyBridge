import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Star } from 'lucide-react';


const LoginPage = () => {
  const [active, setActive] = useState(false); // false = sign-in visible by default
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'studybridge-demo-token');
    window.dispatchEvent(new Event('authchange'));
    navigate('/profile');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'studybridge-demo-token');
    window.dispatchEvent(new Event('authchange'));
    navigate('/profile');
  };

  return (
    <div className="font-['Plus_Jakarta_Sans'] h-screen w-screen bg-background flex items-center justify-center overflow-hidden">
      {/* StudyBridge Logo — matches TopNav position exactly */}
      <div className="fixed top-0 left-0 z-[200] pointer-events-none flex items-center h-20 px-8">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-accent pointer-events-auto">
          StudyBridge
        </Link>
      </div>

      {/* Main Container */}
      <main
        id="auth-container"
        className={`container-slider relative w-screen h-screen bg-white overflow-hidden shadow-2xl ${active ? 'right-panel-active' : ''}`}
      >
        {/* Sign Up Form */}
        <div className="form-container sign-up-container" data-purpose="sign-up-form">
          <form onSubmit={handleSignUp} className="flex flex-col items-center justify-center px-10 md:px-24 h-full text-center bg-white">
            <h1 className="text-4xl font-extrabold text-primary mb-6">Create Account</h1>
            <div className="flex space-x-3 mb-6">{/* social buttons placeholder */}</div>
            <p className="text-text-muted text-sm mb-6">or use your email for registration</p>
            <div className="w-full max-w-xs space-y-3 mb-6">
              <input className="auth-input" placeholder="First Name" type="text" />
              <input className="auth-input" placeholder="Last Name" type="text" />
              <input className="auth-input" placeholder="Email Address" type="email" />
              <input className="auth-input" placeholder="Password" type="password" />
            </div>
            <button
              type="submit"
              className="w-full max-w-[200px] bg-primary text-white font-bold py-2 rounded-full hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest text-xs shadow-lg"
            >
              SIGN UP
            </button>
          </form>
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
            {/* Left Overlay — visible when Sign Up is active */}
            <div className="overlay-panel overlay-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-accent text-[10px] font-extrabold tracking-widest uppercase mb-6 border border-white/20">
                <GraduationCap className="text-xs" />
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

            {/* Right Overlay — visible when Sign In is active */}
            <div className="overlay-panel overlay-right">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-accent text-[10px] font-extrabold tracking-widest uppercase mb-6 border border-white/20">
                <Star className="text-xs" />
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
                Create Account
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Sliding animation CSS */}
      <style>{`
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
      `}</style>
    </div>
  );
};

export default LoginPage;
