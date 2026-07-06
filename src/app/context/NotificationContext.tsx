import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Bell, ShoppingCart, TrendingUp, Calendar, CreditCard } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'order' | 'recommendation' | 'market' | 'payment' | 'general';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const getIconForType = (type: Notification['type']) => {
  switch (type) {
    case 'order': return ShoppingCart;
    case 'recommendation': return TrendingUp;
    case 'market': return Calendar;
    case 'payment': return CreditCard;
    default: return Bell;
  }
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'market',
      title: 'Towobowo Market Opens Tomorrow',
      message: 'Towobowo Market opens tomorrow. Discover textiles, fashion, and local crafts!',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      icon: Calendar,
      link: '/markets'
    },
    {
      id: '2',
      type: 'recommendation',
      title: 'New Products You Might Like',
      message: 'Check out fresh tomatoes from verified vendors in Maya Market',
      timestamp: new Date(Date.now() - 7200000),
      read: false,
      icon: TrendingUp,
      link: '/products'
    }
  ]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      type: notification.type,
      title: notification.title,
      message: notification.message,
      timestamp: new Date(),
      read: false,
      icon: notification.icon || getIconForType(notification.type),
      link: notification.link
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
