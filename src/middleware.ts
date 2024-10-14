import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DEFAULT_REDIRECT_ROUTE, PREVIEW_ROUTE, PROTECTED_ROUTES} from '../routes'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest){

    // Check if there is an Auth token in the request cookie request.cookies.get("authToken")
    const token = "heyheyheyheyheyheyhe" // FAKE TOKEN
    // Autorization: Protecting our special routes that are accessible only for Authenticated users
    if(PROTECTED_ROUTES.includes(request.nextUrl.pathname) || request.nextUrl.pathname.startsWith(PREVIEW_ROUTE)){
        if(!token){
            return NextResponse.redirect(new URL(DEFAULT_REDIRECT_ROUTE, request.url))
        }
        // check if the token is verified
        // TODO: Hit the verifyToken endPoint
        const isTokenVerified = true
        if(!isTokenVerified){
            return NextResponse.redirect(new URL(DEFAULT_REDIRECT_ROUTE, request.url))
        }
        // Allow access to the route
        return NextResponse.next();
    }
    // Allow the request to pass for all Public Routes
    return NextResponse.next()
}

// For all routes except these matchers the middleware will be excuted
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}