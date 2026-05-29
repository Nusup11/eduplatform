# EduPlatform — МУК

Обучающая платформа на **React + Vite** по макету `edu_platform_final.html`: академический стиль МУК, роли **студент** и **преподаватель**.

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:5173

## Демо-аккаунты

| Роль | Email | Пароль |
|------|-------|--------|
| Студент | `nusup@muk.edu.kg` | `Nusup123` |
| Преподаватель | `yust@muk.edu.kg` | `Teacher123` |

Остальные студенты группы ИСИТ-1-22: `*@muk.edu.kg` / `Muk2024!` (см. `src/data/seedUsers.js`).

На странице входа есть кнопка **Демо** для быстрого входа.

## Особенности макета

- Шрифты: Playfair Display, Source Serif 4, JetBrains Mono
- Тёмный header с золотой полосой, логотип «МУК — Академическая система»
- Кнопка **Выйти** в шапке + меню профиля
- Рейтинг — таблица всех студентов из localStorage
- 24 демо-студента + 3 преподавателя в `edu_u2` / `edu_s2`

## Маршруты

**Студент:** `/`, `/courses`, `/test`, `/rating`, `/analytics`, `/profile`  
**Преподаватель:** `/dashboard`, `/students`, `/tests-manage`, `/analytics`, `/profile`

## Сборка

```bash
npm run build
```
