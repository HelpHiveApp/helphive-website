import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '../../../../lib/supabase'

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

    try {
      // Create user in Supabase Auth with metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            display_name: displayName,
            full_name: `${firstName} ${lastName}`,
          }
        }
      })

      if (error) {
        console.error('Supabase signup error:', error.message)
        
        // Handle specific Supabase errors
        if (error.message.includes('already registered')) {
          return NextResponse.json(
            { error: 'An account with this email already exists' },
            { status: 400 }
          )
        }
        
        return NextResponse.json(
          { error: error.message || 'Failed to create account' },
          { status: 400 }
        )
      }

      if (data.user) {
        // Also create a profile record in the profiles table
        let profileData = null;
        try {
          const profileInsertData = {
            id: data.user.id,
            first_name: firstName,
            last_name: lastName,
            display_name: displayName,
          };

          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .insert(profileInsertData)
            .select()
            .single();

          if (profileError) {
            console.error('Warning: Failed to create profile record:', profileError);
            // Continue without profile data if profile creation fails
          } else {
            profileData = profile;
          }
        } catch (profileError) {
          console.error('Warning: Failed to create profile record:', profileError);
          // Continue without profile data if profile creation fails
        }

        return NextResponse.json(
          { 
            message: 'Account created successfully', 
            user: { 
              id: data.user.id,
              email: data.user.email,
              displayName: displayName 
            },
            profile: profileData
          },
          { status: 201 }
        )
      }

      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
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
