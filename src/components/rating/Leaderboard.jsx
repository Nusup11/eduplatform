import { useMemo } from 'react';
import { getUsers } from '../../services/userStorage';
import { useAuth } from '../../hooks/useAuth';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import styles from './LeaderboardRow.module.css';

function rankClass(rank) {
  if (rank === 1) return styles.rank1;
  if (rank === 2) return styles.rank2;
  if (rank === 3) return styles.rank3;
  return styles.rankOther;
}

function medal(rank) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank;
}

export function CurrentUserBanner() {
  const { user } = useAuth();
  const users = useMemo(
    () => getUsers().filter((u) => u.role === 'student').sort((a, b) => (b.pts || 0) - (a.pts || 0)),
    [],
  );
  const myRank = users.findIndex((u) => u.email === user.email) + 1;

  return (
    <Card className={styles.banner}>
      <div className={styles.bannerAvatar}>{user.avatar || user.initials}</div>
      <div className={styles.bannerBody}>
        <div className={styles.bannerTitle}>{user.name} — это вы</div>
        <div className={styles.bannerSub}>
          Место #{myRank || '—'} · {(user.points || 0).toLocaleString('ru-RU')} очков
        </div>
      </div>
      {myRank === 1 && <Badge variant="badge-purple">🥇 Золото</Badge>}
      {myRank === 2 && <Badge variant="badge-purple">🥈 Серебро</Badge>}
      {myRank === 3 && <Badge variant="badge-purple">🥉 Бронза</Badge>}
    </Card>
  );
}

export default function Leaderboard() {
  const { user } = useAuth();
  const entries = useMemo(
    () =>
      getUsers()
        .filter((u) => u.role === 'student')
        .sort((a, b) => (b.pts || 0) - (a.pts || 0))
        .map((u, i) => ({
          id: u.email,
          name: u.name,
          avatar: u.avatar || u.initials,
          score: `${u.avgScore || 0}%`,
          xp: u.pts || 0,
          rank: i + 1,
          me: u.email === user.email,
        })),
    [user.email],
  );

  return (
    <>
      <CurrentUserBanner />
      <Card>
        {entries.map((u) => (
          <div key={u.id} className={`${styles.row} ${u.me ? styles.rowMe : ''}`}>
            <div className={`${styles.rank} ${rankClass(u.rank)}`}>{medal(u.rank)}</div>
            <div
              className={styles.avatar}
              style={{
                background: u.me ? '#7F77DD' : 'var(--color-background-secondary)',
                color: u.me ? '#fff' : 'var(--color-text-secondary)',
              }}
            >
              {u.avatar}
            </div>
            <div className={styles.name}>
              {u.name}
              {u.me && <span className={styles.meTag}> (вы)</span>}
            </div>
            <div className={styles.score}>{u.score}</div>
            <div className={styles.points}>{u.xp.toLocaleString('ru-RU')} pts</div>
          </div>
        ))}
      </Card>
    </>
  );
}
