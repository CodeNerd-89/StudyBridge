import { Fragment, useState } from 'react';

const STEPS = ['Personal', 'Scores', 'Subject'];

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

const ProfileCompletionWizard = ({ defaultName = '', onComplete, submitting = false }) => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: defaultName,
    country: '',
    gpa: '',
    satScore: '',
    ieltsScore: '',
    preferredSubject: '',
  });

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (error) setError('');
  };

  const validate = () => {
    switch (step) {
      case 0:
        if (!form.name.trim() || !form.country.trim())
          return 'Please enter your name and country.';
        break;
      case 1: {
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
      case 2:
        if (!form.preferredSubject) return 'Please choose your preferred subject.';
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
    if (step < 2) return next();
    const msg = validate();
    if (msg) return setError(msg);
    onComplete({
      name: form.name.trim(),
      country: form.country.trim(),
      cgpa: form.gpa ? parseFloat(form.gpa) : null,
      satScore: form.satScore ? parseInt(form.satScore, 10) : null,
      ieltsScore: form.ieltsScore ? parseFloat(form.ieltsScore) : null,
      preferredSubject: form.preferredSubject,
    });
  };

  const stepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <Field id="name" label="Full Name" autoComplete="name" icon="person" placeholder="Enter your full name" type="text" value={form.name} onChange={set('name')} />
            <Field id="country" label="Country" autoComplete="country-name" icon="flag" placeholder="Enter your country" type="text" value={form.country} onChange={set('country')} />
          </>
        );
      case 1:
        return (
          <>
            <Field id="gpa" label="CGPA" icon="school" placeholder="e.g. 3.75" type="number" step="0.01" min="0" max="10" value={form.gpa} onChange={set('gpa')} />
            <Field id="satScore" label="SAT Score" icon="calculate" placeholder="e.g. 1350" type="number" min="400" max="1600" value={form.satScore} onChange={set('satScore')} />
            <Field id="ieltsScore" label="IELTS Band" icon="translate" placeholder="e.g. 7.5" type="number" step="0.5" min="0" max="9" value={form.ieltsScore} onChange={set('ieltsScore')} />
            <p className="text-[11px] text-text-muted text-center">Optional — you can update these later.</p>
          </>
        );
      case 2:
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
        return null;
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="h-full w-full flex flex-col items-center bg-white px-6 md:px-12 py-8 overflow-y-auto"
    >
      <div className="my-auto w-full flex flex-col items-center">
        <h2 className="text-[22px] md:text-2xl font-extrabold text-primary w-full max-w-sm mb-5">
          Complete Your Profile
        </h2>

        {/* Progress indicator */}
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

        {/* Step labels */}
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

        {/* Step content */}
        <div key={step} className="w-full max-w-sm space-y-3 mb-4 step-slide min-h-[272px]">
          {stepContent()}
        </div>

        {/* Error */}
        <div className="w-full max-w-sm h-[16px] flex items-center justify-center">
          {error && (
            <p role="alert" className="text-red-500 text-[11px] font-semibold text-center animate-fade-in">
              {error}
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3 w-full max-w-sm min-h-12">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              disabled={submitting}
              className="flex-1 py-3 rounded-full border-2 border-[#cbd5e1] text-primary font-bold text-[11px] uppercase tracking-widest hover:bg-[#f1f5f9] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={submitting}
            className={`${step > 0 ? 'flex-[2]' : 'flex-1'} py-3 bg-primary text-white rounded-full font-bold text-[11px] uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {submitting ? 'Saving…' : step === 2 ? 'Complete Profile' : 'Continue'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileCompletionWizard;
