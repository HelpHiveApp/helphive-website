import { auth } from './auth'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Define auth routes
  const isAuthRoute = nextUrl.pathname === '/login' || nextUrl.pathname === '/signup'

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL('/availablejobs', nextUrl))
  }

  return null
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
