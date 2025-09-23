import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { supabase } from './lib/supabase'

// Define the login schema for validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Validate the credentials
        const validatedFields = loginSchema.safeParse(credentials)
        
        if (!validatedFields.success) {
          return null
        }

        const { email, password } = validatedFields.data

        try {
          // Use Supabase to authenticate the user
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (error) {
            console.error('Supabase auth error:', error.message)
            return null
          }

          if (data.user) {
            return {
              id: data.user.id,
              email: data.user.email!,
              name: data.user.user_metadata?.display_name || data.user.user_metadata?.full_name || data.user.email!,
              image: data.user.user_metadata?.avatar_url || null,
            }
          }

          return null
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login', // Redirect to login page on error
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      
      // Redirect authenticated users away from auth pages
      if (isLoggedIn && (nextUrl.pathname === '/login' || nextUrl.pathname === '/signup')) {
        return Response.redirect(new URL('/availablejobs', nextUrl))
      }
      
      return true
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig
