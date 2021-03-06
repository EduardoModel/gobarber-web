import React, { useEffect, useState, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import en from 'date-fns/locale/en-US';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    () => !!notifications.find((notification) => notification.read === false),
    [notifications]
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');
      console.tron.log('Notifications response');

      console.tron.log(response.data);
      console.tron.log(response.notifications);
      if (response.data) {
        const { notifications: notificationsData } = response.data;

        const data = notificationsData.map((notification) => ({
          ...notification,
          timeDistance: formatDistance(
            parseISO(notification.createdAt),
            new Date(),
            { addSuffix: true, locale: en } // Adds the suffix for the data like 3 days ago
          ),
        }));

        setNotifications(data);
      }
    }
    loadNotifications();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map((notification) =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={29} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications &&
            notifications.map((notification) => (
              <Notification key={notification._id} unread={!notification.read}>
                <p>{notification.content}</p>
                <time>{notification.timeDistance}</time>
                {!notification.read && (
                  <button
                    type="button"
                    onClick={() => handleMarkAsRead(notification._id)}
                  >
                    Mark as read
                  </button>
                )}
              </Notification>
            ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
