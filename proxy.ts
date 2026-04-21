import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkSession } from './lib/api/serverApi';

// ВАЖЛИВО: Функція має називатися "proxy", бо файл називається proxy.ts
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isAuthRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
  const isPrivateRoute =
    pathname.startsWith('/profile') || pathname.startsWith('/notes');

  let response = NextResponse.next();

  // 1. Якщо авторизований і йде на логін -> на головну
  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. Silent Refresh (якщо токен прострочений)
  if (!accessToken && refreshToken && isPrivateRoute) {
    try {
      const sessionResponse = await checkSession();
      response = NextResponse.next();

      const setCookie = sessionResponse.headers['set-cookie'];
      if (setCookie) {
        response.headers.set('set-cookie', setCookie.join(', '));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // 3. Захист приватних роутів
  if (!accessToken && !refreshToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
