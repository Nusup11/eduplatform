import bcrypt from 'bcryptjs';
import { isMongo } from '../lib/dbState.js';
import { memory, memId } from '../lib/memory.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Quiz from '../models/Quiz.js';

const DEMO_PASSWORD = 'password123';

export async function runSeed() {
  if (isMongo()) {
    const userCount = await User.countDocuments();
    if (userCount > 0) return;
    await seedMongo();
  } else {
    if (memory.courses.length > 0) return;
    seedMemory();
  }
  console.log('Database seeded with demo data');
}

async function seedMongo() {
  const hash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const admin = await User.create({
    name: 'Администратор',
    email: 'admin@teach.local',
    password: hash,
    role: 'admin',
    xp: 500,
    achievements: ['first-course'],
  });
  await User.create({
    name: 'Преподаватель',
    email: 'teacher@teach.local',
    password: hash,
    role: 'teacher',
    xp: 1200,
    achievements: [],
  });
  await User.create({
    name: 'Анна Иванова',
    email: 'anna@teach.local',
    password: hash,
    role: 'student',
    xp: 2450,
    achievements: ['first-course', 'marathon'],
  });
  await User.create({
    name: 'Пётр Сидоров',
    email: 'petr@teach.local',
    password: hash,
    role: 'student',
    xp: 1980,
    achievements: ['first-course'],
  });

  const course1 = await Course.create({
    title: 'Основы JavaScript',
    description: 'Изучите переменные, функции, массивы и асинхронность.',
    category: 'Программирование',
    author: admin._id,
    lessons: [
      { title: 'Введение', content: 'Что такое JS и где он используется.', order: 1 },
      { title: 'Переменные', content: 'let, const и область видимости.', order: 2 },
    ],
  });
  const course2 = await Course.create({
    title: 'React для начинающих',
    description: 'Компоненты, хуки и управление состоянием.',
    category: 'Программирование',
    author: admin._id,
    lessons: [
      { title: 'JSX', content: 'Синтаксис JSX и рендеринг.', order: 1 },
    ],
  });

  await Quiz.create({
    courseId: course1._id,
    title: 'Тест: Основы JavaScript',
    timer: 300,
    passingScore: 70,
    questions: [
      {
        type: 'single',
        text: 'Какой оператор объявляет константу?',
        options: ['var', 'let', 'const', 'static'],
        correctAnswers: ['const'],
        points: 10,
      },
      {
        type: 'multiple',
        text: 'Выберите примитивные типы в JavaScript:',
        options: ['string', 'array', 'number', 'object'],
        correctAnswers: ['string', 'number'],
        points: 20,
      },
    ],
  });
  await Quiz.create({
    courseId: course2._id,
    title: 'Тест: React основы',
    timer: 240,
    passingScore: 60,
    questions: [
      {
        type: 'single',
        text: 'Что такое JSX?',
        options: ['База данных', 'Расширение синтаксиса JS', 'CSS-фреймворк'],
        correctAnswers: ['Расширение синтаксиса JS'],
        points: 15,
      },
    ],
  });
}

async function seedMemory() {
  const hash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const adminId = memId();
  const teacherId = memId();
  memory.users = [
    {
      _id: adminId,
      name: 'Администратор',
      email: 'admin@teach.local',
      password: hash,
      role: 'admin',
      xp: 500,
      achievements: ['first-course'],
      completedCourses: [],
    },
    {
      _id: teacherId,
      name: 'Преподаватель',
      email: 'teacher@teach.local',
      password: hash,
      role: 'teacher',
      xp: 1200,
      achievements: [],
      completedCourses: [],
    },
    {
      _id: memId(),
      name: 'Анна Иванова',
      email: 'anna@teach.local',
      password: hash,
      role: 'student',
      xp: 2450,
      achievements: ['first-course', 'marathon'],
      completedCourses: [],
    },
    {
      _id: memId(),
      name: 'Пётр Сидоров',
      email: 'petr@teach.local',
      password: hash,
      role: 'student',
      xp: 1980,
      achievements: ['first-course'],
      completedCourses: [],
    },
  ];

  const course1Id = memId();
  const course2Id = memId();
  const lesson1 = memId();
  const lesson2 = memId();
  const lesson3 = memId();

  memory.courses = [
    {
      _id: course1Id,
      title: 'Основы JavaScript',
      description: 'Изучите переменные, функции, массивы и асинхронность.',
      category: 'Программирование',
      author: adminId,
      lessons: [
        { _id: lesson1, title: 'Введение', content: 'Что такое JS и где он используется.', order: 1 },
        { _id: lesson2, title: 'Переменные', content: 'let, const и область видимости.', order: 2 },
      ],
    },
    {
      _id: course2Id,
      title: 'React для начинающих',
      description: 'Компоненты, хуки и управление состоянием.',
      category: 'Программирование',
      author: adminId,
      lessons: [
        { _id: lesson3, title: 'JSX', content: 'Синтаксис JSX и рендеринг.', order: 1 },
      ],
    },
  ];

  memory.quizzes = [
    {
      _id: memId(),
      courseId: course1Id,
      title: 'Тест: Основы JavaScript',
      timer: 300,
      passingScore: 70,
      questions: [
        {
          _id: memId(),
          type: 'single',
          text: 'Какой оператор объявляет константу?',
          options: ['var', 'let', 'const', 'static'],
          correctAnswers: ['const'],
          points: 10,
        },
        {
          _id: memId(),
          type: 'multiple',
          text: 'Выберите примитивные типы в JavaScript:',
          options: ['string', 'array', 'number', 'object'],
          correctAnswers: ['string', 'number'],
          points: 20,
        },
      ],
    },
    {
      _id: memId(),
      courseId: course2Id,
      title: 'Тест: React основы',
      timer: 240,
      passingScore: 60,
      questions: [
        {
          _id: memId(),
          type: 'single',
          text: 'Что такое JSX?',
          options: ['База данных', 'Расширение синтаксиса JS', 'CSS-фреймворк'],
          correctAnswers: ['Расширение синтаксиса JS'],
          points: 15,
        },
      ],
    },
  ];
}

export const DEMO_ACCOUNTS = {
  admin: 'admin@teach.local',
  teacher: 'teacher@teach.local',
  student: 'anna@teach.local',
  password: DEMO_PASSWORD,
};
