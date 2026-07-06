import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import Header from './Header';
import { Star, ShoppingBag, MapPin, Store, TrendingUp, Shield, Truck, X, CheckCircle, Award } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { addNotification } = useNotifications();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [badgeModalOpen, setBadgeModalOpen] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-muted-foreground">Product not found</p>
          <Link to="/products" className="text-primary hover:underline mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      addNotification({
        type: 'general',
        title: 'Login Required',
        message: 'Please login to add items to your cart',
        link: '/auth'
      });
      navigate('/auth');
      return;
    }

    if (user?.role === 'vendor') {
      addNotification({
        type: 'general',
        title: 'Action Not Allowed',
        message: 'Vendors cannot purchase items. You can only sell products.',
        link: '/vendor/dashboard'
      });
      return;
    }

    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image || 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=400',
      vendor: product.vendor
    });

    addNotification({
      type: 'general',
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="mb-4 sm:mb-6">
          <Link to="/products" className="text-sm sm:text-base text-primary hover:underline">
            ← Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg aspect-square relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount && (
              <div className="absolute top-4 right-4 px-4 py-2 bg-destructive text-white rounded-lg">
                <span className="text-2xl font-bold">-{product.discount}%</span>
              </div>
            )}
            {product.trending && (
              <div className="absolute top-4 left-4 px-4 py-2 bg-secondary text-white rounded-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>Trending</span>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{product.name}</h1>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-primary text-primary'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="mb-4 sm:mb-6">
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-secondary mt-2">
                  You save ₦{(product.originalPrice - product.price).toLocaleString()}
                </p>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
                <Store className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Vendor</p>
                  <p className="font-semibold">{product.vendor}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Market</p>
                  <p className="font-semibold">{product.market}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Availability</p>
                  <p className="font-semibold text-secondary">
                    {product.stock} items in stock
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 sm:py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                Add to Cart
              </button>
              <Link
                to="/cart"
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary text-primary rounded-lg hover:bg-accent transition-colors flex items-center justify-center"
              >
                View Cart
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
              <button
                onClick={() => setBadgeModalOpen('verified')}
                className="text-center p-3 sm:p-4 bg-white border-2 border-secondary rounded-lg hover:bg-secondary/5 transition-all active:scale-95 cursor-pointer"
              >
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-secondary mx-auto mb-2" />
                <p className="text-xs font-medium text-secondary">Verified Vendor</p>
              </button>
              <button
                onClick={() => setBadgeModalOpen('delivery')}
                className="text-center p-3 sm:p-4 bg-white border-2 border-primary rounded-lg hover:bg-primary/5 transition-all active:scale-95 cursor-pointer"
              >
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium text-primary">Fast Delivery</p>
              </button>
              <button
                onClick={() => setBadgeModalOpen('quality')}
                className="text-center p-3 sm:p-4 bg-white border-2 border-chart-3 rounded-lg hover:bg-chart-3/5 transition-all active:scale-95 cursor-pointer"
              >
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-chart-3 mx-auto mb-2" />
                <p className="text-xs font-medium text-chart-3">Quality Assured</p>
              </button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{relatedProduct.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{relatedProduct.vendor}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        ₦{relatedProduct.price.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Badge Information Modals */}
        {badgeModalOpen === 'verified' && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-lg max-w-md w-full animate-scaleIn">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold">Verified Vendor</h3>
                </div>
                <button
                  onClick={() => setBadgeModalOpen(null)}
                  className="p-2 hover:bg-accent rounded-lg transition-all active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-muted-foreground">
                  This vendor has been verified and approved by our platform. All verified vendors meet our strict quality and reliability standards.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <div>
                      <p className="font-semibold">Identity Verified</p>
                      <p className="text-sm text-muted-foreground">Complete documentation and business registration confirmed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <div>
                      <p className="font-semibold">Quality Checked</p>
                      <p className="text-sm text-muted-foreground">Products inspected for quality and authenticity</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <div>
                      <p className="font-semibold">Trusted Seller</p>
                      <p className="text-sm text-muted-foreground">Maintained high ratings and positive customer feedback</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <div>
                      <p className="font-semibold">Secure Transactions</p>
                      <p className="text-sm text-muted-foreground">All payments are protected and secure</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <p className="text-sm">
                    <strong>Vendor Rating:</strong> {product.vendor} maintains a {Math.floor(Math.random() * 5 + 95)}% satisfaction rate with over {product.reviews} successful transactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {badgeModalOpen === 'delivery' && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-lg max-w-md w-full animate-scaleIn">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Fast Delivery</h3>
                </div>
                <button
                  onClick={() => setBadgeModalOpen(null)}
                  className="p-2 hover:bg-accent rounded-lg transition-all active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-muted-foreground">
                  Get your products delivered quickly and safely to your doorstep. Our fast delivery service ensures you receive your order on time.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Same Day Delivery</p>
                      <p className="text-sm text-muted-foreground">Orders placed before 2 PM are delivered the same day</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Real-Time Tracking</p>
                      <p className="text-sm text-muted-foreground">Track your order in real-time from pickup to delivery</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Safe Handling</p>
                      <p className="text-sm text-muted-foreground">Products handled with care to ensure freshness</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Flexible Delivery</p>
                      <p className="text-sm text-muted-foreground">Choose your preferred delivery time slot</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-accent/50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary">24h</p>
                    <p className="text-xs text-muted-foreground">Max Delivery Time</p>
                  </div>
                  <div className="p-3 bg-accent/50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary">₦500</p>
                    <p className="text-xs text-muted-foreground">Delivery Fee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {badgeModalOpen === 'quality' && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-lg max-w-md w-full animate-scaleIn">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-chart-3/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-chart-3" />
                  </div>
                  <h3 className="text-xl font-bold">Quality Assured</h3>
                </div>
                <button
                  onClick={() => setBadgeModalOpen(null)}
                  className="p-2 hover:bg-accent rounded-lg transition-all active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-muted-foreground">
                  We guarantee the quality of all products sold on our platform. Every item goes through strict quality control before reaching you.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-chart-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">Quality Inspection</p>
                      <p className="text-sm text-muted-foreground">All products inspected before shipping</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-chart-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">Freshness Guarantee</p>
                      <p className="text-sm text-muted-foreground">Fresh produce guaranteed or your money back</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-chart-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">Easy Returns</p>
                      <p className="text-sm text-muted-foreground">7-day return policy for all products</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-chart-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">Authenticity Verified</p>
                      <p className="text-sm text-muted-foreground">100% genuine products, no counterfeits</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-chart-3/10 rounded-lg border border-chart-3/20">
                  <p className="text-sm">
                    <strong>Our Promise:</strong> If you're not satisfied with the quality, we offer a full refund within 7 days of delivery, no questions asked.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-accent/50 rounded text-center">
                    <p className="text-lg font-bold text-chart-3">{product.rating}</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  <div className="p-2 bg-accent/50 rounded text-center">
                    <p className="text-lg font-bold text-chart-3">7d</p>
                    <p className="text-xs text-muted-foreground">Returns</p>
                  </div>
                  <div className="p-2 bg-accent/50 rounded text-center">
                    <p className="text-lg font-bold text-chart-3">100%</p>
                    <p className="text-xs text-muted-foreground">Authentic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
