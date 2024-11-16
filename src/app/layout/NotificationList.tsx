'use client'

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  IconButton, 
  Badge, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  List, 
  ListItem, 
  ListItemText, 
  Typography,
  Divider 
} from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { getNotifications } from '../features/web3/push-protocol/pushProtocol';

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
}

export default function NotificationModal({ userAddress }: { userAddress: string | undefined }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const prevNotificationCountRef = useRef(0);

  const fetchAndUpdateNotifications = useCallback(async () => {
    if (userAddress) {
      const fetchedNotifs = await getNotifications(userAddress);

      setNotifications(prevNotifs => {
        const updatedNotifs = fetchedNotifs.map((notif: any) => ({
          id: notif.id || Math.random().toString(36).substr(2, 9),
          title: notif.title,
          message: notif.message,
          isRead: prevNotifs.some(pn => pn.id === notif.id) ? 
            prevNotifs.find(pn => pn.id === notif.id)!.isRead : false
        }));

        // Calculate new notifications based on count difference
        const newNotificationsCount = Math.max(0, updatedNotifs.length - prevNotificationCountRef.current);

        // Update unread count
        setUnreadCount(prevCount => prevCount + newNotificationsCount);

        // Update the previous notification count reference
        prevNotificationCountRef.current = updatedNotifs.length;

        // Merge new notifications with existing ones, preserving read status
        return updatedNotifs.map((newNotif: { id: string; }) => {
          const existingNotif = prevNotifs.find(prevNotif => prevNotif.id === newNotif.id);
          return existingNotif || newNotif;
        });
      });
    }
  }, [userAddress]);

  useEffect(() => {
    fetchAndUpdateNotifications();
    const intervalId = setInterval(fetchAndUpdateNotifications, 30000);

    return () => clearInterval(intervalId);
  }, [fetchAndUpdateNotifications]);

  const handleOpen = () => {
    setOpen(true);
    setNotifications(prevNotifs => prevNotifs.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNotificationList = (notifs: Notification[], isUnread: boolean) => (
    <>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        {isUnread ? 'Unread Notifications' : 'Read Notifications'}
      </Typography>
      <List>
        {notifs.map((notif: Notification) => (
          <ListItem 
            key={notif.id} 
            sx={{
              bgcolor: isUnread ? 'grey.100' : 'white',
              transition: 'background-color 0.3s',
            }}
          >
            <ListItemText
              primary={notif.title}
              secondary={notif.message}
            />
          </ListItem>
        ))}
      </List>
    </>
  );

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Your Notifications</DialogTitle>
        <DialogContent>
          {notifications.length === 0 ? (
            <Typography>You do not have any notifications yet.</Typography>
          ) : (
            <>
              {unreadNotifications.length > 0 && renderNotificationList(unreadNotifications, true)}
              {readNotifications.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  {renderNotificationList(readNotifications, false)}
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}