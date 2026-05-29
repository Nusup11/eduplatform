export const studentNav = [
  { to: '/', label: 'Главная', icon: 'ti-home', end: true },
  { to: '/courses', label: 'Курсы', icon: 'ti-books' },
  { to: '/test', label: 'Тест', icon: 'ti-clipboard-check' },
  { to: '/rating', label: 'Рейтинг', icon: 'ti-trophy' },
  { to: '/analytics', label: 'Аналитика', icon: 'ti-chart-bar' },
];

export const teacherNav = [
  { to: '/dashboard', label: 'Дашборд', icon: 'ti-home' },
  { to: '/students', label: 'Студенты', icon: 'ti-users' },
  { to: '/tests-manage', label: 'Тесты', icon: 'ti-clipboard-check' },
  { to: '/analytics', label: 'Аналитика', icon: 'ti-chart-bar' },
];

export function getHomePath(role) {
  return role === 'teacher' ? '/dashboard' : '/';
}
