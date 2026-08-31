import { useState } from 'react';
import QuizSetup from '../../features/tests/QuizSetup.jsx';
import QuizRunner from '../../features/tests/QuizRunner.jsx';
import QuizResults from '../../features/tests/QuizResults.jsx';
import { quizApi } from '../../services/api.js';

const STAGE = { SETUP: 'setup', RUNNING: 'running', RESULTS: 'results' };

export default function QuizPage() {
  const [stage, setStage] = useState(STAGE.SETUP);
  const [quiz, setQuiz] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleStart(config) {
    setLoading(true); setError('');
    try {
      const generated = await quizApi.generate(config);
      setQuiz(generated);
      setStage(STAGE.RUNNING);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not generate the exam. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(payload) {
    setSubmitting(true); setError('');
    try {
      const res = await quizApi.submit(quiz.id, {
        ...payload,
        submissionToken: quiz.submissionToken,
      });
      setResult(res);
      setStage(STAGE.RESULTS);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not submit the exam. Please try again.');
      throw err;
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setQuiz(null); setResult(null); setError(''); setStage(STAGE.SETUP);
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      {stage === STAGE.SETUP && <QuizSetup onStart={handleStart} loading={loading} error={error} />}
      {stage === STAGE.RUNNING && quiz && <QuizRunner quiz={quiz} onSubmit={handleSubmit} submitting={submitting} error={error} />}
      {stage === STAGE.RESULTS && result && <QuizResults result={result} onRetake={reset} />}
    </div>
  );
}
