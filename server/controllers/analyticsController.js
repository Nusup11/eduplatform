import { findResultsByUser } from '../repositories/resultRepo.js';
import { findQuizById } from '../repositories/quizRepo.js';

export async function getMyAnalytics(req, res) {
  try {
    const results = await findResultsByUser(req.user.id);

    if (results.length === 0) {
      return res.json({
        averageScore: 0,
        passRate: 0,
        testsPassed: 0,
        totalTests: 0,
        mistakeCount: 0,
        chartData: [],
        recentResults: [],
      });
    }

    const percents = results.map((r) => r.percent ?? 0);
    const averageScore = Math.round(
      percents.reduce((a, b) => a + b, 0) / percents.length,
    );
    const passed = results.filter((r) => r.passed).length;
    const passRate = Math.round((passed / results.length) * 100);
    const mistakeCount = results.reduce(
      (sum, r) => sum + (r.mistakes?.length ?? 0),
      0,
    );

    const chartData = results
      .slice(0, 10)
      .reverse()
      .map((r, i) => ({
        date: new Date(r.completedAt).toLocaleDateString('ru-RU', {
          weekday: 'short',
        }),
        score: r.percent ?? 0,
        label: `Тест ${i + 1}`,
      }));

    const recentResults = await Promise.all(
      results.slice(0, 5).map(async (r) => {
        const quiz = await findQuizById(r.quizId?.toString?.() ?? r.quizId);
        return {
          id: r._id?.toString?.() ?? r._id,
          quizTitle: quiz?.title ?? 'Тест',
          score: r.score,
          maxScore: r.maxScore,
          percent: r.percent,
          passed: r.passed,
          completedAt: r.completedAt,
        };
      }),
    );

    res.json({
      averageScore,
      passRate,
      testsPassed: passed,
      totalTests: results.length,
      mistakeCount,
      coursesInProgress: 0,
      chartData,
      recentResults,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
