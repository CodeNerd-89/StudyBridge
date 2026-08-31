import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import UniversityFilterBar from '../../features/universities/UniversityFilterBar';
import UniCard from '../../features/universities/UniCard';
import UniversityDetailModal from '../../features/universities/UniversityDetailModal';
import { Search, RotateCcw, Sparkles, X, Globe2, Building2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import { initialUniversities } from '../../data/initialData';

const estimateMatch = (ranking, acceptanceRate) => {
  if (typeof acceptanceRate === 'number') {
    return Math.max(45, Math.min(98, Math.round(100 - acceptanceRate * 0.7)));
  }

  if (typeof ranking === 'number') {
    return Math.max(45, Math.min(98, Math.round(100 - ranking / 2.5)));
  }

  return 82;
};

const UniversityPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  // Start with instant initial data so page is never blank
  const [universities, setUniversities] = useState(initialUniversities);
  const [availableSubjects, setAvailableSubjects] = useState([
    'All',
    'AI',
    'Architecture',
    'Business',
    'Computer Science',
    'Data Science',
    'Economics',
    'Engineering',
    'Law',
    'Mathematics',
    'Medicine',
    'Physics',
    'Robotics',
  ]);

  // Search state
  const initialSearch = searchParams.get('search') || '';
  const initialCountry = searchParams.get('country') || 'All';
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Applied Filter states (updated only when user clicks Apply Filters or Reset)
  const [appliedCountry, setAppliedCountry] = useState(initialCountry);
  const [appliedSubject, setAppliedSubject] = useState('All');
  const [appliedBudget, setAppliedBudget] = useState('All');
  const [appliedIelts, setAppliedIelts] = useState('All');
  const [appliedSort, setAppliedSort] = useState('ranking');

  // Detail Modal state
  const [activeModalUni, setActiveModalUni] = useState(null);

  // Sync search / country params if updated from URL
  useEffect(() => {
    const q = searchParams.get('search');
    const c = searchParams.get('country');
    if (q !== null && q !== undefined) {
      setSearchQuery(q);
    }
    if (c) {
      setAppliedCountry(c);
    }
  }, [searchParams]);

  // Auto-open university detail or apply search when navigated from homepage with state
  useEffect(() => {
    const targetId = location.state?.universityId;
    const targetSearch = location.state?.search;
    if (targetId) {
      const uni = universities.find((u) => u.id === targetId);
      if (uni) {
        setActiveModalUni(uni);
      }
    }
    if (targetSearch) {
      setSearchQuery(targetSearch);
    }
    if (targetId || targetSearch) {
      window.history.replaceState({}, '');
    }
  }, [location.state, universities]);

  // Followed universities state
  const [followedUniIds, setFollowedUniIds] = useState(new Set());
  const [onlyFollowed, setOnlyFollowed] = useState(false);

  // Load followed universities IDs from backend
  const loadFollowedIds = useCallback(async () => {
    if (!localStorage.getItem('token')) {
      setFollowedUniIds(new Set());
      return;
    }

    try {
      const res = await api.get('/universities/followed/ids');
      if (res.data?.success && Array.isArray(res.data.followedIds)) {
        setFollowedUniIds(new Set(res.data.followedIds));
      }
    } catch (err) {
      console.warn('Could not load followed universities IDs:', err?.message);
    }
  }, []);

  useEffect(() => {
    loadFollowedIds();

    const handleFollowChange = (e) => {
      const { universityId, isFollowing } = e.detail || {};
      if (universityId) {
        setFollowedUniIds((prev) => {
          const next = new Set(prev);
          if (isFollowing) {
            next.add(universityId);
          } else {
            next.delete(universityId);
          }
          return next;
        });
      }
    };

    window.addEventListener('followchange', handleFollowChange);
    window.addEventListener('authchange', loadFollowedIds);

    return () => {
      window.removeEventListener('followchange', handleFollowChange);
      window.removeEventListener('authchange', loadFollowedIds);
    };
  }, [loadFollowedIds]);

  // Load available subjects from backend in background
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get('/universities/subjects');
        if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 1) {
          setAvailableSubjects(res.data.data);
        }
      } catch (e) {
        // Keep initial subjects
      }
    };
    fetchSubjects();
  }, []);

  // Fetch universities with applied filters from backend
  const loadUniversities = useCallback(async () => {
    try {
      const params = {
        limit: 100,
        sort: appliedSort,
      };

      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (appliedCountry !== 'All') params.country = appliedCountry;
      if (appliedSubject !== 'All') params.subject = appliedSubject;
      if (appliedBudget !== 'All') params.budget = appliedBudget;
      if (appliedIelts !== 'All') params.maxIelts = Number(appliedIelts);

      const response = await api.get('/universities', { params });
      if (response.data?.data && response.data.data.length > 0) {
        setUniversities(response.data.data);
      }
    } catch (requestError) {
      console.warn('API fetch notice, using responsive dataset:', requestError?.message);
    }
  }, [searchQuery, appliedCountry, appliedSubject, appliedBudget, appliedIelts, appliedSort]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadUniversities();
    }, 150);

    return () => clearTimeout(debounceTimer);
  }, [loadUniversities]);

  // Client-side filtering
  const displayedUniversities = useMemo(() => {
    let list = universities.filter((u) => {
      if (onlyFollowed && u.id && !followedUniIds.has(u.id)) {
        return false;
      }

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        u.name?.toLowerCase().includes(query) ||
        u.country?.toLowerCase().includes(query) ||
        u.city?.toLowerCase().includes(query) ||
        (Array.isArray(u.courses) && u.courses.some((c) => (typeof c === 'string' ? c : c?.name || '').toLowerCase().includes(query)));

      const matchesCountry = appliedCountry === 'All' || u.country?.toLowerCase() === appliedCountry.toLowerCase();

      const matchesSubject =
        appliedSubject === 'All' ||
        (Array.isArray(u.courses) && u.courses.some((c) => (typeof c === 'string' ? c : c?.name || '').toLowerCase().includes(appliedSubject.toLowerCase())));

      let matchesBudget = true;
      const tuition = u.tuitionAnnualUsd || 0;
      if (appliedBudget === 'Low') matchesBudget = tuition < 15000;
      else if (appliedBudget === 'Mid') matchesBudget = tuition >= 15000 && tuition < 30000;
      else if (appliedBudget === 'High') matchesBudget = tuition >= 30000;

      let matchesIelts = true;
      if (appliedIelts !== 'All') {
        matchesIelts = !u.ieltsRequirement || u.ieltsRequirement <= Number(appliedIelts);
      }

      return matchesSearch && matchesCountry && matchesSubject && matchesBudget && matchesIelts;
    });

    // Client sort
    if (appliedSort === 'ranking') {
      list = [...list].sort((a, b) => (a.ranking || 999) - (b.ranking || 999));
    } else if (appliedSort === 'tuition-asc') {
      list = [...list].sort((a, b) => (a.tuitionAnnualUsd || 0) - (b.tuitionAnnualUsd || 0));
    } else if (appliedSort === 'tuition-desc') {
      list = [...list].sort((a, b) => (b.tuitionAnnualUsd || 0) - (a.tuitionAnnualUsd || 0));
    } else if (appliedSort === 'acceptance-desc') {
      list = [...list].sort((a, b) => (b.acceptanceRate || 0) - (a.acceptanceRate || 0));
    } else if (appliedSort === 'name-asc') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [universities, searchQuery, appliedCountry, appliedSubject, appliedBudget, appliedIelts, appliedSort, onlyFollowed, followedUniIds]);

  // Extract unique countries
  const countries = useMemo(() => {
    const all = universities.map((u) => u.country).filter(Boolean);
    return [...new Set(all)].sort();
  }, [universities]);

  const handleApplyFilters = ({ country, subject, budget, ielts, sort }) => {
    setAppliedCountry(country);
    setAppliedSubject(subject);
    setAppliedBudget(budget);
    setAppliedIelts(ielts);
    setAppliedSort(sort);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setAppliedCountry('All');
    setAppliedSubject('All');
    setAppliedBudget('All');
    setAppliedIelts('All');
    setAppliedSort('ranking');
  };

  const handleOpenDetails = async (uni) => {
    setActiveModalUni(uni);
    try {
      if (uni.id && !uni.id.startsWith('uni-')) {
        const res = await api.get(`/universities/${uni.id}`);
        if (res.data?.success) {
          setActiveModalUni(res.data.data);
        }
      }
    } catch (e) {
      // Keep rich modal data
    }
  };

  const hasActiveFilters =
    appliedCountry !== 'All' ||
    appliedSubject !== 'All' ||
    appliedBudget !== 'All' ||
    appliedIelts !== 'All' ||
    appliedSort !== 'ranking' ||
    searchQuery;

  return (
    <section className="space-y-6 animate-fade-in">
      {/* Top Banner with Search Bar */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
                StudyBridge
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                <Sparkles className="h-3 w-3" /> Global Directory
              </span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
              Universities
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Browse world-class universities across 15+ countries, compare annual tuition & estimated living budgets, explore detailed degree curricula, and discover tailored scholarships.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-2xl px-3.5 py-2">
            <Building2 className="h-4 w-4 text-brand" />
            <span>{displayedUniversities.length} Institutions Found</span>
          </div>
        </div>

        {/* Real-time Search Box */}
        <div className="mt-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search universities by name, city, country, or study program..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-12 pr-10 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:border-brand focus:bg-white focus:outline-none transition shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Top Filter Bar with Apply Button (Directly below search bar) */}
      <UniversityFilterBar
        countries={countries}
        subjects={availableSubjects}
        appliedCountry={appliedCountry}
        appliedSubject={appliedSubject}
        appliedBudget={appliedBudget}
        appliedIelts={appliedIelts}
        appliedSort={appliedSort}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      {/* Results Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold text-slate-500">
            Showing <strong className="text-slate-900 font-bold">{displayedUniversities.length}</strong> universities matching criteria
          </p>

          {followedUniIds.size > 0 && (
            <button
              type="button"
              onClick={() => setOnlyFollowed(!onlyFollowed)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition ${
                onlyFollowed
                  ? 'bg-accent text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{onlyFollowed ? '✓ Showing Followed' : 'Show Followed'}</span>
              <span className={`rounded-full px-1.5 py-0.2 text-[10px] ${onlyFollowed ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'}`}>
                {followedUniIds.size}
              </span>
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" /> Clear all filters
          </button>
        )}
      </div>

      {/* Expansive University Cards Grid */}
      {displayedUniversities.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 shadow-sm space-y-4">
          <p className="text-base font-semibold text-slate-700">No universities match your selected criteria.</p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {onlyFollowed
              ? "You haven't followed any universities yet. Browse and follow universities to receive updates!"
              : 'Try adjusting your budget filter, changing the major/country, or clicking Reset Filters.'}
          </p>
          <Button variant="outline" onClick={handleResetFilters}>
            {onlyFollowed ? 'Show All Universities' : 'Reset All Filters'}
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedUniversities.map((university) => (
            <UniCard
              key={university.id || university.name}
              university={university}
              isFollowing={Boolean(university.id && followedUniIds.has(university.id))}
              match={estimateMatch(university.ranking, university.acceptanceRate)}
              onSelect={handleOpenDetails}
              onScholarshipClick={(uni) => {
                navigate(`/scholarships?search=${encodeURIComponent(uni.country)}`);
              }}
            />
          ))}
        </div>
      )}

      {/* Refined University Detail Modal */}
      {activeModalUni && (
        <UniversityDetailModal
          university={activeModalUni}
          isFollowing={Boolean(activeModalUni.id && followedUniIds.has(activeModalUni.id))}
          onClose={() => setActiveModalUni(null)}
          onScholarshipClick={(scholarship) => {
            navigate(`/scholarships?search=${encodeURIComponent(scholarship.name || scholarship.country)}`);
          }}
        />
      )}
    </section>
  );
};

export default UniversityPage;
