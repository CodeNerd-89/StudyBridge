import { useEffect, useRef, useState } from 'react';
import api from '../../services/api';

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face';

const DEMO_USER = {
  name: 'Alex Chen',
  tagline: 'Studying Computer Science at Stanford University Aspirant. Focusing on the 2024 Early Action cycle.',
  gpa: '3.94',
  sat: '1540',
  readiness: '78%',
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
  const fileInputRef = useRef(null);

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
  const readiness = DEMO_USER.readiness;

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

        <div className="flex justify-center gap-16 border-y border-outline-variant/50 py-10">
          <div className="text-center">
            <span className="block font-['Plus_Jakarta_Sans'] text-[28px] font-bold text-deep-navy">
              {gpa}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant/60">
              GPA
            </span>
          </div>
          <div className="text-center">
            <span className="block font-['Plus_Jakarta_Sans'] text-[28px] font-bold text-deep-navy">
              {sat}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant/60">
              SAT
            </span>
          </div>
          <div className="text-center">
            <span className="block font-['Plus_Jakarta_Sans'] text-[28px] font-bold text-accent">
              {readiness}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant/60">
              Readiness
            </span>
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
            <button
              type="button"
              className="text-sm font-semibold text-accent transition hover:underline"
            >
              Manage All
            </button>
          </div>

          <div className="space-y-4">
            {[
              { initials: 'SU', name: 'Stanford University', meta: 'Early Action • 94% Match' },
              { initials: 'MIT', name: 'MIT', meta: 'Regular Decision • 88% Match' },
            ].map((uni) => (
              <div
                key={uni.name}
                className="group flex items-center justify-between rounded-xl border border-outline-variant/50 bg-white p-6 transition-all hover:shadow-lg hover:shadow-on-surface/5"
              >
                <div className="flex items-center gap-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-deep-navy font-bold text-white">
                    {uni.initials}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-deep-navy">
                      {uni.name}
                    </h4>
                    <p className="text-sm text-on-surface-variant">
                      {uni.meta}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant transition-colors group-hover:text-accent">
                  chevron_right
                </span>
              </div>
            ))}
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
