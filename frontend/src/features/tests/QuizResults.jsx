import { CheckCircle2, XCircle, MinusCircle, Trophy, RotateCcw, Clock3 } from 'lucide-react';
import { formatDuration } from './useTimer.js';

function grade(pct) {
  if (pct >= 90) return { label: 'Outstanding', color: 'text-emerald-600', ring: 'ring-emerald-500' };
  if (pct >= 75) return { label: 'Great job', color: 'text-accent-teal', ring: 'ring-accent' };
  if (pct >= 50) return { label: 'Keep practicing', color: 'text-amber-600', ring: 'ring-amber-500' };
  return { label: 'Needs review', color: 'text-red-600', ring: 'ring-red-500' };
}

export default function QuizResults({ result, onRetake }) {
  const g = grade(result.percentage);
  return (
    <div className="mx-auto max-w-4xl">
      <section className="mb-6 rounded-2xl border border-outline bg-surface p-8 text-center academic-shadow">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-secondary text-accent-teal"><Trophy size={30} /></div>
        <h1 className="text-2xl font-bold text-primary">{result.topic} — Results</h1>
        <p className={`mt-1 font-medium ${g.color}`}>{g.label}</p>

        <div className={`mx-auto mt-6 grid h-40 w-40 place-items-center rounded-full bg-surface ring-8 ${g.ring} ring-opacity-20`}>
          <div>
            <div className="text-4xl font-bold text-primary">{result.percentage}%</div>
            <div className="text-sm text-text-muted">{result.score}/{result.total} correct</div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat icon={<CheckCircle2 size={18} />} label="Correct" value={result.correctCount} cls="bg-emerald-50 text-emerald-700" />
          <Stat icon={<XCircle size={18} />} label="Wrong" value={result.wrongCount} cls="bg-red-50 text-red-700" />
          <Stat icon={<MinusCircle size={18} />} label="Skipped" value={result.skippedCount} cls="bg-surface-container-low text-text-muted" />
          <Stat icon={<Clock3 size={18} />} label="Time" value={formatDuration(result.durationSec)} cls="bg-secondary text-primary" />
        </div>

        <button type="button" onClick={onRetake} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-white hover:bg-brand-dark">
          <RotateCcw size={18} /> Take another exam
        </button>
      </section>

      <section className="rounded-2xl border border-outline bg-surface p-6 academic-shadow md:p-8">
        <h2 className="mb-5 text-lg font-semibold text-primary">Answer breakdown</h2>
        <ol className="space-y-4">
          {result.breakdown.map((item, i) => (
            <li key={item.questionId} className="rounded-xl border border-outline p-5">
              <div className="mb-3 flex items-start gap-3">
                <StatusIcon selected={item.selectedOptionId} correct={item.isCorrect} />
                <p className="font-medium text-primary"><span className="text-slate-400">{i + 1}.</span> {item.prompt}</p>
              </div>
              <div className="ml-8 space-y-2">
                {item.options.map((option) => {
                  const isCorrect = option.id === item.correctOptionId;
                  const isChosen = option.id === item.selectedOptionId;
                  let cls = 'border-outline text-text-muted';
                  if (isCorrect) cls = 'border-emerald-300 bg-emerald-50 text-emerald-800';
                  else if (isChosen) cls = 'border-red-300 bg-red-50 text-red-800';
                  return (
                    <div key={option.id} className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm ${cls}`}>
                      <span className="font-semibold uppercase">{option.id}</span>
                      <span>{option.text}</span>
                      {isCorrect && <span className="ml-auto text-xs font-medium">Correct answer</span>}
                      {isChosen && !isCorrect && <span className="ml-auto text-xs font-medium">Your answer</span>}
                    </div>
                  );
                })}
              </div>
              {item.explanation && (
                <p className="ml-8 mt-3 rounded-lg bg-surface-container-low px-3 py-2 text-sm text-text-muted"><span className="font-medium text-primary">Why: </span>{item.explanation}</p>
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function Stat({ icon, label, value, cls }) {
  return (
    <div className={`rounded-xl px-4 py-3 ${cls}`}>
      <div className="flex items-center justify-center gap-1.5">{icon}<span className="text-xl font-bold">{value}</span></div>
      <div className="mt-0.5 text-xs font-medium opacity-80">{label}</div>
    </div>
  );
}

function StatusIcon({ selected, correct }) {
  if (!selected) return <MinusCircle className="mt-0.5 shrink-0 text-slate-400" size={20} />;
  return correct ? <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={20} /> : <XCircle className="mt-0.5 shrink-0 text-red-500" size={20} />;
}
