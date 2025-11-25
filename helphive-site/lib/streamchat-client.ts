'use client';

import { StreamChat } from 'stream-chat';

let chatClient: StreamChat | null = null;

/**
 * Initialize StreamChat client for the authenticated user
 * @param userId - The authenticated user's ID
 * @param userToken - The StreamChat token for the user
 * @param userName - The user's display name
 * @param userImage - Optional user avatar URL
 * @returns StreamChat client instance
 */
export async function initStreamChatClient(
  userId: string,
  userToken: string,
  userName: string,
  userImage?: string
): Promise<StreamChat> {
  const apiKey = process.env.NEXT_PUBLIC_STREAMCHAT_API_KEY;

  if (!apiKey) {
    throw new Error('StreamChat API key is not configured');
  }

  // Return existing client if already connected with same user
  if (chatClient && chatClient.userID === userId) {
    return chatClient;
  }

  // Disconnect existing client if it exists
  if (chatClient) {
    await chatClient.disconnectUser();
  }

  // Create new client
  chatClient = StreamChat.getInstance(apiKey);

  // Connect user
  await chatClient.connectUser(
    {
      id: userId,
      name: userName,
      image: userImage,
    },
    userToken
  );

  return chatClient;
}

/**
 * Get the current StreamChat client instance
 * @returns StreamChat client instance or null if not initialized
 */
export function getStreamChatClient(): StreamChat | null {
  return chatClient;
}

/**
 * Disconnect from StreamChat
 */
export async function disconnectStreamChat(): Promise<void> {
  if (chatClient) {
    await chatClient.disconnectUser();
    chatClient = null;
  }
}

/**
 * Fetch StreamChat token from the API
 * @returns Object containing token, userId, and apiKey
 */
export async function fetchStreamChatToken(): Promise<{
  token: string;
  userId: string;
  apiKey: string;
}> {
  const response = await fetch('/api/streamchat/token');

  if (!response.ok) {
    throw new Error('Failed to fetch StreamChat token');
  }

  return response.json();
}
