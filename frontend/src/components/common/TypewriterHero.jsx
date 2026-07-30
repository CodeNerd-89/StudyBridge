import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const words = ['College', 'University', 'Scholarship', 'Exam', 'Country'];

const TypewriterHero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const activeWord = words[wordIndex % words.length];
    const typingSpeed = isDeleting ? 55 : 95;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && displayText === activeWord) {
        window.setTimeout(() => setIsDeleting(true), 1000);
        return;
      }

      if (isDeleting && displayText === '') {
        window.setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((current) => (current + 1) % words.length);
        }, 1000);
        return;
      }

      setDisplayText((current) => {
        const nextValue = isDeleting ? activeWord.slice(0, current.length - 1) : activeWord.slice(0, current.length + 1);
        return nextValue;
      });
    }, typingSpeed);

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <header className="relative pt-24 pb-32">
      <div className="mx-auto max-w-[1200px] px-8 text-center relative z-10">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
          <span className="material-symbols-outlined text-sm">star</span>
          Your future starts here
        </div>

        {/* Headline with typewriter */}
        <h1 className="mx-auto mb-8 max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight text-primary md:text-6xl">
          Find Your Perfect
          <br />
          <span className="text-accent">
            {displayText}
            <span className="ml-1 animate-pulse">|</span>
          </span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-text-muted">
          Navigate your academic journey with confidence. Discover world-class institutions,
          specialized courses, and expert mentorship tailored to your ambitions.
        </p>

        {/* Search Bar */}
        <div className="academic-shadow mx-auto mb-20 flex max-w-3xl flex-col items-center gap-2 rounded-2xl border border-outline bg-white p-1.5 md:flex-row">
          <div className="flex w-full flex-1 items-center gap-3 px-4">
            <Search className="h-5 w-5 text-text-muted" />
            <input
              type="text"
              className="w-full border-none bg-transparent py-4 text-base placeholder:text-text-muted focus:outline-none focus:ring-0"
              placeholder="Search colleges, courses, or entrance exams..."
            />
          </div>
          <div className="hidden h-8 w-px bg-outline md:block" />
          <Link
            to="/universities"
            className="w-full whitespace-nowrap rounded-xl bg-primary px-10 py-4 font-bold text-white transition-all hover:bg-opacity-90 md:w-auto"
          >
            Start Exploring
          </Link>
        </div>

        {/* Stats */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3">
          {[
            { value: '4,700+', label: 'Colleges' },
            { value: '650+', label: 'Courses' },
            { value: '10k+', label: 'Students Guided' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="academic-shadow-hover rounded-2xl border border-outline bg-white p-8 transition-all"
            >
              <div className="mb-2 text-4xl font-extrabold text-primary">{stat.value}</div>
              <div className="text-sm font-semibold uppercase tracking-widest text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default TypewriterHero;