import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import AuthProvider from '../components/AuthProvider/AuthProvider';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

// ЗАМЕНИ СВОЙ БЛОК METADATA НА ЭТОТ:
export const metadata: Metadata = {
  metadataBase: new URL('https://09-auth-lhor.vercel.app'),
  title: 'NoteHub | Secure Contact Management',
  description:
    'Manage your contacts efficiently with NoteHub. A professional web application built with Next.js 14, TypeScript, and TanStack Query for secure and fast contact management.',
  openGraph: {
    title: 'NoteHub | Secure Contact Management',
    description:
      'A modern contact management application with secure authentication and real-time synchronization.',
    url: 'https://09-auth-lhor.vercel.app',
    siteName: 'NoteHub',
    images: [
      {
        url: '/og-image.png', // Картинка должна лежать в папке public
        width: 1200,
        height: 630,
        alt: 'NoteHub App Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
