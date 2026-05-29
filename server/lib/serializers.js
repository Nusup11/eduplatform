export function sanitizeUser(user) {
  if (!user) return null;
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  return {
    id: obj._id?.toString() ?? obj.id,
    name: obj.name,
    email: obj.email,
    role: obj.role,
    xp: obj.xp ?? 0,
    achievements: obj.achievements ?? [],
    completedCourses: (obj.completedCourses ?? []).map((c) => c.toString?.() ?? String(c)),
  };
}

export function serializeLesson(l, i) {
  return {
    id: l._id?.toString() ?? l.id ?? `l${i}`,
    title: l.title,
    content: l.content,
    videoUrl: l.videoUrl,
    order: l.order ?? i + 1,
  };
}

export function serializeCourse(c) {
  const obj = c.toObject ? c.toObject() : c;
  return {
    id: obj._id?.toString() ?? obj.id,
    title: obj.title,
    description: obj.description,
    category: obj.category,
    authorId: obj.author?.toString?.() ?? obj.author ?? '',
    lessons: (obj.lessons ?? []).map(serializeLesson),
  };
}

export function serializeQuestion(q, i, includeAnswers = false) {
  const id = q._id?.toString() ?? q.id ?? `q${i}`;
  const base = {
    id,
    type: q.type,
    text: q.text,
    options: q.options,
    points: q.points ?? 10,
  };
  if (includeAnswers) base.correctAnswers = q.correctAnswers ?? [];
  return base;
}

export function serializeQuiz(quiz, includeAnswers = false) {
  const obj = quiz.toObject ? quiz.toObject() : quiz;
  return {
    id: obj._id?.toString() ?? obj.id,
    courseId: obj.courseId?.toString?.() ?? obj.courseId,
    title: obj.title,
    timer: obj.timer,
    passingScore: obj.passingScore ?? 70,
    questions: (obj.questions ?? []).map((q, i) =>
      serializeQuestion(q, i, includeAnswers),
    ),
  };
}
