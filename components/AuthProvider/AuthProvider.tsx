'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '../../lib/store/authStore';
// КРИТИЧНО: Добавляем импорт logout
import { getMe, logout } from '../../lib/api/clientApi';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, setUser, clearIsAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const privateRoutes = ['/profile', '/notes'];
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch (error) {
        clearIsAuthenticated();

        // УБИЙЦА ЗОМБИ-КУК: Если сервер не принял нашу куку, мы заставляем его её удалить!
        try {
          await logout();
        } catch (e) {
          // Игнорируем ошибку, если логаут не удался
        }

        if (isPrivateRoute) {
          router.push('/sign-in');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        Перевірка авторизації...
      </div>
    );
  }

  if (isPrivateRoute && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
