import { useMemo } from 'react';
import { getUsers } from '../../services/userStorage';
import { useAuth } from '../../hooks/useAuth';
import Card from '../ui/Card';
import styles from './Leaderboard.module.css';

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
    </Card>
  );
}

export default function Leaderboard() {
  const { user } = useAuth();
  const entries = useMemo(
    () =>
      getUsers()
        .filter((u) => u.role === 'student')
        .sort((a, b) => (b.pts || 0) - (a.pts || 0)),
    [],
  );

  return (
    <>
      <CurrentUserBanner />
      <Card className={styles.tableCard}>
        <table className="tbl">
          <thead>
            <tr>
              <th>Место</th>
              <th>Студент</th>
              <th>Ср. балл</th>
              <th>Очки</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((u, i) => {
              const rank = i + 1;
              const me = u.email === user.email;
              return (
                <tr key={u.email} className={me ? styles.rowMe : undefined}>
                  <td className={styles.rankCell}>{medal(rank)}</td>
                  <td>
                    <div className={styles.cellUser}>
                      <span
                        className={styles.cellAv}
                        style={
                          me
                            ? { background: 'var(--indigo)', color: '#fff' }
                            : undefined
                        }
                      >
                        {u.avatar || u.initials}
                      </span>
                      <span className={me ? styles.nameMe : styles.name}>
                        {u.name}
                        {me && <span className={styles.meTag}> (вы)</span>}
                      </span>
                    </div>
                  </td>
                  <td className={styles.mono}>{u.avgScore || 0}%</td>
                  <td className={styles.pts}>{(u.pts || 0).toLocaleString('ru-RU')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}
