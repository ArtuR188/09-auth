import { NextRequest, NextResponse } from 'next/server';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  if (isPrivate) {
    if (accessToken) {
      return NextResponse.next();
    }

    if (refreshToken) {
      try {
        const response = await checkSession();
        const setCookie = response.headers['set-cookie'];
        const nextResponse = NextResponse.next();
        if (setCookie) {
          const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
          cookies.forEach((cookie) => {
            nextResponse.headers.append('Set-Cookie', cookie);
          });
        }
        return nextResponse;
      } catch {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
    }

    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublic && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/sign-in',
    '/sign-up',
  ],
};