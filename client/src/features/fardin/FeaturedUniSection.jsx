import Button from '../../components/ui/Button';
import UniCard from './UniCard';

const featuredUniversities = [
  { name: 'University of Toronto', country: 'Canada', ranking: 21, tuition: '$38k', match: 92 },
  { name: 'University of Manchester', country: 'UK', ranking: 34, tuition: '$29k', match: 88 },
  { name: 'TU Berlin', country: 'Germany', ranking: 49, tuition: '$12k', match: 81 },
];

const FeaturedUniSection = () => {
  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">Fardin</p>
          <h2 className="mt-2 text-3xl font-bold text-primary">Featured universities</h2>
        </div>
        <Button to="/universities" variant="outline">
          Browse all
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {featuredUniversities.map((university) => (
          <UniCard key={university.name} {...university} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedUniSection;