# StreamChat Integration Documentation

## Overview

StreamChat has been integrated into the HelpHive application. Users are automatically registered with StreamChat when they sign up or log in.

## Setup

### Environment Variables

The StreamChat API key is already configured in the `.env` file:

```env
# StreamChat Configuration
NEXT_PUBLIC_STREAMCHAT_API_KEY=5ybm2kw9yuj3
```

**Note:** Token generation is handled securely via Supabase Edge Function at:
`https://ybosoitfbowwbuanusvs.supabase.co/functions/v1/get-stream-token`

This keeps the StreamChat secret key secure on the server side.

## How It Works

### Server-Side Registration via Supabase Edge Function

The integration uses a Supabase Edge Function (`get-stream-token`) to handle all StreamChat operations securely:

1. **Signup Flow**: When a user signs up via `/api/auth/signup`, the app calls the Supabase Edge Function to register them with StreamChat.
2. **Login Flow**: When a user logs in via NextAuth credentials provider, the app calls the Supabase Edge Function to register/update them with StreamChat.
3. **Token Generation**: When the client needs a StreamChat token, it calls `/api/streamchat/token` which proxies the request to the Supabase Edge Function.

### User Registration Details

Users are registered with the following information:
- **User ID**: The user's Supabase UUID
- **Name**: The user's display name
- **Email**: User's email address
- **Image**: User's avatar URL (if available)
- **Role**: Set to `'user'`

### Supabase Edge Function Integration

The Supabase Edge Function at `https://ybosoitfbowwbuanusvs.supabase.co/functions/v1/get-stream-token` handles:
- User registration in StreamChat
- Token generation for authenticated users
- Secure storage of the StreamChat secret key

**Request Format:**
```json
{
  "userId": "user-uuid",
  "userName": "User Display Name",
  "userEmail": "user@example.com",
  "userImage": "https://example.com/avatar.jpg",
  "action": "register" // or "get_token"
}
```

## Client-Side Usage

### Initializing StreamChat Client

To use StreamChat in your React components, follow these steps:

```typescript
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { fetchStreamChatToken, initStreamChatClient } from '@/lib/streamchat-client';
import { StreamChat } from 'stream-chat';

function YourChatComponent() {
  const { data: session } = useSession();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    async function setupChat() {
      if (!session?.user) return;

      try {
        // Fetch token from API
        const { token, userId } = await fetchStreamChatToken();

        // Initialize client
        const client = await initStreamChatClient(
          userId,
          token,
          session.user.name || 'User',
          session.user.image || undefined
        );

        setChatClient(client);
      } catch (error) {
        console.error('Failed to initialize StreamChat:', error);
      }
    }

    setupChat();

    // Cleanup on unmount
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [session]);

  if (!chatClient) {
    return <div>Loading chat...</div>;
  }

  // Use chatClient to create channels, send messages, etc.
  return <div>Chat interface here</div>;
}
```

### Getting StreamChat Token

The endpoint `/api/streamchat/token` returns a token for authenticated users:

```typescript
import { fetchStreamChatToken } from '@/lib/streamchat-client';

const { token, userId, apiKey } = await fetchStreamChatToken();
```

### Using StreamChat React Components

To use StreamChat's React components, install the React SDK:

```bash
npm install stream-chat-react
```

Then you can use StreamChat's pre-built UI components:

```typescript
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

function ChatInterface({ client, channel }) {
  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}
```

## API Reference

### Server-Side Functions (`lib/streamchat.ts`)

#### `registerStreamChatUser(userId, userData)`
Registers or updates a user in StreamChat via the Supabase Edge Function.

**Parameters:**
- `userId` (string): Unique user identifier
- `userData` (object):
  - `name` (string): User's display name
  - `email` (string, optional): User's email
  - `image` (string, optional): User's avatar URL

**Returns:** `Promise<void>` - Resolves when user is registered

**Note:** This function calls the Supabase Edge Function with `action: 'register'`

### Client-Side Functions (`lib/streamchat-client.ts`)

#### `initStreamChatClient(userId, userToken, userName, userImage?)`
Initializes and connects the StreamChat client for an authenticated user.

**Parameters:**
- `userId` (string): User's ID
- `userToken` (string): StreamChat token
- `userName` (string): User's display name
- `userImage` (string, optional): User's avatar URL

**Returns:** `Promise<StreamChat>` - Connected StreamChat client instance

#### `getStreamChatClient()`
Gets the current StreamChat client instance.

**Returns:** `StreamChat | null`

#### `disconnectStreamChat()`
Disconnects from StreamChat.

**Returns:** `Promise<void>`

#### `fetchStreamChatToken()`
Fetches StreamChat token from the API.

**Returns:** `Promise<{ token: string, userId: string, apiKey: string }>`

## API Endpoints

### `GET /api/streamchat/token`
Returns a StreamChat token for the authenticated user.

**Authentication:** Requires valid NextAuth session

**Response:**
```json
{
  "token": "eyJhbGc...",
  "userId": "user-uuid",
  "apiKey": "5ybm2kw9yuj3"
}
```

## Error Handling

All StreamChat operations include error handling that logs warnings but doesn't break the authentication flow. This ensures that if StreamChat is temporarily unavailable, users can still sign up and log in.

## Security Notes

1. **Never expose the StreamChat secret key** on the client side. It should only be in environment variables on the server.
2. User tokens are generated server-side and provided to clients through authenticated API endpoints.
3. The API endpoint `/api/streamchat/token` requires a valid NextAuth session.

## Testing

To test the integration:

1. Sign up a new user or log in with an existing user
2. Check the server logs for "User registered with StreamChat successfully"
3. Use the `/api/streamchat/token` endpoint to retrieve a token
4. Initialize the client with the token and verify connection

## Troubleshooting

### "StreamChat API key is not configured"
- Ensure `NEXT_PUBLIC_STREAMCHAT_API_KEY` is set in your `.env` file
- Restart your development server after adding environment variables

### "Failed to register user with StreamChat"
- Verify your StreamChat secret key is correct
- Check if your StreamChat app is active in the dashboard
- Review server logs for specific error messages

### Users not appearing in StreamChat dashboard
- Verify the registration code is being executed (check server logs)
- Ensure the StreamChat secret key has the correct permissions
- Try manually registering a user through the StreamChat API Explorer

## Next Steps

Consider implementing:
- Private channels for 1-on-1 conversations
- Group channels for team discussions
- Push notifications for new messages
- Typing indicators and read receipts
- File sharing capabilities
- Message reactions and threading

For more information, visit the [StreamChat Documentation](https://getstream.io/chat/docs/).
