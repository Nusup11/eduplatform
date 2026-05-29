import { SEED_STUDENTS, SEED_TEACHERS } from '../data/seedUsers.js';

const USERS_KEY = 'edu_u2';
const SESSION_KEY = 'edu_s2';

function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (parts[0] || '??').slice(0, 2).toUpperCase();
}

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

export function setSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function migrateLegacyStorage() {
  try {
    const legacyUsers = localStorage.getItem('edu_users_v2');
    const currentUsers = localStorage.getItem(USERS_KEY);
    if (legacyUsers && (!currentUsers || currentUsers === '[]')) {
      localStorage.setItem(USERS_KEY, legacyUsers);
    }
    const legacySession = localStorage.getItem('edu_session_v2');
    if (legacySession && !localStorage.getItem(SESSION_KEY)) {
      localStorage.setItem(SESSION_KEY, legacySession);
    }
  } catch {
    /* ignore */
  }
}

export function seedUsers() {
  migrateLegacyStorage();
  const users = getUsers();
  let changed = false;

  for (const s of SEED_STUDENTS) {
    if (!users.find((u) => u.email === s.email)) {
      users.push({
        ...s,
        role: 'student',
        group: s.group || '',
        subject: '',
        initials: getInitials(s.name),
      });
      changed = true;
    }
  }

  for (const t of SEED_TEACHERS) {
    if (!users.find((u) => u.email === t.email)) {
      users.push({
        ...t,
        role: 'teacher',
        group: '',
        initials: getInitials(t.name),
      });
      changed = true;
    }
  }

  if (changed) saveUsers(users);
}

export function normalizeUser(raw) {
  return {
    email: raw.email,
    password: raw.password,
    name: raw.name,
    initials: raw.initials || getInitials(raw.name),
    avatar: raw.avatar || '🎓',
    group: raw.group || '',
    subject: raw.subject || '',
    role: raw.role,
    pts: raw.pts ?? 0,
    tests: raw.tests ?? 0,
    avgScore: raw.avgScore ?? 0,
  };
}

export function loginUser(email, password, role) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email === email && u.password === password && u.role === role,
  );
  if (!user) return { error: 'Неверный email, пароль или роль' };
  setSession(user);
  return { user };
}

export function registerUser(data) {
  const users = getUsers();
  if (users.find((u) => u.email === data.email)) {
    return { error: 'Email уже зарегистрирован' };
  }
  const user = normalizeUser({
    ...data,
    pts: 0,
    tests: 0,
    avgScore: 0,
  });
  users.push(user);
  saveUsers(users);
  return { user };
}

export function updateUserInStorage(email, updates) {
  const users = getUsers();
  const idx = users.findIndex((u) => u.email === email);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...updates };
  saveUsers(users);
  if (getSession()?.email === email) {
    setSession(users[idx]);
  }
  return users[idx];
}

export function recordTestResult(email, percent) {
  const users = getUsers();
  const idx = users.findIndex((u) => u.email === email);
  if (idx === -1) return null;

  const pts =
    percent >= 90 ? 120 : percent >= 70 ? 80 : percent >= 50 ? 40 : 10;
  const u = users[idx];
  const tests = (u.tests || 0) + 1;
  const prev = u.avgScore || 0;
  const avgScore = Math.round((prev * (tests - 1) + percent) / tests);

  users[idx] = {
    ...u,
    tests,
    pts: (u.pts || 0) + pts,
    avgScore,
  };
  saveUsers(users);
  setSession(users[idx]);
  return { user: users[idx], ptsEarned: pts };
}

seedUsers();
