import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import Header from './Header';
import { CreditCard, MapPin, User, Phone, CheckCircle, Package, Truck, Clock, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { useOrders } from '../context/OrderContext';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { addNotification } = useNotifications();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Eruwa',
    state: 'Oyo',
    paymentMethod: 'paystack'
  });

  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      navigate('/cart');
    }
  }, [items.length, orderPlaced, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const newOrderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderId(newOrderId);

    addOrder({
      orderId: newOrderId,
      items: items,
      total: totalPrice + 700,
      status: 'processing',
      deliveryAddress: {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state
      },
      paymentMethod: formData.paymentMethod,
      deliveryPerson: {
        name: 'Adewale Johnson',
        phone: '+234 803 456 7890',
        vehicle: 'Motorcycle - Lagos ABC 123'
      }
    });

    addNotification({
      type: 'payment',
      title: 'Payment Successful',
      message: `Order ${newOrderId} has been placed successfully!`,
      link: '/orders'
    });

    clearCart();
    setProcessing(false);
    setOrderPlaced(true);
  };

  if (items.length === 0 && !orderPlaced) {
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-secondary p-8 sm:p-12 text-center animate-scaleIn">
            <div className="w-24 h-24 bg-gradient-to-br from-secondary to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Order Placed Successfully!</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Thank you for your order. Your items will be delivered soon.
            </p>

            <div className="bg-accent/50 rounded-xl p-6 mb-8 border-2 border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">Order ID</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">{orderId}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-blue-600 font-semibold uppercase">Status</p>
                <p className="font-bold text-blue-800">Processing</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-xs text-purple-600 font-semibold uppercase">Est. Delivery</p>
                <p className="font-bold text-purple-800">2-3 Days</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border border-green-200">
                <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-xs text-green-600 font-semibold uppercase">Delivery</p>
                <p className="font-bold text-green-800">{formData.city}</p>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                to="/orders"
                className="w-full py-4 bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl hover:from-primary/90 hover:to-orange-500 transition-all flex items-center justify-center gap-3 text-lg font-bold shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                <Eye className="w-6 h-6" />
                See My Progress
              </Link>

              <Link
                to="/products"
                className="w-full py-4 border-2 border-primary text-primary rounded-xl hover:bg-accent transition-all flex items-center justify-center gap-3 font-semibold"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200">
              <p className="text-sm text-green-800">
                <strong>Order Confirmation</strong> has been sent to your phone: {formData.phone}
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl shadow-sm border border-border p-6">
            <h2 className="font-bold text-xl mb-4">Order Progress Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-secondary">Order Confirmed</p>
                  <p className="text-sm text-muted-foreground">Your order has been received and is being processed</p>
                  <p className="text-xs text-muted-foreground mt-1">Just now</p>
                </div>
              </div>

              <div className="flex items-start gap-4 opacity-50">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Preparing Order</p>
                  <p className="text-sm text-muted-foreground">Vendor is preparing your items</p>
                </div>
              </div>

              <div className="flex items-start gap-4 opacity-50">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Out for Delivery</p>
                  <p className="text-sm text-muted-foreground">Your order is on the way</p>
                </div>
              </div>

              <div className="flex items-start gap-4 opacity-50">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Delivered</p>
                  <p className="text-sm text-muted-foreground">Order successfully delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Delivery Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234 801 234 5678"
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your delivery address"
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-base resize-none"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State *</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                      placeholder="State"
                      className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-base"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:bg-accent transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="paystack"
                    checked={formData.paymentMethod === 'paystack'}
                    onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-4 h-4 text-primary"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Paystack</p>
                    <p className="text-sm text-muted-foreground">Pay securely with card</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:bg-accent transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="flutterwave"
                    checked={formData.paymentMethod === 'flutterwave'}
                    onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-4 h-4 text-primary"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Flutterwave</p>
                    <p className="text-sm text-muted-foreground">Pay with card, bank transfer</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-border p-6 sticky top-24">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium">₦500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="font-medium">₦200</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary text-xl">
                      ₦{(totalPrice + 700).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={processing}
                className="w-full py-3 sm:py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg font-semibold active:scale-[0.98]"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Place Order • ₦{(totalPrice + 700).toLocaleString()}
                  </>
                )}
              </button>

              <div className="mt-4 p-4 bg-accent/50 rounded-lg">
                <p className="text-xs text-muted-foreground text-center">
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
