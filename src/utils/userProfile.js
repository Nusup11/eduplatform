/** @param {import('../services/userStorage').normalizeUser extends Function} user */
export function mapStoredUser(user) {
  if (!user) return null;
  return {
    id: user.email,
    email: user.email,
    name: user.name,
    role: user.role,
    initials: user.initials,
    avatar: user.avatar,
    group: user.group,
    subject: user.subject,
    points: user.pts ?? 0,
    xp: user.pts ?? 0,
    testsCompleted: user.tests ?? 0,
    averageScore: user.avgScore ?? 0,
    rank: 0,
    totalStudents: 0,
    rankBadge: '',
  };
}

export const guestUser = {
  id: null,
  name: 'Гость',
  email: '',
  role: 'student',
  initials: '?',
  avatar: '?',
  points: 0,
  testsCompleted: 0,
  averageScore: 0,
};

export function isTeacher(user) {
  return user?.role === 'teacher';
}
