import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Define the signup schema for validation
const signupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  displayName: z.string().min(1, 'Display name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedFields = signupSchema.safeParse(body)
    
    if (!validatedFields.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validatedFields.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { firstName, lastName, displayName, email, password } = validatedFields.data

    // TODO: Replace this with your actual user creation logic
    // This could be a database insertion, API call to your backend, etc.
    
    // For now, this is a placeholder - you'll need to implement actual user creation
    // Example: Hash the password and save to database
    try {
      // Placeholder user creation logic
      // In a real app, you would:
      // 1. Hash the password using bcrypt or similar
      // 2. Check if user already exists
      // 3. Save user to database
      // 4. Send verification email if needed
      
      // Mock user creation for demonstration
      console.log('Creating user:', { firstName, lastName, displayName, email })
      
      // Simulate successful user creation
      return NextResponse.json(
        { message: 'User created successfully', user: { email, displayName } },
        { status: 201 }
      )
    } catch (error) {
      console.error('User creation error:', error)
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Signup API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
