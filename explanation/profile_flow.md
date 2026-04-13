# User Profile Flow

## 1. Viewing a Profile
- **Logic**: `Profile.jsx` extracts the `username` from the URL params.
- **Redirection**: If you visit `/profile` without a username, the app automatically redirects you to `/profile/your_username`.
- **API**: `GET /api/users/profile/:username`.
- **Backend**:
    - `getUserProfile` fetches the user document (excluding password).
    - Fetches all posts where `user` is the target user's ID.
    - Returns `{ user, posts }`.

## 2. Managing Social Connections
- **Following**: `PATCH /api/users/follow/:userId`.
    - Updates both the `followers` array of the target user and the `following` array of the current user.
- **Messaging**: The "Message" button triggers `startConversation` to jump directly into a private chat.

## 3. Editing Profile
- **Modal**: Users can edit their **Username**, **Bio**, and **Profile Picture URL**.
- **API**: `PUT /api/users/update`.
- **Global Update**: Upon success, the app:
    1. Updates the MongoDB document.
    2. Overwrites the cached user data in `localStorage`.
    3. Performs a shallow refresh to update the **Navbar** and **Sidebar** globally.

## 4. Tabs: Posts vs Saved
- **Posts**: Displays the array of posts fetched from the backend for that user.
- **Saved**: For personal profiles, it filters the user's `saved` items (array of Post IDs) to show bookmarked content.