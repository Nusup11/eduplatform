# EduPlatform — React

Обучающая платформа на **React + Vite**, по макету `edu_platform_teacher_student.html`: роли **студент** и **учитель**, отдельная навигация и страницы.

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:5173

### Backend (опционально)

```bash
cd server && npm install && node index.js
```

Фронтенд сейчас использует **localStorage** для пользователей и сессии; API в `server/` можно подключить позже.

## Демо-аккаунты

На странице входа выберите роль (вкладки **Студент** / **Учитель**), затем войдите:

| Роль | Email | Пароль |
|------|-------|--------|
| Студент | `nusup@muk.edu.kg` | `Nusup123` |
| Учитель | `mirkin@muk.edu.kg` | `Teacher123` |
| Учитель | `demo@teacher.edu` | `Teacher123` |

Регистрация: `/register` — имя, email, пароль, аватар; для студента — группа, для учителя — предмет.

## Маршруты

### Студент
| Путь | Страница |
|------|----------|
| `/` | Главная |
| `/courses` | Курсы |
| `/test` | Тесты |
| `/rating` | Рейтинг |
| `/analytics` | Аналитика |
| `/profile` | Профиль |

### Учитель
| Путь | Страница |
|------|----------|
| `/dashboard` | Дашборд |
| `/students` | Студенты |
| `/tests-manage` | Управление тестами |
| `/analytics` | Аналитика (вид учителя) |
| `/profile` | Профиль |

### Гость
| `/login` | Вход |
| `/register` | Регистрация |

Учитель при заходе на `/` перенаправляется на `/dashboard`; студент не видит страницы учителя.

## Структура

```
src/
├── components/       # layout, auth, ui, course, test, rating
├── pages/            # студентские страницы
│   └── teacher/      # дашборд, студенты, тесты, аналитика
├── config/navigation.js
├── context/AppContext.jsx
├── services/userStorage.js   # edu_users_v2, edu_session_v2
├── routes/AppRouter.jsx
└── data/mockData.js
```

## Стек

- React 18, React Router 6, Vite 5
- CSS Modules, Context API + useReducer
- Tabler Icons (CDN в `index.html`)

## Сборка

```bash
npm run build
npm run preview
```
