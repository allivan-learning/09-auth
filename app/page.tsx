import { redirect } from 'next/navigation';

export default function Home() {
  // Как только пользователь заходит на "/", он мгновенно улетает на "/notes/filter/all"
  redirect('/notes/filter/all');
}
