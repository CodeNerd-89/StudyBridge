import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { getBookmarks, removeBookmark } from '../../services/bookmarks';

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face';

const DEMO_USER = {
  name: 'Alex Chen',
  tagline: 'Studying Computer Science at Stanford University Aspirant. Focusing on the 2024 Early Action cycle.',
  gpa: '3.94',
  sat: '1540',
  ielts: '7.0',
};

// Cached profile saved at login/registration, so the page isn't blank while /me loads
const getCachedUser = () => {
  try {
    const cached = localStorage.getItem('userProfile');
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const ProfilePage = () => {
  const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || DEFAULT_AVATAR);
  const [user, setUser] = useState(getCachedUser());
  const [bookmarks, setBookmarks] = useState(getBookmarks());
  const [manageMode, setManageMode] = useState(false);
  const [editingScores, setEditingScores] = useState(false);
  const [scoreDraft, setScoreDraft] = useState({ cgpa: '', satScore: '', ieltsScore: '' });
  const [savingScores, setSavingScores] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const refresh = () => setBookmarks(getBookmarks());
    window.addEventListener('bookmarkschange', refresh);
    return () => window.removeEventListener('bookmarkschange', refresh);
  }, []);

  // Load the logged-in student's real data (name, GPA, SAT, …) from the backend
  useEffect(() => {
    let cancelled = false;
    const loadProfile = async () => {
      try {
        const { data } = await api.get('/auth/me');
        if (!cancelled && data.user) setUser(data.user);
      } catch {
        // Keep the cached (or demo) profile — nothing to show the user about this
      }
    };
    loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Downscale to a small JPEG (aspect preserved) so the dataURL stays well under localStorage's quota
        const MAX = 400;
        const scale = Math.min(1, MAX / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setAvatar(dataUrl);
        localStorage.setItem('userAvatar', dataUrl);
        window.dispatchEvent(new Event('profileupdate'));
      };
      img.onerror = () => {
        e.target.value = '';
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // allow re-selecting the same file later
  };

  // Real data wins; cached/demo values only fill gaps. '—' when the logged-in user left a field blank
  const name = user?.name || DEMO_USER.name;
  const taglineParts = user
    ? [
        user.preferredSubject && `${user.preferredSubject} aspirant`,
        user.country && `from ${user.country}`,
        user.institution && `at ${user.institution}`,
      ].filter(Boolean)
    : [];
  const tagline = taglineParts.length
    ? `${taglineParts.join(' ')} — exploring top universities worldwide.`
    : DEMO_USER.tagline;
  const gpa = user ? (user.cgpa != null ? String(user.cgpa) : '—') : DEMO_USER.gpa;
  const sat = user ? (user.satScore != null ? String(user.satScore) : '—') : DEMO_USER.sat;
  const ielts = user ? (user.ieltsScore != null ? String(user.ieltsScore) : '—') : DEMO_USER.ielts;

  const startEditingScores = () => {
    setScoreDraft({
      cgpa: user?.cgpa != null ? String(user.cgpa) : '',
      satScore: user?.satScore != null ? String(user.satScore) : '',
      ieltsScore: user?.ieltsScore != null ? String(user.ieltsScore) : '',
    });
    setEditingScores(true);
  };

  const saveScores = async () => {
    setSavingScores(true);
    try {
      const { data } = await api.put('/auth/profile', {
        name: user?.name || DEMO_USER.name,
        country: user?.country || '',
        cgpa: scoreDraft.cgpa || null,
        satScore: scoreDraft.satScore || null,
        ieltsScore: scoreDraft.ieltsScore || null,
        preferredSubject: user?.preferredSubject || null,
      });
      if (data.user) {
        setUser(data.user);
        localStorage.setItem('userProfile', JSON.stringify(data.user));
      }
      if (data.token) localStorage.setItem('token', data.token);
      window.dispatchEvent(new Event('profileupdate'));
    } catch {
      // silently keep old values
    } finally {
      setSavingScores(false);
      setEditingScores(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Profile Header */}
      <section className="mb-24 text-center">
        <div className="relative mb-8 inline-block">
          <img
            className="h-40 w-40 rounded-full border-4 border-white object-cover shadow-xl"
            src={avatar}
            alt={`${name} portrait`}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border border-surface-variant bg-white text-on-surface shadow-lg transition-transform hover:scale-105"
            aria-label="Upload profile photo"
          >
            <span className="material-symbols-outlined text-[20px] text-deep-navy">
              photo_camera
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <h1 className="mb-4 font-['Plus_Jakarta_Sans'] text-[40px] font-bold leading-tight tracking-tight text-deep-navy">
          {name}
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
          {tagline}
        </p>

        <div className="border-y border-outline-variant/50 py-10">
          <div className="flex justify-center gap-6 sm:gap-10">
            {[
              { key: 'cgpa', label: 'CGPA', value: gpa, color: 'accent' },
              { key: 'satScore', label: 'SAT', value: sat, color: 'deep-navy' },
              { key: 'ieltsScore', label: 'IELTS', value: ielts, color: 'deep-navy' },
            ].map((s) => (
              <div
                key={s.key}
                className={`group relative flex flex-col items-center rounded-2xl px-6 py-5 transition-all duration-300 ${
                  editingScores
                    ? 'bg-white shadow-[0_2px_16px_rgba(26,43,72,0.08)] scale-100'
                    : 'hover:bg-white hover:shadow-[0_2px_12px_rgba(26,43,72,0.06)]'
                }`}
              >
                {editingScores ? (
                  <div className="relative">
                    <input
                      type="text"
                      value={scoreDraft[s.key]}
                      onChange={(e) => setScoreDraft((p) => ({ ...p, [s.key]: e.target.value }))}
                      className={`block w-20 text-center bg-transparent border-b-2 border-accent font-['Plus_Jakarta_Sans'] text-[28px] font-bold outline-none ${
                        s.key === 'cgpa' ? 'text-accent' : 'text-deep-navy'
                      }`}
                      placeholder="—"
                      inputMode={s.key === 'satScore' ? 'numeric' : 'decimal'}
                      autoFocus={s.key === 'cgpa'}
                    />
                    <div className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:full -translate-x-1/2" style={{ width: '100%' }} />
                  </div>
                ) : (
                  <span className={`block font-['Plus_Jakarta_Sans'] text-[28px] font-bold ${
                    s.key === 'cgpa' ? 'text-accent' : 'text-deep-navy'
                  }`}>
                    {s.value}
                  </span>
                )}
                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/50">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            {editingScores ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={saveScores}
                  disabled={savingScores}
                  className="flex items-center gap-1.5 rounded-full bg-accent px-6 py-2 text-xs font-bold text-white shadow-md shadow-accent/20 transition-all hover:shadow-lg hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-[14px]">{savingScores ? 'hourglass_top' : 'check'}</span>
                  {savingScores ? 'Saving…' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingScores(false)}
                  className="rounded-full border border-outline bg-white px-5 py-2 text-xs font-bold text-on-surface transition-all hover:bg-surface-container-low hover:scale-[1.02] active:scale-[0.98]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={startEditingScores}
                className="group/btn flex items-center gap-2 rounded-full border border-outline/60 bg-white px-5 py-2 text-xs font-bold text-on-surface-variant transition-all hover:border-accent hover:text-accent hover:shadow-md hover:shadow-accent/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[15px] transition-transform group-hover/btn:rotate-[-12deg]">edit</span>
                Edit Scores
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Current Priority */}
      <section className="mb-24">
        <div className="flex flex-col items-center rounded-xl border border-surface-variant/30 bg-surface-container-low p-12 text-center">
          <span className="mb-6 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
            Current Priority
          </span>
          <h2 className="mb-4 font-['Plus_Jakarta_Sans'] text-[28px] font-semibold leading-snug text-deep-navy">
            Drafting the Main Essay
          </h2>
          <p className="mb-10 max-w-lg text-base leading-relaxed text-on-surface-variant">
            Your Stanford Early Action application is 78% complete. Finalizing
            your personal statement is the most impactful step you can take
            today.
          </p>
          <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              className="rounded-xl bg-accent px-10 py-4 text-sm font-bold text-white shadow-sm transition-all hover:shadow-lg hover:shadow-accent/20"
            >
              Resume Drafting
            </button>
            <button
              type="button"
              className="rounded-xl border border-outline bg-white px-10 py-4 text-sm font-bold text-deep-navy transition-colors hover:bg-surface-container-low"
            >
              View Samples
            </button>
          </div>
        </div>
      </section>

      {/* Two Column Grid */}
      <div className="mb-24 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left: University Pipeline */}
        <div className="lg:col-span-7">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-['Plus_Jakarta_Sans'] text-[28px] font-semibold text-deep-navy">
              University Pipeline
            </h3>
            {bookmarks.length > 0 && (
              <button
                type="button"
                onClick={() => setManageMode(!manageMode)}
                className="text-sm font-semibold text-accent transition hover:underline"
              >
                {manageMode ? 'Done' : 'Manage All'}
              </button>
            )}
          </div>

          <div className="space-y-4">
            {bookmarks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-outline-variant/50 bg-white p-8 text-center">
                <span className="material-symbols-outlined mb-2 text-3xl text-on-surface-variant/40">bookmark_border</span>
                <p className="text-sm text-on-surface-variant">No bookmarked universities yet.</p>
                <Link to="/universities" className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">
                  Browse Universities
                </Link>
              </div>
            ) : (
              bookmarks.map((uni) => {
                const initials = uni.name
                  .split(' ')
                  .filter((w) => w.length > 2 || w === 'MIT')
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join('')
                  .toUpperCase();
                const Wrapper = manageMode ? 'div' : Link;
                const wrapperProps = manageMode
                  ? { key: uni.id }
                  : { key: uni.id, to: '/universities', state: { universityId: uni.id } };
                return (
                  <Wrapper
                    {...wrapperProps}
                    className="group flex items-center justify-between rounded-xl border border-outline-variant/50 bg-white p-6 transition-all hover:shadow-lg hover:shadow-on-surface/5"
                  >
                    <div className="flex items-center gap-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-deep-navy font-bold text-white">
                        {initials}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-deep-navy">
                          {uni.name}
                        </h4>
                        <p className="text-sm text-on-surface-variant">
                          {[uni.ranking && `QS #${uni.ranking}`, uni.country].filter(Boolean).join(' • ')}
                        </p>
                      </div>
                    </div>
                    {manageMode ? (
                      <button
                        type="button"
                        onClick={() => removeBookmark(uni.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-error transition hover:bg-error/10"
                        title="Remove from pipeline"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    ) : (
                      <span className="material-symbols-outlined text-on-surface-variant transition-colors group-hover:text-accent">
                        chevron_right
                      </span>
                    )}
                  </Wrapper>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Recommended Actions */}
        <div className="lg:col-span-5">
          <h3 className="mb-8 font-['Plus_Jakarta_Sans'] text-[28px] font-semibold text-deep-navy">
            Recommended Actions
          </h3>

          <div className="relative space-y-12 pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-outline-variant">
            {/* Deadline */}
            <div className="relative">
              <div className="absolute -left-10 top-0 h-6 w-6 rounded-full border-4 border-white bg-error shadow-sm" />
              <div>
                <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-error">
                  Deadline • Oct 15
                </span>
                <h4 className="mb-2 text-base font-semibold text-deep-navy">
                  Submit Stanford Application
                </h4>
                <p className="mb-4 text-sm text-on-surface-variant">
                  The Early Action window closes in 12 days. Ensure all
                  materials are reviewed.
                </p>
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm font-bold text-deep-navy transition hover:text-accent"
                >
                  Add to Calendar{' '}
                  <span className="material-symbols-outlined text-sm">
                    open_in_new
                  </span>
                </button>
              </div>
            </div>

            {/* Scholarship */}
            <div className="relative">
              <div className="absolute -left-10 top-0 h-6 w-6 rounded-full border-4 border-white bg-accent shadow-sm" />
              <div>
                <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-accent">
                  Opportunity • $10k Award
                </span>
                <h4 className="mb-2 text-base font-semibold text-deep-navy">
                  STEM Excellence Grant
                </h4>
                <p className="mb-4 text-sm text-on-surface-variant">
                  Matches your profile and Computer Science interest.
                  Application takes ~15 mins.
                </p>
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm font-bold text-deep-navy transition hover:text-accent"
                >
                  Apply Now{' '}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* Task */}
            <div className="relative">
              <div className="absolute -left-10 top-0 h-6 w-6 rounded-full border-4 border-white bg-deep-navy shadow-sm" />
              <div>
                <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-deep-navy">
                  Task • Missing Doc
                </span>
                <h4 className="mb-2 text-base font-semibold text-deep-navy">
                  Request Recommendation Letter
                </h4>
                <p className="mb-4 text-sm text-on-surface-variant">
                  You still need one more academic reference for your common
                  app.
                </p>
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm font-bold text-deep-navy transition hover:text-accent"
                >
                  Email Counselor{' '}
                  <span className="material-symbols-outlined text-sm">
                    mail
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
