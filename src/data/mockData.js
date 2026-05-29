/** @typedef {'active' | 'done'} CourseStatus */

/**
 * @typedef {Object} Course
 * @property {string} id
 * @property {string} icon
 * @property {string} title
 * @property {string} teacher
 * @property {number} topics
 * @property {number} done
 * @property {number} pct
 * @property {string} color
 * @property {string} bg
 * @property {CourseStatus} status
 */

/**
 * @typedef {Object} Question
 * @property {string} q
 * @property {string[]} opts
 * @property {number} ans
 */

/**
 * @typedef {Object} Test
 * @property {number} id
 * @property {string} title
 * @property {string} badge
 * @property {string} color
 * @property {Question[]} questions
 */

export const currentUser = {
  name: 'Жумагулов Нусуп',
  initials: 'ЖН',
  rank: 2,
  points: 2340,
  testsCompleted: 24,
  averageScore: 78,
  totalStudents: 148,
  rankBadge: '🥈 Серебро',
};

export const weekActivity = {
  days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  values: [2, 5, 3, 7, 4, 1, 6],
};

/** @type {Course[]} */
export const courses = [
  {
    id: '1',
    icon: '🧠',
    title: 'Теория принятия решений',
    teacher: 'Проф. Миркин Е.Л.',
    topics: 12,
    done: 7,
    pct: 65,
    color: 'var(--indigo)',
    bg: 'var(--indigo-lt)',
    brd: 'var(--indigo-md)',
    status: 'active',
  },
  {
    id: '2',
    icon: '💻',
    title: 'Операционные системы',
    teacher: 'Группа ИСИТ-1-22',
    topics: 10,
    done: 8,
    pct: 80,
    color: 'var(--teal)',
    bg: 'var(--teal-lt)',
    brd: 'var(--teal-md)',
    status: 'active',
  },
  {
    id: '3',
    icon: '🤖',
    title: 'Нейронные сети',
    teacher: 'MATLAB, Python, Sklearn',
    topics: 9,
    done: 4,
    pct: 45,
    color: '#1A4A7A',
    bg: '#E5EEF9',
    brd: '#A3C2E0',
    status: 'active',
  },
  {
    id: '4',
    icon: '🗄️',
    title: 'Базы данных / MongoDB',
    teacher: 'Самостоятельная работа',
    topics: 8,
    done: 8,
    pct: 100,
    color: '#3A6B1A',
    bg: '#EAF3DE',
    brd: '#9CC97A',
    status: 'done',
  },
  {
    id: '5',
    icon: '📊',
    title: 'Линейное программирование',
    teacher: 'Модульная работа №2',
    topics: 5,
    done: 5,
    pct: 100,
    color: 'var(--amber)',
    bg: 'var(--amber-lt)',
    brd: '#D4AA6A',
    status: 'done',
  },
];

/** @type {Test[]} */
export const tests = [
  {
    id: 0,
    title: 'Нейронные сети: сеть Кохонена',
    badge: 'Нейросети',
    color: 'badge-blue',
    questions: [
      {
        q: 'Что такое сеть Кохонена?',
        opts: [
          'Нейросеть с учителем',
          'Самоорганизующаяся карта (SOM)',
          'Рекуррентная сеть',
          'Свёрточная сеть',
        ],
        ans: 1,
      },
      {
        q: 'Какой алгоритм обучения использует SOM?',
        opts: [
          'Обратное распространение',
          'Конкурентное обучение',
          'Градиентный спуск',
          'Метод Хопфилда',
        ],
        ans: 1,
      },
      {
        q: 'Что означает "нейрон-победитель" (BMU)?',
        opts: [
          'Нейрон с наибольшим весом',
          'Нейрон, ближайший к входному вектору',
          'Нейрон с наименьшим весом',
          'Случайный нейрон',
        ],
        ans: 1,
      },
      {
        q: 'Для чего используются SOM-сети?',
        opts: [
          'Классификация с учителем',
          'Визуализация и кластеризация',
          'Регрессионный анализ',
          'Управление роботами',
        ],
        ans: 1,
      },
      {
        q: 'Как изменяется скорость обучения SOM?',
        opts: [
          'Остаётся постоянной',
          'Убывает со временем',
          'Возрастает',
          'Произвольно меняется',
        ],
        ans: 1,
      },
    ],
  },
  {
    id: 1,
    title: 'Операционные системы: Bash',
    badge: 'ОС',
    color: 'badge-teal',
    questions: [
      {
        q: 'Какая команда показывает текущую директорию?',
        opts: ['ls', 'pwd', 'cd', 'mkdir'],
        ans: 1,
      },
      {
        q: 'Как сделать файл исполняемым в bash?',
        opts: ['chmod +x file.sh', 'exec file.sh', 'run file.sh', 'bash -e file.sh'],
        ans: 0,
      },
      {
        q: 'Что делает команда grep?',
        opts: [
          'Копирует файлы',
          'Ищет текст по шаблону',
          'Удаляет строки',
          'Архивирует файлы',
        ],
        ans: 1,
      },
      {
        q: 'Как передать аргумент скрипту в bash?',
        opts: ['$ARG', '$1', 'arg[0]', '%1'],
        ans: 1,
      },
      {
        q: 'Как объявить переменную в bash?',
        opts: ['var x=5', 'x = 5', 'x=5', 'int x=5'],
        ans: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'Теория принятия решений: linprog',
    badge: 'ТПР',
    color: 'badge-purple',
    questions: [
      {
        q: 'Что решает функция linprog в MATLAB?',
        opts: [
          'ОДУ',
          'Задачи линейного программирования',
          'Матричные уравнения',
          'Нелинейную оптимизацию',
        ],
        ans: 1,
      },
      {
        q: 'Какой метод использует linprog по умолчанию?',
        opts: ['Симплекс', 'Внутренней точки', 'Ветвей и границ', 'Градиентный'],
        ans: 1,
      },
      {
        q: 'Каковы ограничения в задаче ЛП?',
        opts: [
          'Только равенства',
          'Только неравенства',
          'Равенства и неравенства',
          'Ограничений нет',
        ],
        ans: 2,
      },
      {
        q: 'Что означает "допустимое решение"?',
        opts: [
          'Максимум целевой функции',
          'Решение, удовлетворяющее всем ограничениям',
          'Любая точка области',
          'Минимум функции',
        ],
        ans: 1,
      },
      {
        q: 'Что такое целевая функция в задаче ЛП?',
        opts: [
          'Ограничение задачи',
          'Функция, которую минимизируют/максимизируют',
          'Вектор переменных',
          'Матрица коэффициентов',
        ],
        ans: 1,
      },
    ],
  },
];

export const leaderboard = [
  { name: 'Асанов Марат', avatar: 'АМ', score: '95%', pts: 2680, rank: 1 },
  { name: 'Жумагулов Нусуп', avatar: 'ЖН', score: '92%', pts: 2340, rank: 2, me: true },
  { name: 'Токтобекова Айгуль', avatar: 'ТА', score: '88%', pts: 2100, rank: 3 },
  { name: 'Исаков Данияр', avatar: 'ИД', score: '85%', pts: 1980, rank: 4 },
  { name: 'Байтемирова Зарина', avatar: 'БЗ', score: '82%', pts: 1870, rank: 5 },
  { name: 'Омуров Бекзат', avatar: 'ОБ', score: '80%', pts: 1760, rank: 6 },
  { name: 'Кадырова Малика', avatar: 'КМ', score: '78%', pts: 1650, rank: 7 },
  { name: 'Эргешов Нурлан', avatar: 'ЭН', score: '75%', pts: 1540, rank: 8 },
];

export const courseResults = [
  { label: 'Теория ПР', pct: 78, color: 'var(--indigo)' },
  { label: 'ОС/Bash', pct: 85, color: 'var(--teal)' },
  { label: 'Нейросети', pct: 71, color: '#1A4A7A' },
  { label: 'MongoDB', pct: 92, color: '#3A6B1A' },
];

export const weekProgress = [55, 60, 65, 62, 70, 75, 78];

export const analyticsStats = {
  bestResult: { value: '95%', sub: 'Нейронные сети, лаб. 4' },
  avgTime: { value: '12 мин' },
  testsThisMonth: { value: 11 },
  streak: { value: '🔥 8', sub: 'дней подряд' },
};

/** Генерация heatmap (28 дней) */
export function generateHeatmapData() {
  return Array.from({ length: 28 }, () => Math.floor(Math.random() * 5));
}
