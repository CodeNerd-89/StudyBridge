import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, GraduationCap, Sparkles, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import TypewriterHero from '../components/home/TypewriterHero';

const Home = () => {
  const featureCards = [
    { value: '4724+', label: 'Colleges', note: 'Verified institutions', icon: GraduationCap },
    { value: '651+', label: 'Courses', note: 'Various streams', icon: BookOpen },
    { value: '10741+', label: 'Students', note: 'Successfully guided', icon: Users },
  ];

  const highlightCards = [
    { title: 'University fit', desc: 'See where you stand before applying.', value: '84%' },
    { title: 'Scholarship match', desc: 'Filter by budget, country, and merit.', value: '12' },
    { title: 'Quiz readiness', desc: 'Prep with short AI-assisted checks.', value: '4' },
  ];

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-8 sm:px-6 lg:px-8">
      <TypewriterHero />

      <section className="grid gap-5 lg:grid-cols-3">
        {highlightCards.map((item) => (
          <Card key={item.title} className="rounded-[1.75rem] border-[#f2ddd3] bg-white p-6 shadow-[0_12px_36px_rgba(17,24,39,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e35f39]">{item.title}</p>
            <p className="mt-4 text-3xl font-black text-slate-900">{item.value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-500">{item.desc}</p>
            <Link to="/profile" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#e35f39]">
              See profile match <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featureCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.label} className="rounded-[1.75rem] border-[#f2ddd3] bg-white p-6 shadow-[0_12px_36px_rgba(17,24,39,0.05)]">
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fbe2d8] text-[#e35f39] shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="rounded-full bg-[#fff4ef] px-3 py-1 text-xs font-semibold text-[#e35f39]">StudyBridge</div>
              </div>
              <p className="mt-8 text-4xl font-black tracking-tight text-[#e35f39]">{item.value}</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{item.label}</p>
              <p className="mt-1 text-sm text-slate-500">{item.note}</p>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div className="space-y-5">
          <Badge className="border border-[#ffd6c7] bg-[#fff0e9] text-[#e35f39]" variant="default">
            Popular destinations
          </Badge>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Top Cities to <span className="text-[#e35f39]">Study</span>
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">Explore the places that matter most when you plan your next move.</p>
        </div>
        <Card className="rounded-[2rem] border-[#f2ddd3] bg-[#fffaf7] p-6 shadow-[0_12px_36px_rgba(17,24,39,0.05)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Live preview</p>
              <p className="mt-2 text-2xl font-black text-slate-900">Universities by location</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#e35f39] text-white shadow-soft">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              'Canada',
              'United Kingdom',
              'Germany',
              'Australia',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[#f0ded5] bg-white px-4 py-4 text-sm font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
};

export default Home;
