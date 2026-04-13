# Real-Time Messaging Flow (WebSockets)

## 1. Socket Connection
- **Setup**: `Messages.jsx` initializes a socket connection using `socket.io-client`.
- **Joining Rooms**: Once a chat is selected, the client sends `join_room` with the `conversationId`. This ensures messages stay private to that chat.

## 2. Sending Messages
- **Frontend Action**: User types in `Messages.jsx` and clicks Send.
- **Socket Event**: Sends `send_message` event containing:
    - `conversationId`
    - `senderId`
    - `text`
- **Backend Listener**: `index.js` receives the event.
    - **Persistence**: Saves the message to the `Message` collection in MongoDB.
    - **Metadata**: Updates the `Conversation` model with the `lastMessage`.
    - **Broadcast**: Emit `receive_message` to everyone in that specific `conversationId` room.

## 3. Receiving Messages
- **Frontend Listener**: `socket.on('receive_message')` triggers a state update.
- **Dynamic UI**: If the message belongs to the currently active conversation, it's appended to the `messages` array. Otherwise, it updates the "last message" snippet in the sidebar list.

## 4. Initiating a New Chat
- **Profile Action**: Clicking "Message" on someone's profile calls `startConversation(recipientId)`.
- **Backend**: Checks if a `Conversation` already exists between the two users. If not, it creates a new one.
- **Navigation**: Redirects user to `/messages` where the new conversation is automatically selected.
