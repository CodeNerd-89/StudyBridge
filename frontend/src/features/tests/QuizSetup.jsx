import { useMemo, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

const EXAMS = {
  general: {
    label: 'General',
    sections: ['Mathematics', 'English', 'Science'],
  },
  IELTS: {
    label: 'IELTS',
    sections: ['Reading', 'Listening'],
  },
  GRE: {
    label: 'GRE',
    sections: ['Verbal Reasoning', 'Quantitative Reasoning'],
  },
  SAT: {
    label: 'SAT',
    sections: ['Reading and Writing', 'Math'],
  },
};

const DIFFICULTIES = ['easy', 'medium', 'hard'];

const maxQuestionsFor = (examType, topic) => {
  if (examType === 'IELTS') return 10;
  if (examType === 'GRE' && topic === 'Verbal Reasoning') return 10;
  if (examType === 'SAT' && topic === 'Reading and Writing') return 10;
  return 30;
};

export default function QuizSetup({ onStart, loading, error }) {
  const [form, setForm] = useState({
    examType: 'general', topic: 'Mathematics', difficulty: 'medium', count: 10, durationMin: 10,
  });

  const sections = useMemo(() => EXAMS[form.examType].sections, [form.examType]);
  const maxQuestions = useMemo(() => maxQuestionsFor(form.examType, form.topic), [form.examType, form.topic]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setExam = (e) => {
    const examType = e.target.value;
    const topic = EXAMS[examType].sections[0];
    setForm((f) => ({ ...f, examType, topic, count: Math.min(Number(f.count) || 10, maxQuestionsFor(examType, topic)) }));
  };

  const submit = (e) => {
    e.preventDefault();
    onStart({
      topic: form.topic,
      examType: form.examType,
      difficulty: form.difficulty,
      count: Number(form.count),
      durationSec: Number(form.durationMin) * 60,
    });
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-2xl border border-outline bg-surface p-8 academic-shadow">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-white">
            <Sparkles size={22} />
          </span>
          <div>
            <h1 className="text-xl font-semibold text-primary">Generate a Mock Exam</h1>
            <p className="text-sm text-text-muted">Generated questions tailored to your exam and section.</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Exam">
              <select value={form.examType} onChange={setExam} className={selectCls}>
                {Object.entries(EXAMS).map(([value, exam]) => <option key={value} value={value}>{exam.label}</option>)}
              </select>
            </Field>
            <Field label="Subject / Section">
              <select value={form.topic} onChange={(e) => {
                const topic = e.target.value;
                setForm((f) => ({ ...f, topic, count: Math.min(Number(f.count) || 10, maxQuestionsFor(f.examType, topic)) }));
              }} className={selectCls}>
                {sections.map((section) => <option key={section} value={section}>{section}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Difficulty">
            <select value={form.difficulty} onChange={set('difficulty')} className={selectCls}>
              {DIFFICULTIES.map((t) => <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>)}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Questions">
              <input type="number" min={3} max={maxQuestions} value={form.count} onChange={set('count')} className={selectCls} />
            </Field>
            <Field label="Time limit (min)">
              <input type="number" min={1} max={120} value={form.durationMin} onChange={set('durationMin')} className={selectCls} />
            </Field>
          </div>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-medium text-white transition hover:bg-brand-dark disabled:opacity-60">
            {loading ? <><Loader2 className="animate-spin" size={18} /> Generating…</> : <>Start Mock Exam</>}
          </button>
        </form>
      </div>
    </div>
  );
}

const selectCls = 'w-full rounded-lg border border-outline bg-white px-3 py-2 text-sm text-text-main focus:border-accent focus:outline-none focus:ring-2 focus:ring-secondary';

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-primary">{label}</span>
      {children}
    </label>
  );
}
