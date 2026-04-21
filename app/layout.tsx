import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import AuthProvider from '../components/AuthProvider/AuthProvider';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Your personal notes manager',
};

export default function RootLayout({
  children,
  modal, // ДОДАНО: слот для модалок
}: {
  children: React.ReactNode;
  modal: React.ReactNode; // ТИПІЗАЦІЯ: слот для модалок
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal} {/* ВІДОБРАЖЕННЯ: слот для модалок */}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
