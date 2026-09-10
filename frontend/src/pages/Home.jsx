import { Link } from 'react-router-dom';
import TypewriterHero from '../components/common/TypewriterHero';

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero — TypewriterHero kept from original */}
      <TypewriterHero />

      {/* Top Universities */}
      <section className="bg-primary py-[120px] text-white">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-2xl">
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight">Top Universities</h2>
              <p className="text-lg text-white/70">Partnering with leading universities to shape the leaders of tomorrow.</p>
            </div>
            <Link
              to="/universities"
              className="academic-shadow whitespace-nowrap rounded-xl bg-accent px-10 py-4 font-bold text-white transition-all hover:bg-opacity-90"
            >
              Explore Universities
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { id: 'uni-1', name: 'Harvard University', initials: 'HU', location: 'Cambridge, MA', qsRanking: 1, img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop' },
              { id: 'uni-2', name: 'Massachusetts Institute of Technology', initials: 'MIT', location: 'Cambridge, MA', qsRanking: 2, img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop' },
              { id: 'uni-3', name: 'Stanford University', initials: 'SU', location: 'Stanford, CA', qsRanking: 3, img: 'https://smapse.com/storage/2026/06/converted/660_464_smapse-stanford-university-1.jpg?w=400&h=300&fit=crop' },
              { id: 'uni-4', name: 'University of Oxford', initials: 'UO', location: 'Oxford, UK', qsRanking: 4, img: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/University_College%2C_Oxford_-_Main_Quad.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original?w=400&h=300&fit=crop' },
            ].map((college) => (
              <div key={college.id} className="academic-shadow-hover group overflow-hidden rounded-3xl bg-white text-text-main transition-all duration-500">
                <div className="relative h-48 overflow-hidden">
                  <img
                    alt={`${college.name} Campus`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={college.img}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                </div>
                <div className="p-8">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary font-bold text-primary text-sm">{college.initials}</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-accent">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>emoji_events</span>
                      #{college.qsRanking}
                    </div>
                  </div>
                  <h5 className="mb-1 truncate text-lg font-extrabold text-primary">{college.name}</h5>
                  <p className="mb-6 text-xs font-semibold text-text-muted">{college.location}</p>
                  <Link
                    to={`/universities?search=${encodeURIComponent(college.name)}`}
                    state={{ universityId: college.id, search: college.name }}
                    className="block w-full rounded-xl border-2 border-outline py-3 text-center text-sm font-bold text-primary transition-all hover:border-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Countries */}
      <section className="bg-background py-[120px]">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-primary">Top Countries to Study</h2>
            <p className="mx-auto max-w-xl text-text-muted">Explore world-class universities across the most popular study destinations.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {[
              { country: 'USA', flag: '🇺🇸' },
              { country: 'UK', flag: '🇬🇧' },
              { country: 'Canada', flag: '🇨🇦' },
              { country: 'Australia', flag: '🇦🇺' },
              { country: 'Germany', flag: '🇩🇪' },
              { country: 'Singapore', flag: '🇸🇬' },
            ].map((item) => (
              <Link
                key={item.country}
                to={`/universities?country=${encodeURIComponent(item.country)}`}
                className="academic-shadow-hover group rounded-2xl border border-outline bg-white p-6 text-center transition-all hover:shadow-lg hover:shadow-on-surface/5"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-2xl transition-all group-hover:bg-primary group-hover:scale-110">
                  {item.flag}
                </div>
                <h6 className="font-bold text-primary">{item.country}</h6>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
