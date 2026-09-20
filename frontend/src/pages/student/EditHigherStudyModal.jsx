import { useState, useEffect } from 'react';
import api from '../../services/api';

const TARGET_DEGREES = [
  "Master's (MS/MSc)",
  "Ph.D. / Doctorate",
  "Bachelor's (BS/BA)",
  "MBA / Executive Master's",
  "Postgraduate Diploma / Certificate",
];

const TARGET_INTAKES = [
  'Fall 2025',
  'Spring 2026',
  'Summer 2026',
  'Fall 2026',
  'Spring 2027',
  'Fall 2027',
];

const FUNDING_PREFERENCES = [
  'Fully Funded (Assistantship RA/TA)',
  'Partial Scholarship / Tuition Waiver',
  'Need-Based Financial Aid',
  'Self-Funded / Private Loan',
  'Government / External Sponsorship',
];

const POPULAR_SUBJECTS = [
  'Computer Science',
  'Data Science & Analytics',
  'Artificial Intelligence & ML',
  'Software Engineering',
  'Electrical & Computer Engineering',
  'Mechanical Engineering',
  'Biotechnology & Bioinformatics',
  'Business Administration (MBA)',
  'Economics & Finance',
  'Public Health & Medicine',
  'Physics & Mathematics',
  'Civil & Environmental Engineering',
];

const EditHigherStudyModal = ({ isOpen, onClose, user, onSaveSuccess }) => {
  const [activeTab, setActiveTab] = useState('goals');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    country: '',
    institution: '',
    subject: '',
    preferredSubject: '',
    targetDegree: '',
    targetIntake: '',
    targetCountry: '',
    fundingPreference: '',
    cgpa: '',
    satScore: '',
    ieltsScore: '',
    greScore: '',
    toeflScore: '',
    duolingoScore: '',
    graduationYear: '',
    researchInterests: '',
    publicationsCount: '',
    workExperienceYears: '',
    linkedinUrl: '',
    githubUrl: '',
    researchGateUrl: '',
    statementOfPurpose: '',
  });

  useEffect(() => {
    if (isOpen && user) {
      setForm({
        name: user.name || '',
        country: user.country || '',
        institution: user.institution || '',
        subject: user.subject || '',
        preferredSubject: user.preferredSubject || '',
        targetDegree: user.targetDegree || "Master's (MS/MSc)",
        targetIntake: user.targetIntake || 'Fall 2025',
        targetCountry: user.targetCountry || '',
        fundingPreference: user.fundingPreference || 'Fully Funded (Assistantship RA/TA)',
        cgpa: user.cgpa != null ? String(user.cgpa) : '',
        satScore: user.satScore != null ? String(user.satScore) : '',
        ieltsScore: user.ieltsScore != null ? String(user.ieltsScore) : '',
        greScore: user.greScore != null ? String(user.greScore) : '',
        toeflScore: user.toeflScore != null ? String(user.toeflScore) : '',
        duolingoScore: user.duolingoScore != null ? String(user.duolingoScore) : '',
        graduationYear: user.graduationYear != null ? String(user.graduationYear) : '',
        researchInterests: user.researchInterests || '',
        publicationsCount: user.publicationsCount != null ? String(user.publicationsCount) : '',
        workExperienceYears: user.workExperienceYears != null ? String(user.workExperienceYears) : '',
        linkedinUrl: user.linkedinUrl || '',
        githubUrl: user.githubUrl || '',
        researchGateUrl: user.researchGateUrl || '',
        statementOfPurpose: user.statementOfPurpose || '',
      });
      setError('');
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    // Score validations
    if (form.cgpa && (parseFloat(form.cgpa) < 0 || parseFloat(form.cgpa) > 10)) {
      setError('CGPA must be between 0.0 and 10.0');
      setSaving(false);
      return;
    }
    if (form.greScore && (parseInt(form.greScore, 10) < 260 || parseInt(form.greScore, 10) > 340)) {
      setError('GRE Score must be between 260 and 340');
      setSaving(false);
      return;
    }
    if (form.ieltsScore && (parseFloat(form.ieltsScore) < 0 || parseFloat(form.ieltsScore) > 9)) {
      setError('IELTS Band must be between 0.0 and 9.0');
      setSaving(false);
      return;
    }
    if (form.toeflScore && (parseInt(form.toeflScore, 10) < 0 || parseInt(form.toeflScore, 10) > 120)) {
      setError('TOEFL iBT Score must be between 0 and 120');
      setSaving(false);
      return;
    }
    if (form.duolingoScore && (parseInt(form.duolingoScore, 10) < 10 || parseInt(form.duolingoScore, 10) > 160)) {
      setError('Duolingo score must be between 10 and 160');
      setSaving(false);
      return;
    }
    if (form.satScore && (parseInt(form.satScore, 10) < 400 || parseInt(form.satScore, 10) > 1600)) {
      setError('SAT Score must be between 400 and 1600');
      setSaving(false);
      return;
    }

    try {
      const payload = {
        name: form.name.trim() || user?.name || 'Student',
        country: form.country.trim() || user?.country || 'Bangladesh',
        institution: form.institution.trim() || null,
        subject: form.subject.trim() || null,
        preferredSubject: form.preferredSubject.trim() || null,
        targetDegree: form.targetDegree.trim() || null,
        targetIntake: form.targetIntake.trim() || null,
        targetCountry: form.targetCountry.trim() || null,
        fundingPreference: form.fundingPreference.trim() || null,
        cgpa: form.cgpa ? parseFloat(form.cgpa) : null,
        satScore: form.satScore ? parseInt(form.satScore, 10) : null,
        ieltsScore: form.ieltsScore ? parseFloat(form.ieltsScore) : null,
        greScore: form.greScore ? parseInt(form.greScore, 10) : null,
        toeflScore: form.toeflScore ? parseInt(form.toeflScore, 10) : null,
        duolingoScore: form.duolingoScore ? parseInt(form.duolingoScore, 10) : null,
        graduationYear: form.graduationYear ? parseInt(form.graduationYear, 10) : null,
        researchInterests: form.researchInterests.trim() || null,
        publicationsCount: form.publicationsCount ? parseInt(form.publicationsCount, 10) : 0,
        workExperienceYears: form.workExperienceYears ? parseFloat(form.workExperienceYears) : null,
        linkedinUrl: form.linkedinUrl.trim() || null,
        githubUrl: form.githubUrl.trim() || null,
        researchGateUrl: form.researchGateUrl.trim() || null,
        statementOfPurpose: form.statementOfPurpose.trim() || null,
      };

      const res = await api.put('/auth/profile', payload);
      const updatedUser = res.data?.user || { ...user, ...payload };
      onSaveSuccess(updatedUser);
      onClose();
    } catch (err) {
      console.error('Failed to save higher study profile:', err);
      setError(err?.response?.data?.message || 'Could not save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'goals', label: 'Study Goals', icon: 'explore' },
    { id: 'academic', label: 'Academic Background', icon: 'school' },
    { id: 'tests', label: 'Test Scores', icon: 'analytics' },
    { id: 'research', label: 'Research & Work', icon: 'science' },
    { id: 'links', label: 'Links & Statement', icon: 'link' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
      <div
        className="relative flex flex-col w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="higher-study-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-gradient-to-r from-slate-50 via-white to-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <span className="material-symbols-outlined text-[22px]">school</span>
            </div>
            <div>
              <h2 id="higher-study-modal-title" className="text-lg font-bold text-deep-navy">
                Higher Study Profile
              </h2>
              <p className="text-xs text-on-surface-variant">
                Credentials and target preferences for university admissions
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 px-6 bg-slate-50/50 overflow-x-auto gap-2 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-700 font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* TAB 1: STUDY GOALS */}
          {activeTab === 'goals' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-deep-navy mb-1">
                  Target Degree Level <span className="text-accent">*</span>
                </label>
                <select
                  value={form.targetDegree}
                  onChange={handleChange('targetDegree')}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                >
                  <option value="">Select target degree</option>
                  {TARGET_DEGREES.map((deg) => (
                    <option key={deg} value={deg}>
                      {deg}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-deep-navy mb-1">
                    Target Intake / Term
                  </label>
                  <select
                    value={form.targetIntake}
                    onChange={handleChange('targetIntake')}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                  >
                    <option value="">Select intake session</option>
                    {TARGET_INTAKES.map((term) => (
                      <option key={term} value={term}>
                        {term}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-deep-navy mb-1">
                    Intended Field of Study / Major
                  </label>
                  <input
                    type="text"
                    list="subjects-list"
                    value={form.preferredSubject}
                    onChange={handleChange('preferredSubject')}
                    placeholder="e.g. Computer Science, AI, Mechanical"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                  />
                  <datalist id="subjects-list">
                    {POPULAR_SUBJECTS.map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-navy mb-1">
                  Target Countries / Destinations
                </label>
                <input
                  type="text"
                  value={form.targetCountry}
                  onChange={handleChange('targetCountry')}
                  placeholder="e.g. United States, Canada, Germany, United Kingdom"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Separate preferred study destinations with commas.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-navy mb-1">
                  Funding & Scholarship Preference
                </label>
                <select
                  value={form.fundingPreference}
                  onChange={handleChange('fundingPreference')}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                >
                  <option value="">Select funding preference</option>
                  {FUNDING_PREFERENCES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* TAB 2: ACADEMIC BACKGROUND */}
          {activeTab === 'academic' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-deep-navy mb-1">
                  Current or Previous Institution
                </label>
                <input
                  type="text"
                  value={form.institution}
                  onChange={handleChange('institution')}
                  placeholder="e.g. University of Dhaka, BUET, North South University"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-navy mb-1">
                  Undergraduate / Completed Degree & Major
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={handleChange('subject')}
                  placeholder="e.g. B.Sc. in Computer Science & Engineering"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-deep-navy mb-1">
                    Graduation Year (or Expected)
                  </label>
                  <input
                    type="number"
                    min="1990"
                    max="2035"
                    value={form.graduationYear}
                    onChange={handleChange('graduationYear')}
                    placeholder="e.g. 2024 or 2025"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-deep-navy mb-1">
                    Current / Final CGPA (on 4.0 or 10.0 scale)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={form.cgpa}
                    onChange={handleChange('cgpa')}
                    placeholder="e.g. 3.75"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-deep-navy mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="Full Name"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-deep-navy mb-1">
                    Country of Origin / Citizenship
                  </label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={handleChange('country')}
                    placeholder="e.g. Bangladesh"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STANDARDIZED TEST SCORES */}
          {activeTab === 'tests' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Enter any standardized tests you have taken or are preparing for. These will be matched against university criteria.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/40">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-deep-navy">GRE General Test</span>
                    <span className="text-[10px] uppercase font-extrabold text-slate-400">Total / 340</span>
                  </div>
                  <input
                    type="number"
                    min="260"
                    max="340"
                    value={form.greScore}
                    onChange={handleChange('greScore')}
                    placeholder="e.g. 320"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-deep-navy bg-white focus:border-accent outline-none"
                  />
                  <span className="mt-1 block text-[10px] text-slate-400">Required for most Graduate/MS/PhD programs</span>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/40">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-deep-navy">IELTS Academic</span>
                    <span className="text-[10px] uppercase font-extrabold text-slate-400">Band / 9.0</span>
                  </div>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="9"
                    value={form.ieltsScore}
                    onChange={handleChange('ieltsScore')}
                    placeholder="e.g. 7.5"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-deep-navy bg-white focus:border-accent outline-none"
                  />
                  <span className="mt-1 block text-[10px] text-slate-400">English proficiency (0.0 to 9.0)</span>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/40">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-deep-navy">TOEFL iBT</span>
                    <span className="text-[10px] uppercase font-extrabold text-slate-400">Total / 120</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={form.toeflScore}
                    onChange={handleChange('toeflScore')}
                    placeholder="e.g. 102"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-deep-navy bg-white focus:border-accent outline-none"
                  />
                  <span className="mt-1 block text-[10px] text-slate-400">Internet-based English score</span>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/40">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-deep-navy">Duolingo English Test</span>
                    <span className="text-[10px] uppercase font-extrabold text-slate-400">Score / 160</span>
                  </div>
                  <input
                    type="number"
                    min="10"
                    max="160"
                    value={form.duolingoScore}
                    onChange={handleChange('duolingoScore')}
                    placeholder="e.g. 130"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-deep-navy bg-white focus:border-accent outline-none"
                  />
                  <span className="mt-1 block text-[10px] text-slate-400">Alternative online English test</span>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/40 sm:col-span-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-deep-navy">SAT Reasoning Test</span>
                    <span className="text-[10px] uppercase font-extrabold text-slate-400">Score / 1600</span>
                  </div>
                  <input
                    type="number"
                    min="400"
                    max="1600"
                    value={form.satScore}
                    onChange={handleChange('satScore')}
                    placeholder="e.g. 1420"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-deep-navy bg-white focus:border-accent outline-none"
                  />
                  <span className="mt-1 block text-[10px] text-slate-400">Undergraduate admissions test</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RESEARCH & WORK EXPERIENCE */}
          {activeTab === 'research' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-deep-navy mb-1">
                  Research Interests & Specializations
                </label>
                <input
                  type="text"
                  value={form.researchInterests}
                  onChange={handleChange('researchInterests')}
                  placeholder="e.g. Machine Learning, Computer Vision, Distributed Systems, Cloud Computing"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Comma-separated keywords highlighting your academic/research focus.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-deep-navy mb-1">
                    Published Research Papers / Conference Proceedings
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={form.publicationsCount}
                    onChange={handleChange('publicationsCount')}
                    placeholder="e.g. 2"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Number of peer-reviewed articles, workshops, or posters.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-deep-navy mb-1">
                    Relevant Work / Lab Experience (Years)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="40"
                    value={form.workExperienceYears}
                    onChange={handleChange('workExperienceYears')}
                    placeholder="e.g. 1.5"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Total years as Research Assistant, Software Engineer, or Intern.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LINKS & STATEMENT */}
          {activeTab === 'links' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-deep-navy mb-1">
                  LinkedIn Profile URL
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    link
                  </span>
                  <input
                    type="url"
                    value={form.linkedinUrl}
                    onChange={handleChange('linkedinUrl')}
                    placeholder="https://linkedin.com/in/yourusername"
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-navy mb-1">
                  GitHub / Portfolio Website URL
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    code
                  </span>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={handleChange('githubUrl')}
                    placeholder="https://github.com/yourusername"
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-navy mb-1">
                  Google Scholar / ResearchGate Profile URL
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    menu_book
                  </span>
                  <input
                    type="url"
                    value={form.researchGateUrl}
                    onChange={handleChange('researchGateUrl')}
                    placeholder="https://scholar.google.com/citations?user=..."
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-navy mb-1">
                  Statement of Purpose / Research Vision Summary
                </label>
                <textarea
                  rows={4}
                  value={form.statementOfPurpose}
                  onChange={handleChange('statementOfPurpose')}
                  placeholder="Brief 2-3 sentence overview of your academic background, research motivations, and target aspirations in higher studies..."
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-deep-navy focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition resize-none"
                />
              </div>
            </div>
          )}

          {/* Footer Action Bar */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-full bg-accent px-7 py-2 text-xs font-bold text-white shadow-md shadow-accent/20 hover:bg-accent-teal hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[16px]">
                {saving ? 'hourglass_top' : 'check'}
              </span>
              <span>{saving ? 'Saving Changes…' : 'Save Higher Study Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHigherStudyModal;
