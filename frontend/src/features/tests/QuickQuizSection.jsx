import { useMemo, useState } from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Timer from './Timer';

const question = {
  prompt: 'Which factor matters most when picking a university?',
  options: ['Ranking only', 'Budget and fit', 'Random choice'],
  answer: 'Budget and fit',
};

const QuickQuizSection = () => {
  const [choice, setChoice] = useState('');
  const isCorrect = useMemo(() => choice === question.answer, [choice]);

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">Hasan</p>
          <h2 className="mt-2 text-3xl font-bold text-primary">Quick exam</h2>
        </div>
        <Button to="/exam" variant="outline">
          Open full exam
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Timer />
        <Card className="p-6">
          <Badge variant="accent">1 question</Badge>
          <h3 className="mt-3 text-xl font-semibold text-primary">{question.prompt}</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {question.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setChoice(option)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  choice === option
                    ? 'border-brand bg-brand text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-brand hover:text-brand'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="mt-5 text-sm font-medium text-slate-600">
            {choice ? (isCorrect ? 'Correct. Good strategic thinking.' : 'Try again. Balance matters.') : 'Pick an answer to see feedback.'}
          </p>
        </Card>
      </div>
    </section>
  );
};

export default QuickQuizSection;