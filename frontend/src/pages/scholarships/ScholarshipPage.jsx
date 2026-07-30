import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const scholarships = [
  { name: 'Global Merit Award', amount: '$10k', level: 'Need blind', note: 'For strong academic results and leadership' },
  { name: 'STEM Pathway Grant', amount: '$18k', level: 'Partial', note: 'Targets engineering and computer science' },
  { name: 'International Futures Fund', amount: '$25k', level: 'Full', note: 'Merit-based support for top applicants' },
];

const ScholarshipPage = () => {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">Fardin</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-primary">Scholarships</h1>
        <p className="mt-4 max-w-2xl text-slate-600">Funding options tailored to your target countries, scores, and program focus.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {scholarships.map((scholarship) => (
          <Card key={scholarship.name} className="p-6">
            <Badge variant="accent">{scholarship.level}</Badge>
            <h2 className="mt-3 text-xl font-semibold text-primary">{scholarship.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{scholarship.note}</p>
            <p className="mt-5 text-3xl font-bold text-brand">{scholarship.amount}</p>
            <Button className="mt-5" variant="outline">
              Check fit
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ScholarshipPage;
