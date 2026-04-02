import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./features/auth/lib/session.lib";

const protectedRoutes = ['/profile','/products', '/cart', '/choose-payment']
const publicRoutes = ['/login']

export default async function proxy(req: NextRequest){
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.some((url) => path.includes(url))
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = await getCookie()

    if(isProtectedRoute && !cookie){
        const loginUrl = new URL('/login', req.nextUrl)
        return NextResponse.redirect(loginUrl)
    }

    if (isPublicRoute && cookie) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }
    
    return NextResponse.next()
    }

// Routes Proxy should not run on
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg).*)',
    ],
}