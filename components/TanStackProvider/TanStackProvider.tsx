'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function TanStackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Важно создавать QueryClient внутри useState, чтобы он не пересоздавался при каждом рендере
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Данные свежие 1 минуту
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
