import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../auth';

export async function GET(request: NextRequest) {
  try {
    // Get the authenticated user session
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      
      if (!supabaseUrl) {
        throw new Error('Supabase URL is not configured');
      }

      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseAnonKey) {
        throw new Error('Supabase anon key is not configured');
      }

      // Request token from Supabase Edge Function
      const response = await fetch(`${supabaseUrl}/functions/v1/get-stream-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          user_id: session.user.id,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to get StreamChat token: ${error}`);
      }

      const data = await response.json();

      return NextResponse.json({
        token: data.token,
        userId: session.user.id,
        apiKey: process.env.NEXT_PUBLIC_STREAMCHAT_API_KEY,
      });
    } catch (error) {
      console.error('Error generating StreamChat token:', error);
      return NextResponse.json(
        { error: 'Failed to generate StreamChat token' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('StreamChat token API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
