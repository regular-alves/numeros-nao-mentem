import { NextResponse, NextRequest } from 'next/server';
import { getDatesFrom } from '@naoMentem/hooks/useDatesFromPath';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const dates = getDatesFrom(pathname);

  if (request.nextUrl.pathname.startsWith('/reports')) {
    const expectedPathPart = [dates.from, dates.to]
      .map((date) => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`)
      .join('/');

    const expectedPath = pathname.replace(/(\/\d+\-\d+)/g, '') + `/${expectedPathPart}`;

    if (expectedPath !== pathname) {
      return NextResponse.redirect(new URL(expectedPath, request.url))
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/reports/:path*',
}