import { useState } from 'react';
import Header from './Header';
import { Package, CheckCircle, Truck, MapPin, Clock, Phone, ChevronDown, ChevronUp, User, Home, CreditCard, MessageCircle, Navigation, X, Send, AlertTriangle, ShoppingBag, ArrowRight } from 'lucide-react';
import { products } from '../data/mockData';
import { useNotifications } from '../context/NotificationContext';
import { useOrders } from '../context/OrderContext';
import { Link } from 'react-router';

export default function OrderTracking() {
  const { orders, cancelOrder } = useOrders();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [trackingModalOpen, setTrackingModalOpen] = useState<string | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState<string | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const { addNotification } = useNotifications();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-secondary';
      case 'in-transit': return 'text-primary';
      case 'processing': return 'text-chart-3';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-secondary/10';
      case 'in-transit': return 'bg-primary/10';
      case 'processing': return 'bg-chart-3/10';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'in-transit': return Truck;
      case 'processing': return Package;
      default: return Clock;
    }
  };

  const getEstimatedDelivery = (order: any) => {
    if (order.status === 'delivered') return 'Delivered';
    if (order.status === 'in-transit' || order.status === 'shipped') return 'Today, 4:00 PM - 6:00 PM';
    return 'Tomorrow, 2:00 PM - 4:00 PM';
  };

  const getTrackingUpdates = (status: string) => {
    const now = new Date();
    const updates = [];

    if (status === 'delivered') {
      updates.push({
        title: 'Order Delivered',
        description: 'Your order has been delivered successfully',
        time: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        completed: true
      });
    }

    if (status === 'shipped' || status === 'in-transit' || status === 'delivered') {
      updates.push({
        title: 'Out for Delivery',
        description: 'Your order is on the way',
        time: new Date(now.getTime() - 4 * 60 * 60 * 1000),
        completed: true
      });
    }

    updates.push({
      title: 'Order Confirmed',
      description: 'Vendor is preparing your order',
      time: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      completed: true
    });

    updates.push({
      title: 'Order Placed',
      description: 'We have received your order',
      time: new Date(now.getTime() - 25 * 60 * 60 * 1000),
      completed: true
    });

    return updates;
  };

  const getOrderItems = (order: any) => {
    return order.items || [];
  };

  const formatTime = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleSendMessage = async (orderId: string) => {
    if (!message.trim()) return;

    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    addNotification({
      type: 'order',
      title: 'Message Sent',
      message: `Your message has been sent to the vendor`,
      link: '/orders'
    });

    setIsSending(false);
    setMessage('');
    setContactModalOpen(null);
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!cancelReason.trim()) return;

    setIsCancelling(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    cancelOrder(orderId);

    addNotification({
      type: 'order',
      title: 'Order Cancelled',
      message: `Order ${orderId} has been cancelled successfully. Refund will be processed in 3-5 business days.`,
      link: '/orders'
    });

    setIsCancelling(false);
    setCancelReason('');
    setCancelModalOpen(null);
  };

  const handleCallVendor = (orderVendor: string) => {
    addNotification({
      type: 'order',
      title: 'Calling Vendor',
      message: `Connecting you to ${orderVendor}...`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Order Tracking</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-border p-8 sm:p-12 text-center">
            <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Your order history will appear here. Start shopping to place your first order!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {orders.map(order => {
              const StatusIcon = getStatusIcon(order.status);
              const isExpanded = expandedOrder === order.orderId;

              // Normalize tracking updates to consistent format
              const rawTrackingUpdates = order.trackingUpdates || getTrackingUpdates(order.status);
              const trackingUpdates = rawTrackingUpdates.map((update: any) => {
                if (update.timestamp) {
                  // Format from OrderContext
                  return {
                    title: update.status,
                    description: update.message,
                    time: update.timestamp,
                    completed: true
                  };
                }
                // Already in correct format from getTrackingUpdates
                return update;
              });

              const orderItems = getOrderItems(order);
              const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
              const firstVendor = order.items[0]?.vendor || 'Multiple Vendors';

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-base sm:text-lg mb-1">Order {order.orderId}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {order.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusBg(order.status)} ${getStatusColor(order.status)} flex items-center gap-1.5`}>
                            <StatusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="capitalize">{order.status.replace('-', ' ')}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-muted-foreground">Items</p>
                              <p className="text-sm sm:text-base font-semibold truncate">{totalItems} items</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-muted-foreground">Vendor</p>
                              <p className="text-sm sm:text-base font-semibold truncate">{firstVendor}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-sm sm:text-base font-bold text-primary">₦</span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-muted-foreground">Total</p>
                              <p className="text-sm sm:text-base font-semibold">₦{order.total.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {order.status !== 'delivered' && (
                      <div className="p-3 sm:p-4 bg-accent/50 rounded-lg mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            <div>
                              <p className="text-xs sm:text-sm font-medium">Estimated Delivery</p>
                              <p className="text-xs sm:text-sm text-muted-foreground">{getEstimatedDelivery(order)}</p>
                            </div>
                          </div>
                          {order.status === 'shipped' && (
                            <button
                              onClick={() => setTrackingModalOpen(order.orderId)}
                              className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm flex items-center gap-1 active:scale-95"
                            >
                              <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Track Live</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="relative mb-6">
                      <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted" />
                      <div className="flex justify-between relative">
                        <div className="flex-1 text-center">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-auto mb-2 flex items-center justify-center border-2 ${
                            order.status === 'processing' || order.status === 'shipped' || order.status === 'in-transit' || order.status === 'delivered'
                              ? 'bg-secondary border-secondary text-white'
                              : 'bg-white border-muted text-muted-foreground'
                          }`}>
                            <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <p className="text-xs font-medium">Processing</p>
                        </div>

                        <div className="flex-1 text-center">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-auto mb-2 flex items-center justify-center border-2 ${
                            order.status === 'shipped' || order.status === 'in-transit' || order.status === 'delivered'
                              ? 'bg-secondary border-secondary text-white'
                              : 'bg-white border-muted text-muted-foreground'
                          }`}>
                            <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <p className="text-xs font-medium">In Transit</p>
                        </div>

                        <div className="flex-1 text-center">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-auto mb-2 flex items-center justify-center border-2 ${
                            order.status === 'delivered'
                              ? 'bg-secondary border-secondary text-white'
                              : 'bg-white border-muted text-muted-foreground'
                          }`}>
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <p className="text-xs font-medium">Delivered</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        onClick={() => setExpandedOrder(isExpanded ? null : order.orderId)}
                        className="flex-1 py-2.5 border border-input rounded-lg hover:bg-accent transition-all active:scale-95 text-sm flex items-center justify-center gap-2"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        {isExpanded ? 'Hide Details' : 'View Details'}
                      </button>
                      <button
                        onClick={() => setContactModalOpen(order.orderId)}
                        className="flex-1 py-2.5 border border-input rounded-lg hover:bg-accent transition-all active:scale-95 text-sm flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">Contact Vendor</span>
                        <span className="sm:hidden">Contact</span>
                      </button>
                      {order.status === 'processing' && (
                        <button
                          onClick={() => setCancelModalOpen(order.orderId)}
                          className="flex-1 py-2.5 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-all active:scale-95 text-sm font-medium"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-border">
                      <div className="p-4 sm:p-6 space-y-6">
                        <div>
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            Tracking Updates
                          </h4>
                          <div className="space-y-4">
                            {trackingUpdates.map((update, idx) => (
                              <div key={idx} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                  <div className={`w-2 h-2 rounded-full ${update.completed ? 'bg-secondary' : 'bg-muted'}`} />
                                  {idx < trackingUpdates.length - 1 && (
                                    <div className={`w-0.5 h-full min-h-8 ${update.completed ? 'bg-secondary' : 'bg-muted'}`} />
                                  )}
                                </div>
                                <div className="flex-1 pb-4">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <p className="font-medium text-sm">{update.title}</p>
                                      <p className="text-xs text-muted-foreground">{update.description}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                      <p className="text-xs font-medium">{formatTime(update.time)}</p>
                                      <p className="text-xs text-muted-foreground">{formatDate(update.time)}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {order.status === 'shipped' && order.deliveryPerson && (
                          <div>
                            <h4 className="font-semibold mb-4 flex items-center gap-2">
                              <User className="w-5 h-5 text-primary" />
                              Delivery Person
                            </h4>
                            <div className="flex items-center gap-4 p-4 bg-accent/30 rounded-lg">
                              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                                {order.deliveryPerson.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold">{order.deliveryPerson.name}</p>
                                <p className="text-sm text-muted-foreground">{order.deliveryPerson.vehicle}</p>
                              </div>
                              <button
                                onClick={() => handleCallVendor(firstVendor)}
                                className="p-2 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-all active:scale-95"
                                aria-label="Call delivery person"
                              >
                                <Phone className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5 text-primary" />
                            Order Items
                          </h4>
                          <div className="space-y-3">
                            {orderItems.map(item => (
                              <div key={item.id} className="flex gap-3 p-3 border border-border rounded-lg">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden flex-shrink-0">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                  <p className="text-sm font-semibold text-primary">₦{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Home className="w-5 h-5 text-primary" />
                            Delivery Address
                          </h4>
                          <div className="p-4 bg-accent/30 rounded-lg">
                            <p className="font-medium mb-1">{order.deliveryAddress.fullName}</p>
                            <p className="text-sm text-muted-foreground">{order.deliveryAddress.phone}</p>
                            <p className="text-sm text-muted-foreground mt-2">
                              {order.deliveryAddress.address}<br />
                              {order.deliveryAddress.city}, {order.deliveryAddress.state}, Nigeria
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-primary" />
                            Payment Information
                          </h4>
                          <div className="p-4 bg-accent/30 rounded-lg">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Total Paid</span>
                              <span className="text-sm font-medium text-primary text-lg">₦{order.total.toLocaleString()}</span>
                            </div>
                            <div className="mt-3 pt-3 border-t border-border">
                              <p className="text-sm text-muted-foreground">Payment Method</p>
                              <p className="text-sm font-medium capitalize">{order.paymentMethod}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Live Tracking Modal */}
        {trackingModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
              <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">Live Tracking</h3>
                  <p className="text-sm text-muted-foreground">Order {trackingModalOpen}</p>
                </div>
                <button
                  onClick={() => setTrackingModalOpen(null)}
                  className="p-2 hover:bg-accent rounded-lg transition-all active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6">
                <div className="bg-muted rounded-lg h-64 sm:h-96 mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center animate-pulse">
                        <Truck className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="absolute bottom-8 left-8 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="relative text-center z-10">
                    <Navigation className="w-12 h-12 text-primary mx-auto mb-2 animate-pulse" />
                    <p className="font-semibold">Tracking in Real-Time</p>
                    <p className="text-sm text-muted-foreground">Your order is 2.5 km away</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg">
                    <User className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">Adebayo Tunde</p>
                      <p className="text-sm text-muted-foreground">On the way to your location</p>
                    </div>
                    <button
                      onClick={() => handleCallVendor(orders.find(o => o.id === trackingModalOpen)?.vendor || '')}
                      className="p-2 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-all active:scale-95"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 border border-border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Estimated Time</p>
                      <p className="font-semibold">15-20 mins</p>
                    </div>
                    <div className="p-3 border border-border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Distance</p>
                      <p className="font-semibold">2.5 km</p>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium mb-1">Delivery Address</p>
                        <p className="text-sm text-muted-foreground">
                          15 Ajibode Road, Eruwa Town<br />
                          Eruwa, Oyo State
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Vendor Modal */}
        {contactModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center animate-fadeIn">
            <div className="bg-white rounded-t-2xl sm:rounded-lg max-w-lg w-full max-h-[90vh] overflow-hidden animate-scaleIn">
              <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">Contact Vendor</h3>
                  <p className="text-sm text-muted-foreground">
                    {orders.find(o => o.id === contactModalOpen)?.vendor}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setContactModalOpen(null);
                    setMessage('');
                  }}
                  className="p-2 hover:bg-accent rounded-lg transition-all active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div className="space-y-3">
                  <button
                    onClick={() => handleCallVendor(orders.find(o => o.id === contactModalOpen)?.vendor || '')}
                    className="w-full p-4 border border-border rounded-lg hover:bg-accent transition-all active:scale-95 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold">Call Vendor</p>
                      <p className="text-sm text-muted-foreground">Direct phone call</p>
                    </div>
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-2 text-muted-foreground">Or send a message</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-base"
                    rows={4}
                  />
                </div>

                <div className="bg-accent/30 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    💡 Common questions: delivery time, special instructions, product details
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setContactModalOpen(null);
                      setMessage('');
                    }}
                    className="flex-1 py-3 border border-input rounded-lg hover:bg-accent transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSendMessage(contactModalOpen)}
                    disabled={!message.trim() || isSending}
                    className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Order Modal */}
        {cancelModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center animate-fadeIn">
            <div className="bg-white rounded-t-2xl sm:rounded-lg max-w-lg w-full max-h-[90vh] overflow-hidden animate-scaleIn">
              <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">Cancel Order</h3>
                    <p className="text-sm text-muted-foreground">Order {cancelModalOpen}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCancelModalOpen(null);
                    setCancelReason('');
                  }}
                  className="p-2 hover:bg-accent rounded-lg transition-all active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm font-medium mb-1">Are you sure you want to cancel this order?</p>
                  <p className="text-xs text-muted-foreground">
                    Your refund will be processed in 3-5 business days
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Reason for cancellation *</label>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  >
                    <option value="">Select a reason</option>
                    <option value="changed-mind">Changed my mind</option>
                    <option value="wrong-item">Ordered wrong item</option>
                    <option value="found-better-price">Found better price elsewhere</option>
                    <option value="delivery-time">Delivery taking too long</option>
                    <option value="payment-issue">Payment issue</option>
                    <option value="other">Other reason</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-muted-foreground">Full refund guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-muted-foreground">Refund in 3-5 business days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-muted-foreground">No cancellation fee</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setCancelModalOpen(null);
                      setCancelReason('');
                    }}
                    className="flex-1 py-3 border border-input rounded-lg hover:bg-accent transition-all active:scale-95"
                  >
                    Keep Order
                  </button>
                  <button
                    onClick={() => handleCancelOrder(cancelModalOpen)}
                    disabled={!cancelReason || isCancelling}
                    className="flex-1 py-3 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
                  >
                    {isCancelling ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Cancelling...
                      </>
                    ) : (
                      'Cancel Order'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
