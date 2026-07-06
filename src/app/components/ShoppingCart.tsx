import { Link } from 'react-router';
import Header from './Header';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ShoppingCart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border border-border p-12 text-center">
            <ShoppingBag className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start shopping to add items to your cart
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {items.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-border p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-3 sm:gap-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base lg:text-lg truncate">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{item.vendor}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-1.5 sm:p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all active:scale-95 flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 sm:w-9 sm:h-9 border border-input rounded-lg flex items-center justify-center hover:bg-accent transition-all active:scale-95 touch-manipulation"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 sm:w-12 text-center font-medium text-base">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 sm:w-9 sm:h-9 border border-input rounded-lg flex items-center justify-center hover:bg-accent transition-all active:scale-95 touch-manipulation"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-base sm:text-lg font-bold text-primary">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          ₦{item.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-border p-6 sticky top-24">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
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

              <Link
                to="/checkout"
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mb-3"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/products"
                className="w-full py-3 border border-input rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 p-4 bg-accent/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Free delivery on orders above ₦10,000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
