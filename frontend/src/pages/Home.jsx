import { Link } from 'react-router-dom';
import TypewriterHero from '../components/common/TypewriterHero';

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero — TypewriterHero kept from original */}
      <TypewriterHero />

      {/* Personalised Guidance Section */}
      <section className="border-y border-outline/50 bg-secondary/30 py-[120px]">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            {/* Left Content */}
            <div className="flex-1 space-y-10">
              <div>
                <h2 className="mb-6 text-4xl font-extrabold leading-tight text-primary">
                  Expert Guidance for <br />Individual Dreams.
                </h2>
                <p className="text-lg leading-relaxed text-text-muted">
                  Academic success isn't one-size-fits-all. Our certified counsellors provide the strategic perspective you need to reach your full potential.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { icon: 'person_search', label: 'AI Mentors' },
                  { icon: 'payments', label: 'Zero-Cost Support' },
                  { icon: 'bolt', label: 'Rapid Response' },
                  { icon: 'support', label: '24/7 Support' },
                ].map((item) => (
                  <div key={item.label} className="group flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-outline bg-white text-primary transition-all group-hover:bg-primary group-hover:text-white">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <span className="font-bold text-primary">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Counseling Form */}
            <div className="w-full lg:w-[460px]">
              <div className="academic-shadow relative rounded-3xl border border-outline bg-white p-10">
                <h3 className="mb-8 text-2xl font-extrabold text-primary">Get Free Counseling</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-outline bg-background/50 p-3 text-sm focus:border-accent focus:ring-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Email Address</label>
                    <input
                      type="email"
                      placeholder="abc@gmail.com"
                      className="w-full rounded-xl border border-outline bg-background/50 p-3 text-sm focus:border-accent focus:ring-accent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Stream</label>
                      <select className="w-full rounded-xl border border-outline bg-background/50 p-3 text-sm focus:border-accent focus:ring-accent">
                        <option>Engineering</option>
                        <option>Medical</option>
                        <option>Design</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Level</label>
                      <select className="w-full rounded-xl border border-outline bg-background/50 p-3 text-sm focus:border-accent focus:ring-accent">
                        <option>Undergraduate</option>
                        <option>Postgraduate</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="academic-shadow mt-4 w-full rounded-xl bg-primary py-4 font-bold text-white transition-all hover:bg-opacity-90"
                  >
                    Book Free Session
                  </button>
                  <p className="text-center text-[10px] text-text-muted">
                    By clicking, you agree to our{' '}
                    <a href="#" className="underline">Terms</a> and{' '}
                    <a href="#" className="underline">Privacy Policy</a>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stream Explorer */}
      <section className="py-[120px]">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-primary">Explore Your Path</h2>
            <p className="mx-auto max-w-xl text-text-muted">Browse categorized resources for the most sought-after career streams.</p>
          </div>

          {/* Stream Tabs */}
          <div className="mb-16 flex flex-wrap justify-center gap-3">
            {['Engineering', 'Management', 'Medical', 'Design', 'Law'].map((stream, i) => (
              <button
                key={stream}
                className={`academic-shadow rounded-xl px-8 py-3 text-sm font-bold transition-all ${
                  i === 0
                    ? 'bg-primary text-white'
                    : 'border border-outline bg-white text-text-muted hover:border-primary hover:text-primary'
                }`}
              >
                {stream}
              </button>
            ))}
          </div>

          {/* Three Column Grid */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Colleges */}
            <div className="academic-shadow-hover rounded-3xl border border-outline bg-white p-8 transition-all">
              <div className="mb-8 flex items-center justify-between">
                <h4 className="flex items-center gap-2 text-xl font-extrabold text-primary">
                  <span className="material-symbols-outlined text-accent">apartment</span> Colleges
                </h4>
              </div>
              <div className="space-y-4">
                {['Alliance University', 'MIT Manipal', 'Bennett University'].map((name) => (
                  <Link
                    key={name}
                    to="/universities"
                    className="group flex items-center justify-between rounded-2xl p-4 transition-all hover:bg-background"
                  >
                    <span className="font-bold text-primary transition-transform group-hover:translate-x-1">{name}</span>
                    <span className="material-symbols-outlined text-text-muted">chevron_right</span>
                  </Link>
                ))}
              </div>
              <Link to="/universities" className="mt-10 block text-center text-sm font-extrabold text-accent hover:underline">
                View Directory
              </Link>
            </div>

            {/* Exams */}
            <div className="academic-shadow-hover rounded-3xl border border-outline bg-white p-8 transition-all">
              <div className="mb-8 flex items-center justify-between">
                <h4 className="flex items-center gap-2 text-xl font-extrabold text-primary">
                  <span className="material-symbols-outlined text-accent">assignment</span> Exams
                </h4>
              </div>
              <div className="space-y-4">
                {['JEE Main - 2024', 'GATE Aptitude Test', 'VITEEE Exam'].map((name) => (
                  <a
                    key={name}
                    href="#"
                    className="group flex items-center justify-between rounded-2xl p-4 transition-all hover:bg-background"
                  >
                    <span className="font-bold text-primary transition-transform group-hover:translate-x-1">{name}</span>
                    <span className="material-symbols-outlined text-text-muted">chevron_right</span>
                  </a>
                ))}
              </div>
              <a href="#" className="mt-10 block text-center text-sm font-extrabold text-accent hover:underline">
                All Deadlines
              </a>
            </div>

            {/* Courses */}
            <div className="academic-shadow-hover rounded-3xl border border-outline bg-white p-8 transition-all">
              <div className="mb-8 flex items-center justify-between">
                <h4 className="flex items-center gap-2 text-xl font-extrabold text-primary">
                  <span className="material-symbols-outlined text-accent">school</span> Courses
                </h4>
              </div>
              <div className="space-y-4">
                {['B.Tech Computer Science', 'B.Tech AI & Data Science', 'Mechanical Engineering'].map((name) => (
                  <a
                    key={name}
                    href="#"
                    className="group flex items-center justify-between rounded-2xl p-4 transition-all hover:bg-background"
                  >
                    <span className="font-bold text-primary transition-transform group-hover:translate-x-1">{name}</span>
                    <span className="material-symbols-outlined text-text-muted">chevron_right</span>
                  </a>
                ))}
              </div>
              <a href="#" className="mt-10 block text-center text-sm font-extrabold text-accent hover:underline">
                Course Finder
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Premier Colleges */}
      <section className="bg-primary py-[120px] text-white">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-2xl">
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight">Top Premier Institutions</h2>
              <p className="text-lg text-white/70">Partnering with leading universities to shape the leaders of tomorrow.</p>
            </div>
            <Link
              to="/universities"
              className="academic-shadow whitespace-nowrap rounded-xl bg-accent px-10 py-4 font-bold text-white transition-all hover:bg-opacity-90"
            >
              Explore Premier Colleges
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { letter: 'A', name: 'Amity University', location: 'Mumbai, MH', rating: '4.8', img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop' },
              { letter: 'B', name: 'Bennett University', location: 'Greater Noida, UP', rating: '4.5', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop' },
              { letter: 'C', name: 'Centurion University', location: 'Bhubaneswar, OD', rating: '4.2', img: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop' },
              { letter: 'G', name: 'GIET University', location: 'Gunupur, OD', rating: '4.9', img: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=400&h=300&fit=crop' },
            ].map((college) => (
              <div key={college.name} className="academic-shadow-hover group overflow-hidden rounded-3xl bg-white text-text-main transition-all duration-500">
                <div className="relative h-48 overflow-hidden">
                  <img
                    alt={`${college.name} Campus`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={college.img}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-extrabold text-white">PREMIER</div>
                </div>
                <div className="p-8">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary font-bold text-primary">{college.letter}</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-accent">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                      {college.rating}
                    </div>
                  </div>
                  <h5 className="mb-1 truncate text-lg font-extrabold text-primary">{college.name}</h5>
                  <p className="mb-6 text-xs font-semibold text-text-muted">{college.location}</p>
                  <button className="w-full rounded-xl border-2 border-outline py-3 text-sm font-bold text-primary transition-all hover:border-primary">
                    View Campus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Cities */}
      <section className="bg-background py-[120px]">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-primary">Top Cities to Study</h2>
            <p className="mx-auto max-w-xl text-text-muted">Discover the most vibrant educational hubs across the world.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {[
              { city: 'Pune', state: 'MAHARASHTRA' },
              { city: 'Mumbai', state: 'MAHARASHTRA' },
              { city: 'Gurgaon', state: 'HARYANA' },
              { city: 'Bhubaneswar', state: 'ODISHA' },
              { city: 'Noida', state: 'UTTAR PRADESH' },
              { city: 'Hyderabad', state: 'TELANGANA' },
            ].map((item) => (
              <div key={item.city} className="academic-shadow-hover group rounded-2xl border border-outline bg-white p-6 text-center transition-all">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary transition-all group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">location_city</span>
                </div>
                <h6 className="font-bold text-primary">{item.city}</h6>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{item.state}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline & Deadlines */}
      <section className="border-t border-outline bg-background py-[120px]">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-primary">Timeline &amp; Deadlines</h2>
            <p className="text-text-muted">Stay ahead with real-time updates on national and state entrance exams.</p>
          </div>

          <div className="academic-shadow mx-auto flex max-w-4xl flex-col overflow-hidden rounded-3xl border border-outline md:flex-row">
            {/* Date Side */}
            <div className="flex flex-col items-center justify-center bg-primary p-12 text-center text-white md:w-56">
              <span className="mb-2 text-sm font-bold uppercase tracking-[0.2em] opacity-70">FEBRUARY</span>
              <span className="mb-2 text-7xl font-black">06</span>
              <span className="text-sm font-bold opacity-70">2024</span>
              <div className="mt-8 rounded-full bg-accent px-4 py-1.5 text-[10px] font-bold">APPLICATIONS OPEN</div>
            </div>
            {/* Detail Side */}
            <div className="flex-1 p-12">
              <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                <span className="material-symbols-outlined text-sm">engineering</span> Graduate Studies
              </div>
              <h4 className="mb-8 text-3xl font-extrabold leading-snug text-primary">GRE MODEL TEST 04</h4>
              <div className="mb-10 grid grid-cols-2 gap-x-12 gap-y-6 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-text-muted">Closing Date</span>
                  <span className="font-bold text-primary">30 Sept, 2024</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-text-muted">Exam Level</span>
                  <span className="font-bold text-primary">National</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="rounded-xl bg-primary px-8 py-3 font-bold text-white transition-all hover:bg-opacity-90">Details</button>
                <button className="flex items-center gap-2 rounded-xl border-2 border-outline px-8 py-3 font-bold text-primary transition-all hover:border-primary">
                  <span className="material-symbols-outlined text-sm">notifications</span> Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
