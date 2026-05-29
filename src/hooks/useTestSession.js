import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from './useAuth';
import { tests } from '../data/mockData';

export function useTestSession() {
  const { state, dispatch, applyTestResult } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const session = state.testSession;
  const test = session ? tests.find((t) => t.id === session.testId) : null;

  const startTest = useCallback(
    (testId) => {
      const t = tests.find((x) => x.id === testId);
      if (!t) return;
      dispatch({
        type: 'START_TEST',
        payload: { testId, timeLeft: t.questions.length * 120 },
      });
    },
    [dispatch],
  );

  const selectAnswer = useCallback(
    (index) => {
      if (!session || session.showFeedback) return;
      dispatch({ type: 'SELECT_ANSWER', payload: index });
      const q = test.questions[session.currentQuestion];
      dispatch({ type: 'RECORD_ANSWER', payload: index === q.ans ? 1 : 0 });
    },
    [dispatch, session, test],
  );

  const finishTest = useCallback(() => {
    if (!session || !test || !user?.email) return;
    const correct = session.answers.reduce((a, b) => a + b, 0);
    const percent = Math.round((correct / test.questions.length) * 100);
    let title;
    let sub;
    if (percent >= 90) {
      title = 'Отлично! 🏆';
      sub = `Правильно ${correct} из ${test.questions.length}. Вы получаете EduPoints!`;
    } else if (percent >= 70) {
      title = 'Хороший результат 👍';
      sub = `Правильно ${correct} из ${test.questions.length}. EduPoints начислены`;
    } else if (percent >= 50) {
      title = 'Неплохо 📚';
      sub = `Правильно ${correct} из ${test.questions.length}. EduPoints начислены`;
    } else {
      title = 'Нужно повторить 🔁';
      sub = `Правильно ${correct} из ${test.questions.length}. Попробуйте ещё раз!`;
    }
    const updated = applyTestResult(user.email, percent, {
      testId: test.id,
      percent,
      correct,
      total: test.questions.length,
      title,
      sub,
    });
    return updated;
  }, [session, test, user, applyTestResult]);

  const nextQuestion = useCallback(() => {
    if (!session || !test) return;
    if (session.currentQuestion + 1 >= test.questions.length) {
      finishTest();
    } else {
      dispatch({ type: 'NEXT_QUESTION' });
    }
  }, [session, test, dispatch, finishTest]);

  const retryTest = useCallback(() => {
    if (state.lastTestResult) {
      dispatch({ type: 'RESET_TEST' });
      startTest(state.lastTestResult.testId);
    }
  }, [state.lastTestResult, dispatch, startTest]);

  const resetToSelect = useCallback(() => {
    dispatch({ type: 'RESET_TEST' });
  }, [dispatch]);

  useEffect(() => {
    if (!session || session.timeLeft <= 0) return;
    const id = setInterval(() => dispatch({ type: 'TICK_TIMER' }), 1000);
    return () => clearInterval(id);
  }, [session, dispatch]);

  useEffect(() => {
    if (session?.timeLeft === 0 && session.answers.length > 0) {
      finishTest();
    }
  }, [session?.timeLeft, session?.answers.length, finishTest]);

  return {
    session,
    test,
    lastResult: state.lastTestResult,
    startTest,
    selectAnswer,
    nextQuestion,
    finishTest,
    retryTest,
    resetToSelect,
    goToRating: () => navigate('/rating'),
  };
}
