/**
 * The function acts as a proxy for routes, redirecting users to the login page for protected routes if
 * not authenticated and redirecting authenticated users away from public routes.
 * @param {NextRequest} req - The `req` parameter in the code snippet represents the incoming request
 * object in a Next.js server-side function. It contains information about the incoming HTTP request,
 * such as the URL, headers, method, and other request details. In this context, the `req` parameter is
 * used to extract the pathname
 * @returns The function `proxy` is returning a `NextResponse` object based on certain conditions. If
 * the requested path is a protected route and the user does not have a cookie, it will redirect to the
 * login page. If the requested path is a public route and the user has a cookie, it will redirect to
 * the home page. Otherwise, it will continue to the next request.
 */
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./features/auth/lib/session.lib";

const protectedRoutes = ['/profile','/products']
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