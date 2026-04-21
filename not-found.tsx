import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>404 - Сторінку не знайдено</h2>
      <p>На жаль, такої сторінки не існує.</p>
      <Link href="/" style={{ color: '#0070f3', textDecoration: 'underline' }}>
        Повернутися на головну
      </Link>
    </div>
  );
}
