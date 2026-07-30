import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const ScoreMatchCard = ({ score = 84, title = 'Profile match', note = 'Strong fit for shortlist' }) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge variant="accent">Eligibility</Badge>
          <h3 className="mt-3 text-xl font-semibold text-primary">{title}</h3>
          <p className="mt-2 text-sm text-slate-600">{note}</p>
        </div>
        <div className="rounded-2xl bg-brand/10 px-4 py-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">Match</p>
          <p className="text-3xl font-extrabold text-brand">{score}%</p>
        </div>
      </div>
      <div className="mt-5 h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-gradient-to-r from-brand to-accent" style={{ width: `${score}%` }} />
      </div>
    </Card>
  );
};

export default ScoreMatchCard;