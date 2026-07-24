import QuickQuizSection from '../QuickQuizSection';
import Timer from '../Timer';

const QuizPage = () => {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">Hasan</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-primary">Quiz</h1>
        <p className="mt-4 max-w-2xl text-slate-600">Practice under time pressure and get a quick signal on your readiness.</p>
      </div>
      <Timer initialSeconds={120} />
      <QuickQuizSection />
    </section>
  );
};

export default QuizPage;
