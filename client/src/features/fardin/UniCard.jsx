import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const UniCard = ({ name, country, ranking, tuition, match }) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge variant="brand">{country}</Badge>
          <h3 className="mt-3 text-xl font-semibold text-primary">{name}</h3>
          <p className="mt-2 text-sm text-slate-600">QS #{ranking} • Tuition {tuition}</p>
        </div>
        <div className="rounded-2xl bg-accent/10 px-4 py-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Match</p>
          <p className="text-3xl font-extrabold text-accent">{match}%</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button to="/profile" variant="outline">
          Save shortlist
        </Button>
        <Button to="/scholarships" variant="secondary">
          View scholarships
        </Button>
      </div>
    </Card>
  );
};

export default UniCard;