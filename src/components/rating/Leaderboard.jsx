import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { leaderboard, currentUser } from '../../data/mockData';
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
  return (
    <Card className={styles.banner}>
      <div className={styles.bannerAvatar}>{currentUser.initials}</div>
      <div className={styles.bannerBody}>
        <div className={styles.bannerTitle}>{currentUser.name} — это вы</div>
        <div className={styles.bannerSub}>
          Место #{currentUser.rank} · {currentUser.points.toLocaleString('ru-RU')} очков
        </div>
      </div>
      <Badge variant="badge-purple">{currentUser.rankBadge}</Badge>
    </Card>
  );
}

export default function Leaderboard() {
  return (
    <>
      <CurrentUserBanner />
      <Card>
        {leaderboard.map((u) => (
          <div
            key={u.rank}
            className={`${styles.row} ${u.me ? styles.rowMe : ''}`}
          >
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
            <div className={styles.points}>{u.pts.toLocaleString('ru-RU')} pts</div>
          </div>
        ))}
      </Card>
    </>
  );
}
