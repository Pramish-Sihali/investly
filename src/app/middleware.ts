import type { NextRequest} from 'next/server';

import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const role = req.cookies.get('role')?.value; // Assuming role is stored in cookies

    const protectedRoutes = {
        mentor: '/mentor',
        investor: '/investor',
        startup: '/startup'
    };

    if (pathname.startsWith(protectedRoutes.mentor) && role !== 'mentor') {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    
    if (pathname.startsWith(protectedRoutes.investor) && role !== 'investor') {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    
    if (pathname.startsWith(protectedRoutes.startup) && role !== 'startup') {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/mentor/:path*', '/investor/:path*', '/startup/:path*'],
};