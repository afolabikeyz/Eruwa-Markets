import { createContext, useContext, useState, ReactNode } from 'react';

export interface Order {
  id: string;
  orderId: string;
  date: Date;
  items: Array<{
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    vendor: string;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };
  paymentMethod: string;
  deliveryPerson?: {
    name: string;
    phone: string;
    vehicle: string;
  };
  trackingUpdates: Array<{
    status: string;
    message: string;
    timestamp: Date;
  }>;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date' | 'trackingUpdates'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  cancelOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'trackingUpdates'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date(),
      trackingUpdates: [
        {
          status: 'Order Confirmed',
          message: 'Your order has been received and is being processed',
          timestamp: new Date()
        }
      ]
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.orderId === orderId
          ? { ...order, status }
          : order
      )
    );
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.orderId === orderId
          ? {
              ...order,
              status: 'cancelled' as const,
              trackingUpdates: [
                ...order.trackingUpdates,
                {
                  status: 'Order Cancelled',
                  message: 'Your order has been cancelled',
                  timestamp: new Date()
                }
              ]
            }
          : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
