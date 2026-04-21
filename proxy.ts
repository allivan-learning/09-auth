import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // УМНАЯ ПРОВЕРКА: Ищем куки с типичными названиями токенов авторизации
  const hasAuthCookie =
    request.cookies.has('refreshToken') ||
    request.cookies.has('accessToken') ||
    request.cookies.has('token') ||
    request.cookies.has('jwt') ||
    request.cookies.has('connect.sid'); // Стандартная кука сессий в Node.js

  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
  const isPrivateRoute =
    pathname.startsWith('/profile') || pathname.startsWith('/notes');

  // Если есть токен и юзер идет на страницу логина -> кидаем в профиль
  if (hasAuthCookie && isAuthRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // Если токена нет, а роут приватный -> кидаем на логин
  if (!hasAuthCookie && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
