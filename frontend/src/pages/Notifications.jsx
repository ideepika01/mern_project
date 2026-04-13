import React from 'react';
import { Avatar, Typography, Box, Paper, Divider } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

function Notifications() {
  // Static data (replace with API later)
  const staticNotifications = [
    {
      id: 1,
      user: 'john_doe',
      action: 'liked your photo.',
      time: '2h ago',
      avatar: ''
    },
    {
      id: 2,
      user: 'jane_smith',
      action: 'started following you.',
      time: '4h ago',
      avatar: ''
    },
    {
      id: 3,
      user: 'alex_cool',
      action: 'commented: "Nice shot!"',
      time: '1d ago',
      avatar: ''
    }
  ];

  return (
    <Box className="max-w-2xl mx-auto py-8 px-4">
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={4}
        className="flex items-center gap-2"
      >
        <NotificationsNoneOutlinedIcon fontSize="large" />
        Notifications
      </Typography>

      <Paper elevation={0} className="border border-gray-200 rounded-lg overflow-hidden">
        {staticNotifications.length > 0 ? (
          staticNotifications.map((notif, index) => (
            <React.Fragment key={notif.id}>
              <Box className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <Avatar src={notif.avatar} alt={notif.user} className="w-12 h-12" />
                <Box className="flex-1">
                  <Typography variant="body1">
                    <span className="font-bold cursor-pointer hover:underline">
                      {notif.user}
                    </span>{" "}
                    {notif.action}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {notif.time}
                  </Typography>
                </Box>
              </Box>

              {index < staticNotifications.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          // Empty state
          <Box className="p-8 text-center text-gray-500">
            No recent notifications.
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Notifications;