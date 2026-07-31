import { Fragment, useState } from 'react';

const STEPS = ['Personal', 'Contact', 'Scores', 'Subject', 'Account'];

const SUBJECTS = [
  'Computer Science',
  'Data Science',
  'Artificial Intelligence',
  'Business Administration',
  'Economics & Finance',
  'Engineering',
  'Medicine & Health Sciences',
  'Law',
  'Psychology',
  'Arts & Humanities',
  'Architecture',
  'Environmental Science',
  'Biotechnology',
  'Other',
];

const inputCls =
  'w-full pl-12 pr-4 py-3 bg-[#f5f8ff] border border-[#cbd5e1] rounded-lg text-[14px] text-primary outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(38,166,154,0.15)] transition-all placeholder:text-[#94a3b8]';

const Field = ({ label, id, icon, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-[12px] font-bold text-primary mb-1.5">
      {label}
    </label>
    <div className="relative">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b] text-[18px] pointer-events-none">
        {icon}
      </span>
      <input id={id} className={inputCls} {...props} />
    </div>
  </div>
);

const SignUpWizard = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    gpa: '',
    satScore: '',
    ieltsScore: '',
    preferredSubject: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (error) setError('');
  };

  const validate = () => {
    switch (step) {
      case 0:
        if (!form.firstName.trim() || !form.lastName.trim())
          return 'Please enter your first and last name.';
        break;
      case 1:
        if (!form.phone.trim() || !form.country.trim())
          return 'Please enter your phone number and country.';
        break;
      case 2: {
        const gpa = parseFloat(form.gpa);
        const sat = parseInt(form.satScore, 10);
        const ielts = parseFloat(form.ieltsScore);
        if (form.gpa && (isNaN(gpa) || gpa < 0 || gpa > 10))
          return 'GPA must be a number between 0 and 10.';
        if (form.satScore && (isNaN(sat) || sat < 400 || sat > 1600))
          return 'SAT score must be between 400 and 1600.';
        if (form.ieltsScore && (isNaN(ielts) || ielts < 0 || ielts > 9))
          return 'IELTS band must be between 0 and 9.';
        break;
      }
      case 3:
        if (!form.preferredSubject) return 'Please choose your preferred subject.';
        break;
      case 4:
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
          return 'Please enter a valid email address.';
        if (form.password.length < 6)
          return 'Password must be at least 6 characters.';
        if (form.password !== form.confirmPassword)
          return 'Passwords do not match.';
        break;
      default:
        break;
    }
    return null;
  };

  const goTo = (i) => {
    setError('');
    setStep(i);
  };

  const next = () => {
    const msg = validate();
    if (msg) return setError(msg);
    setError('');
    setStep((s) => s + 1);
  };

  const back = () => {
    setError('');
    setStep((s) => Math.max(0, s - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 4) return next();
    const msg = validate();
    if (msg) return setError(msg);
    onComplete({
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      phone: form.phone.trim(),
      country: form.country.trim(),
      cgpa: form.gpa ? parseFloat(form.gpa) : null,
      satScore: form.satScore ? parseInt(form.satScore, 10) : null,
      ieltsScore: form.ieltsScore ? parseFloat(form.ieltsScore) : null,
      preferredSubject: form.preferredSubject,
      email: form.email.trim(),
      password: form.password,
    });
  };

  const stepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <Field id="firstName" label="First Name" autoComplete="given-name" icon="person" placeholder="Enter your first name" type="text" value={form.firstName} onChange={set('firstName')} />
            <Field id="lastName" label="Last Name" autoComplete="family-name" icon="badge" placeholder="Enter your last name" type="text" value={form.lastName} onChange={set('lastName')} />
          </>
        );
      case 1:
        return (
          <>
            <Field id="phone" label="Phone Number" autoComplete="tel" icon="call" placeholder="Enter your phone number" type="tel" value={form.phone} onChange={set('phone')} />
            <Field id="country" label="Country" autoComplete="country-name" icon="flag" placeholder="Enter your country" type="text" value={form.country} onChange={set('country')} />
          </>
        );
      case 2:
        return (
          <>
            <Field id="gpa" label="GPA" icon="school" placeholder="e.g. 3.75" type="number" step="0.01" min="0" max="10" value={form.gpa} onChange={set('gpa')} />
            <Field id="satScore" label="SAT Score" icon="calculate" placeholder="e.g. 1350" type="number" min="400" max="1600" value={form.satScore} onChange={set('satScore')} />
            <Field id="ieltsScore" label="IELTS Band" icon="translate" placeholder="e.g. 7.5" type="number" step="0.5" min="0" max="9" value={form.ieltsScore} onChange={set('ieltsScore')} />
            <p className="text-[11px] text-text-muted text-center">Optional — you can update these later.</p>
          </>
        );
      case 3:
        return (
          <div>
            <label htmlFor="preferredSubject" className="block text-[12px] font-bold text-primary mb-1.5">
              Preferred Subject
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b] text-[18px] pointer-events-none">
                menu_book
              </span>
              <select
                id="preferredSubject"
                className={`${inputCls} appearance-none cursor-pointer ${form.preferredSubject ? '' : 'text-[#94a3b8]'}`}
                value={form.preferredSubject}
                onChange={set('preferredSubject')}
              >
                <option value="" disabled>
                  Select your preferred subject
                </option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b] text-[18px] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        );
      default:
        return (
          <>
            <Field id="email" label="Email Address" autoComplete="email" icon="mail" placeholder="Enter your email address" type="email" value={form.email} onChange={set('email')} />
            <Field id="password" label="Password" autoComplete="new-password" icon="lock" placeholder="Create a password" type="password" value={form.password} onChange={set('password')} />
            <Field id="confirmPassword" label="Confirm Password" autoComplete="new-password" icon="lock_reset" placeholder="Re-enter your password" type="password" value={form.confirmPassword} onChange={set('confirmPassword')} />
          </>
        );
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="h-full w-full flex flex-col items-center bg-white px-6 md:px-12 py-8 overflow-y-auto"
    >
      {/* Vertically-centered wrapper (my-auto avoids the justify-center clipping bug) */}
      <div className="my-auto w-full flex flex-col items-center">
        <h2 className="text-[22px] md:text-2xl font-extrabold text-primary w-full max-w-sm mb-5">
          Create Account
        </h2>

        {/* Progress indicator — connectors flex to touch each circle */}
        <div className="flex items-center w-full max-w-sm mb-6">
          {STEPS.map((s, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <Fragment key={s}>
                {i > 0 && (
                  <div className={`flex-1 h-[2px] rounded-full transition-colors duration-300 ${i <= step ? 'bg-accent' : 'bg-[#e2e8f0]'}`} />
                )}
                <button
                  type="button"
                  onClick={() => done && goTo(i)}
                  title={s}
                  aria-label={`Step ${i + 1}: ${s}`}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold border-2 transition-all duration-300 shrink-0 ${
                    done
                      ? 'bg-accent border-accent text-white'
                      : current
                      ? 'border-accent text-accent bg-white shadow-[0_0_0_4px_rgba(38,166,154,0.15)]'
                      : 'border-[#cbd5e1] text-[#94a3b8] bg-white'
                  } ${done ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {done ? (
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check
                    </span>
                  ) : (
                    i + 1
                  )}
                </button>
              </Fragment>
            );
          })}
        </div>

        {/* Step labels — mirrored structure so labels align under circle centers */}
        <div className="flex items-center w-full max-w-sm mb-6 hidden sm:flex">
          {STEPS.map((s, i) => (
            <Fragment key={s}>
              {i > 0 && <div className="flex-1" />}
              <span
                className={`w-9 shrink-0 text-center text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  i === step ? 'text-accent' : i < step ? 'text-primary' : 'text-[#94a3b8]'
                }`}
              >
                {s}
              </span>
            </Fragment>
          ))}
        </div>

        {/* Step content — fixed min-height sized to the tallest step (Scores: 3 inputs + note ≈ 266px measured) so the title, steps, and buttons stay put */}
        <div key={step} className="w-full max-w-sm space-y-3 mb-4 step-slide min-h-[272px]">
          {stepContent()}
        </div>

        {/* Error slot — reserved height so buttons never shift when an error appears */}
        <div className="w-full max-w-sm min-h-[22px] mb-1 flex items-center justify-center">
          {error && (
            <p role="alert" className="text-red-500 text-[11px] font-semibold text-center animate-fade-in">
              {error}
            </p>
          )}
        </div>

        {/* Navigation — fixed row height (min-h-12) keeps the block size identical on every step so the my-auto centering never shifts; Back appears from step 2 and Continue is full-width on step 1 */}
        <div className="flex items-center gap-3 w-full max-w-sm min-h-12">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="flex-1 py-3 rounded-full border-2 border-[#cbd5e1] text-primary font-bold text-[11px] uppercase tracking-widest hover:bg-[#f1f5f9] active:scale-95 transition-all"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className={`${step > 0 ? 'flex-[2]' : 'flex-1'} py-3 bg-primary text-white rounded-full font-bold text-[11px] uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-lg`}
          >
            {step === 4 ? 'Create Account' : 'Continue'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpWizard;
