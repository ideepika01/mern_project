import React from "react";
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const NOTIFICATIONS = [
  { id: 1, type: "like", user: "sarah_designer", img: "https://mui.com/static/images/avatar/2.jpg", content: "liked your photo.", time: "2h", postImg: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg" },
  { id: 2, type: "follow", user: "alex_ravis", img: "https://mui.com/static/images/avatar/3.jpg", content: "started following you.", time: "5h", following: false },
  { id: 3, type: "comment", user: "rehana_pk", img: "https://mui.com/static/images/avatar/4.jpg", content: 'commented: "Beautiful! 😍"', time: "1d", postImg: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg" },
];

function Notifications() {
  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Notifications</h1>
      
      <section>
        <h2 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">Earlier this week</h2>
        <List className="divide-y divide-gray-50 bg-white rounded-2xl border overflow-hidden">
          {NOTIFICATIONS.map((notif) => (
            <NotificationItem key={notif.id} notif={notif} />
          ))}
        </List>
      </section>
    </div>
  );
}

const NotificationItem = ({ notif }) => (
  <ListItem className="hover:bg-gray-50 transition-colors py-4 px-4">
    <ListItemAvatar>
      <div className="relative">
        <Avatar src={notif.img} className="w-12 h-12" />
        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-white
          ${notif.type === 'like' ? 'bg-red-500' : notif.type === 'follow' ? 'bg-blue-500' : 'bg-green-500'}`}>
          {notif.type === 'like' ? <FavoriteIcon sx={{ fontSize: 10 }} /> : notif.type === 'follow' ? <PersonAddIcon sx={{ fontSize: 10 }} /> : <ChatBubbleIcon sx={{ fontSize: 10 }} />}
        </div>
      </div>
    </ListItemAvatar>
    <ListItemText
      primary={
        <p className="text-sm text-gray-800 ml-2">
          <span className="font-bold text-gray-900">{notif.user}</span> {notif.content}
          <span className="text-xs text-gray-400 ml-2">{notif.time}</span>
        </p>
      }
    />
    <ListItemSecondaryAction>
      {notif.type === 'follow' ? (
        <Button 
          variant={notif.following ? "outlined" : "contained"} 
          size="small" 
          className={`!text-xs !font-bold !rounded-lg ${notif.following ? '!text-black !border-gray-300' : '!bg-blue-500'}`}
        >
          {notif.following ? "Following" : "Follow"}
        </Button>
      ) : (
        <div className="w-10 h-10 rounded-md overflow-hidden border">
          <img src={notif.postImg} className="w-full h-full object-cover" alt="Post" />
        </div>
      )}
    </ListItemSecondaryAction>
  </ListItem>
);

export default Notifications;
