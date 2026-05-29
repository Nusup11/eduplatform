# EduPlatform — React

Обучающая платформа на **React + Vite**, переписанная с макета `edu_platform_app.html`.

## Структура проекта

```
src/
├── components/          # UI-компоненты
│   ├── layout/        # Header, AppLayout
│   ├── ui/            # StatCard, Button, Card, BarChart…
│   ├── course/        # CourseCard, CourseListItem
│   ├── test/          # TestSelectList, QuestionView, TestResult
│   ├── rating/        # Leaderboard
│   └── analytics/     # CourseResultBars, Heatmap
├── pages/             # Страницы (роуты)
│   ├── HomePage.jsx
│   ├── CoursesPage.jsx
│   ├── TestPage.jsx
│   ├── RatingPage.jsx
│   └── AnalyticsPage.jsx
├── data/
│   └── mockData.js    # Курсы, тесты, рейтинг, аналитика
├── styles/
│   ├── variables.css  # CSS-переменные дизайна
│   └── global.css
├── context/
│   └── AppContext.jsx # State management (useReducer)
├── hooks/
│   └── useTestSession.js
├── routes/
│   └── AppRouter.jsx  # React Router
├── services/
│   └── api.js         # Заготовка REST API
├── App.jsx
└── main.jsx
```

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:5173

### Backend (опционально)

```bash
cd server && npm install && npm run dev
```

Прокси `/api` → `http://localhost:3001` настроен в `vite.config.js`.

## Авторизация

| Маршрут | Описание |
|---------|----------|
| `/login` | Вход (JWT) |
| `/register` | Регистрация студента |

**Демо:** `admin@teach.local` / `password123` (нужен запущенный `server/`)

Защищённые страницы: `/test`, `/analytics` — без входа перенаправление на `/login`.

Токен хранится в `localStorage`, при перезагрузке вызывается `GET /api/auth/me`.

## Функционал

| Раздел | Возможности |
|--------|-------------|
| **Главная** | Статистика, курсы в процессе, график активности |
| **Курсы** | Фильтры: все / активные / завершённые, прогресс |
| **Тест** | Выбор теста, таймер, ответы с подсветкой, результат, XP |
| **Рейтинг** | Таблица лидеров, блок текущего пользователя |
| **Аналитика** | Статистика, heatmap, прогресс по курсам и неделям |

## State management

`AppContext` + `useReducer`:

- пользователь и очки
- фильтр курсов
- сессия теста (вопрос, таймер, ответы)
- последний результат теста

Хук `useTestSession` инкапсулирует логику тестирования.

## Подключение backend

1. Замените импорты из `data/mockData.js` на вызовы `services/api.js`
2. Пример:

```javascript
import api from '../services/api';

// В CoursesPage
const data = await api.courses.list({ category: filter });
```

3. После логина сохраняйте JWT: `localStorage.setItem('token', token)`

Готовый Express API в папке `server/` (из предыдущей версии проекта).

## Стек

- React 18
- React Router 6
- Vite 5
- CSS Modules
- Context API + Hooks

## Сборка

```bash
npm run build
npm run preview
```
