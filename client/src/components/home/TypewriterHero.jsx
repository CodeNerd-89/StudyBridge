import { useEffect, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

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
        window.setTimeout(() => setIsDeleting(true), 900);
        return;
      }

      if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
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
    <Card className="overflow-hidden border-[#f1ddd1] bg-[#fffaf7] px-6 py-10 shadow-[0_18px_60px_rgba(232,145,102,0.12)] sm:px-10 sm:py-14">
      <div className="relative mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#ffd8cc] bg-[#fff0ea] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#e35f39]">
          <Sparkles className="h-4 w-4" />
          StudyBridge
        </span>
        <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
          <span className="block text-slate-900">Find Your Perfect</span>
          <span className="mt-2 block text-[#e35f39]">
            {displayText}
            <span className="ml-1 animate-pulse">|</span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Discover top colleges, explore scholarships, and prepare for exams. Get personalized guidance for your academic journey.
        </p>

        <div className="mx-auto mt-10 flex max-w-2xl items-stretch rounded-full border border-[#f0ded5] bg-white p-1.5 shadow-[0_10px_35px_rgba(17,24,39,0.06)]">
          <div className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2.5 text-slate-400 sm:gap-3 sm:px-4">
            <Search className="h-5 w-5 shrink-0" />
            <span className="truncate text-xs font-medium text-slate-500 sm:text-sm">Search colleges, courses, exams...</span>
          </div>
          <Button to="/universities" className="flex shrink-0 items-center justify-center rounded-full bg-[#e35f39] px-5 py-2.5 text-sm font-semibold hover:bg-[#cf5330] sm:px-6">
            Search
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/universities" variant="primary" className="rounded-full bg-[#e35f39] px-6 py-3 hover:bg-[#cf5330]">
            Browse Colleges
          </Button>
          <Button to="/quiz" variant="secondary" className="rounded-full border border-[#ead7cf] bg-white px-6 py-3 text-slate-700 hover:bg-[#fff4ef]">
            Explore Courses
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TypewriterHero;