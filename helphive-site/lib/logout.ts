'use client';

import { signOut } from 'next-auth/react';
import { disconnectStreamChat } from './streamchat-client';

/**
 * Handles complete logout process including StreamChat disconnection
 * @param callbackUrl - URL to redirect to after logout (default: '/')
 */
export async function handleLogout(callbackUrl: string = '/'): Promise<void> {
  try {
    // Disconnect from StreamChat first
    await disconnectStreamChat();
    console.log('Disconnected from StreamChat');
  } catch (error) {
    console.error('Error disconnecting from StreamChat:', error);
    // Continue with logout even if StreamChat disconnect fails
  }

  // Sign out from NextAuth
  await signOut({ callbackUrl });
}
