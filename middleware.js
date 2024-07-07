// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // صفحات محافظت شده
  const protectedPaths = ['/profile', '/dashboard'];

  // ریدایرکت به لاگین اگر توکن وجود ندارد و صفحه محافظت شده است
  if (!token && protectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // ریدایرکت به صفحه پروفایل اگر توکن وجود دارد و صفحه لاگین یا ثبت‌نام است
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
}
