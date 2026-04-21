import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkSession } from './lib/api/serverApi';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isAuthRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
  const isPrivateRoute =
    pathname.startsWith('/profile') || pathname.startsWith('/notes');

  // 1. Якщо авторизований і йде на сторінки входу — редірект на головну
  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. Flow поновлення сесії
  if (!accessToken && refreshToken && isPrivateRoute) {
    try {
      const sessionResponse = await checkSession();

      // ВИМОГА МЕНТОРА: Створюємо редірект на ту саму адресу
      const response = NextResponse.redirect(request.nextUrl);

      // Переносимо нові куки у відповідь редіректу
      const setCookie = sessionResponse.headers['set-cookie'];
      if (setCookie) {
        response.headers.set('set-cookie', setCookie.join(', '));
      }

      return response; // Повертаємо редірект
    } catch (error) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // 3. Якщо немає токенів для приватного роуту
  if (!accessToken && !refreshToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
