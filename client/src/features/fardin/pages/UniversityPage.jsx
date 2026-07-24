import FilterSidebar from '../FilterSidebar';
import UniCard from '../UniCard';

const universityRows = [
  { name: 'University of Toronto', country: 'Canada', ranking: 21, tuition: '$38k', match: 92 },
  { name: 'University of Manchester', country: 'UK', ranking: 34, tuition: '$29k', match: 88 },
  { name: 'TU Berlin', country: 'Germany', ranking: 49, tuition: '$12k', match: 81 },
  { name: 'National University of Singapore', country: 'Singapore', ranking: 8, tuition: '$33k', match: 94 },
];

const UniversityPage = () => {
  return (
    <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <FilterSidebar />
      <div className="grid gap-4 md:grid-cols-2">
        {universityRows.map((university) => (
          <UniCard key={university.name} {...university} />
        ))}
      </div>
    </section>
  );
};

export default UniversityPage;
