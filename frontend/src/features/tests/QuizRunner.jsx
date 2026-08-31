import { useEffect, useRef, useState } from 'react';
import { Clock3, ChevronLeft, ChevronRight, Send, AlertTriangle } from 'lucide-react';
import { useTimer, formatDuration } from './useTimer.js';

export default function QuizRunner({ quiz, onSubmit, submitting, error }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [confirming, setConfirming] = useState(false);
  const submittedRef = useRef(false);
  const timer = useTimer(quiz.durationSec, { autoStart: true });
  const current = quiz.questions[index];
  const answeredCount = Object.keys(answers).length;
  const lowTime = timer.remaining <= 60;

  async function finish() {
    if (submittedRef.current || submitting) return;
    submittedRef.current = true;
    timer.pause();
    setConfirming(false);
    try {
      await onSubmit({
        answers: quiz.questions.map((q) => ({ questionId: q.id, optionId: answers[q.id] || null })),
        durationSec: timer.elapsed,
      });
    } catch {
      submittedRef.current = false;
      timer.start();
    }
  }

  useEffect(() => {
    if (timer.remaining === 0) finish();
    // Intentionally keyed only to remaining; `finish` reads current answers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.remaining]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-outline bg-surface px-5 py-4 academic-shadow">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-primary">{quiz.topic} Mock Exam</h1>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium capitalize text-accent-teal">{quiz.difficulty}</span>
          </div>
          <p className="mt-1 text-sm text-text-muted">{answeredCount} of {quiz.questions.length} answered</p>
        </div>
        <div className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-lg font-semibold ${lowTime ? 'bg-red-50 text-red-600' : 'bg-surface-container-low text-primary'}`}>
          <Clock3 size={19} /> {formatDuration(timer.remaining)}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_270px]">
        <section className="rounded-2xl border border-outline bg-surface p-6 academic-shadow md:p-8">
          <div className="mb-5 flex items-center justify-between text-sm text-text-muted">
            <span>Question {index + 1} of {quiz.questions.length}</span>
            <span>{Math.round(((index + 1) / quiz.questions.length) * 100)}%</span>
          </div>
          <div className="mb-7 h-1.5 overflow-hidden rounded bg-surface-container-low">
            <div className="h-full rounded bg-accent transition-all" style={{ width: `${((index + 1) / quiz.questions.length) * 100}%` }} />
          </div>

          <h2 className="mb-6 text-xl font-semibold leading-relaxed text-primary">{current.prompt}</h2>
          <div className="space-y-3">
            {current.options.map((option) => {
              const selected = answers[current.id] === option.id;
              return (
                <button key={option.id} type="button" onClick={() => setAnswers((a) => ({ ...a, [current.id]: option.id }))}
                  className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${selected ? 'border-accent bg-secondary/60 ring-2 ring-secondary' : 'border-outline hover:border-accent hover:bg-surface-container-low'}`}>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm font-semibold uppercase ${selected ? 'border-accent bg-accent text-white' : 'border-outline text-text-muted'}`}>
                    {option.id}
                  </span>
                  <span className="text-text-main">{option.text}</span>
                </button>
              );
            })}
          </div>

          {error && <p className="mt-5 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

          <div className="mt-8 flex items-center justify-between">
            <button type="button" disabled={index === 0} onClick={() => setIndex((i) => i - 1)} className={secondaryBtn}>
              <ChevronLeft size={18} /> Previous
            </button>
            {index < quiz.questions.length - 1 ? (
              <button type="button" onClick={() => setIndex((i) => i + 1)} className={primaryBtn}>Next <ChevronRight size={18} /></button>
            ) : (
              <button type="button" onClick={() => { timer.pause(); setConfirming(true); }} className={primaryBtn}><Send size={17} /> Submit</button>
            )}
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-outline bg-surface p-5 academic-shadow">
          <h3 className="mb-4 font-semibold text-primary">Question overview</h3>
          <div className="grid grid-cols-5 gap-2 lg:grid-cols-4">
            {quiz.questions.map((q, i) => (
              <button key={q.id} type="button" onClick={() => setIndex(i)}
                className={`h-10 rounded-lg text-sm font-medium transition ${i === index ? 'bg-accent text-white' : answers[q.id] ? 'bg-secondary text-accent-teal' : 'bg-surface-container-low text-text-muted hover:bg-surface-container'}`}>
                {i + 1}
              </button>
            ))}
          </div>
          <div className="mt-5 space-y-2 text-xs text-text-muted">
            <Legend cls="bg-accent" text="Current" /><Legend cls="bg-secondary" text="Answered" /><Legend cls="bg-surface-container-low" text="Not answered" />
          </div>
          <button type="button" onClick={() => { timer.pause(); setConfirming(true); }} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-primary px-3 py-2.5 text-sm font-medium text-primary hover:bg-secondary">
            <Send size={16} /> Finish exam
          </button>
        </aside>
      </div>

      {confirming && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-primary/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl">
            <div className="mb-3 flex items-center gap-3"><AlertTriangle className="text-amber-500" /><h3 className="text-lg font-semibold">Submit your answers?</h3></div>
            <p className="text-sm text-text-muted">You answered {answeredCount} of {quiz.questions.length} questions. Your result will be calculated immediately.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" disabled={submitting} onClick={() => { setConfirming(false); timer.start(); }} className="rounded-lg px-4 py-2 text-sm font-medium text-text-muted hover:bg-surface-container-low">Keep working</button>
              <button type="button" disabled={submitting} onClick={finish} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60">{submitting ? 'Submitting…' : 'Submit exam'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Legend({ cls, text }) { return <div className="flex items-center gap-2"><span className={`h-3 w-3 rounded ${cls}`} />{text}</div>; }
const primaryBtn = 'flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-dark';
const secondaryBtn = 'flex items-center gap-1.5 rounded-lg border border-outline px-4 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-container-low disabled:opacity-40';
