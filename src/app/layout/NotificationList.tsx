
'use client'

import { useState, useEffect } from 'react';
import { 
  IconButton, 
  Badge, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  List, 
  ListItem, 
  ListItemText, 
  Typography 
} from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { getNotifications } from '../features/web3/push-protocol/pushProtocol';

export default function NotificationModal({ userAddress }: { userAddress: string | undefined }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (userAddress) {
        const notifs = await getNotifications(userAddress);
        setNotifications(notifs);
      }
    };

    fetchNotifications();
    // Set up polling to fetch notifications periodically
    const intervalId = setInterval(fetchNotifications, 30000); // every 30 seconds

    return () => clearInterval(intervalId);
  }, [userAddress]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Your Notifications</DialogTitle>
        <DialogContent>
          {notifications.length === 0 ? (
            <Typography>No notifications yet.</Typography>
          ) : (
            <List>
              {notifications.map((notif: any, index: number) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={notif.title}
                    secondary={notif.message}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}