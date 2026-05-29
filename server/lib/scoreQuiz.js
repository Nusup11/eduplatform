export function scoreQuiz(questions, answers) {
  let score = 0;
  let maxScore = 0;
  const mistakes = [];

  for (const q of questions) {
    maxScore += q.points ?? 10;
    const userAnswers = [...(answers[q.id] ?? answers[q._id?.toString()] ?? [])].sort();
    const correct = [...(q.correctAnswers ?? [])].sort();
    const ok =
      userAnswers.length === correct.length &&
      userAnswers.every((a, i) => a === correct[i]);
    if (ok) score += q.points ?? 10;
    else mistakes.push(q.id ?? q._id?.toString());
  }

  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  return { score, maxScore, percent, mistakes };
}
