import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Твои импорты путей могут немного отличаться
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Провайдер React Query оборачивает ВЕСЬ проект */}
        <TanStackProvider>
          {/* Провайдер авторизации защищает внутренности */}
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
