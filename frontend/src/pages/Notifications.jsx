import React from "react";
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const SECTIONS = [
  {
    title: "New",
    items: [
      { id: 1, type: "like", user: "sarah_designer", img: "https://i.pravatar.cc/150?u=1", content: "liked your photo.", time: "2m", postImg: "https://picsum.photos/seed/n1/200" },
      { id: 2, type: "follow", user: "alex_ravis", img: "https://i.pravatar.cc/150?u=2", content: "started following you.", time: "15m", following: false },
    ]
  },
  {
    title: "Today",
    items: [
      { id: 3, type: "comment", user: "rehana_pk", img: "https://i.pravatar.cc/150?u=3", content: 'commented: "Beautiful! 😍"', time: "2h", postImg: "https://picsum.photos/seed/n2/200" },
      { id: 4, type: "like", user: "kumar_v", img: "https://i.pravatar.cc/150?u=4", content: "liked your video.", time: "4h", postImg: "https://picsum.photos/seed/n3/200" },
      { id: 5, type: "follow", user: "jessica.lee", img: "https://i.pravatar.cc/150?u=5", content: "started following you.", time: "6h", following: true },
    ]
  },
  {
    title: "This Week",
    items: [
      { id: 6, type: "comment", user: "mike_w", img: "https://i.pravatar.cc/150?u=6", content: 'mentioned you in a comment.', time: "2d", postImg: "https://picsum.photos/seed/n4/200" },
      { id: 7, type: "like", user: "priya_sharma", img: "https://i.pravatar.cc/150?u=7", content: "liked your photo.", time: "3d", postImg: "https://picsum.photos/seed/n5/200" },
      { id: 8, type: "follow", user: "creative_mind", img: "https://i.pravatar.cc/150?u=8", content: "started following you.", time: "4d", following: false },
      { id: 9, type: "like", user: "travel_junkie", img: "https://i.pravatar.cc/150?u=9", content: "liked your photo.", time: "5d", postImg: "https://picsum.photos/seed/n6/200" },
      { id: 10, type: "comment", user: "foodie_delight", img: "https://i.pravatar.cc/150?u=10", content: "commented on your post.", time: "6d", postImg: "https://picsum.photos/seed/n7/200" },
    ]
  }
];

function Notifications() {
  return (
    <div className="w-full max-w-2xl mx-auto py-4 md:py-8 px-0 md:px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 px-4 md:px-0">Notifications</h1>
      
      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-sm font-bold text-gray-900 mb-2 px-4 md:px-0">{section.title}</h2>
            <List className="divide-y divide-gray-50 bg-white md:rounded-2xl md:border overflow-hidden">
              {section.items.map((notif) => (
                <NotificationItem key={notif.id} notif={notif} />
              ))}
            </List>
          </section>
        ))}
      </div>
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
