'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // ВИМОГА: Виклик refresh при монтуванні
  useEffect(() => {
    router.refresh();
  }, [router]);

  return <>{children}</>;
}
