/** @param {string} name */
export function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (parts[0] || '??').slice(0, 2).toUpperCase();
}

/** Преобразование пользователя API → формат UI */
export function mapApiUser(apiUser) {
  return {
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    role: apiUser.role,
    initials: getInitials(apiUser.name),
    points: apiUser.xp ?? 0,
    xp: apiUser.xp ?? 0,
    rank: 0,
    testsCompleted: 0,
    averageScore: 78,
    totalStudents: 148,
    rankBadge: '',
    achievements: apiUser.achievements ?? [],
    completedCourses: apiUser.completedCourses ?? [],
  };
}

export const guestUser = {
  id: null,
  name: 'Гость',
  email: '',
  initials: '?',
  points: 0,
  rank: 0,
  testsCompleted: 0,
  averageScore: 0,
  totalStudents: 0,
  rankBadge: '',
};
