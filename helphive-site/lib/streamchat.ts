/**
 * Register or update a user in StreamChat via Supabase Edge Function
 * @param userId - User's Supabase UUID (used as unique identifier)
 */
export async function registerStreamChatUser(
  userId: string
): Promise<void> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    
    if (!supabaseUrl) {
      throw new Error('Supabase URL is not configured');
    }

    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseAnonKey) {
      throw new Error('Supabase anon key is not configured');
    }

    const response = await fetch(`${supabaseUrl}/functions/v1/get-stream-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to register user with StreamChat: ${error}`);
    }

    console.log('User registered with StreamChat successfully');
  } catch (error) {
    console.error('Error registering StreamChat user:', error);
    throw new Error('Failed to register user with StreamChat');
  }
}
