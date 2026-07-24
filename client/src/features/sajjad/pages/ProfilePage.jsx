import ScoreMatchCard from '../ScoreMatchCard';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { CircleUserRound } from 'lucide-react';

const ProfilePage = () => {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-4">
        <Badge variant="brand">Sajjad</Badge>
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand text-white shadow-soft">
            <CircleUserRound className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary">Profile</h1>
            <p className="mt-1 text-slate-500">Logged-in personal dashboard</p>
          </div>
        </div>
        <p className="max-w-xl text-slate-600">Saved progress, eligibility, and personalized guidance live here.</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Shortlisted', value: '12' },
            { label: 'Saved', value: '8' },
            { label: 'Ready', value: '84%' },
          ].map((item) => (
            <Card key={item.label} className="p-5">
              <Badge>{item.label}</Badge>
              <p className="mt-3 text-3xl font-bold text-primary">{item.value}</p>
            </Card>
          ))}
        </div>
      </div>
      <ScoreMatchCard />
    </section>
  );
};

export default ProfilePage;
